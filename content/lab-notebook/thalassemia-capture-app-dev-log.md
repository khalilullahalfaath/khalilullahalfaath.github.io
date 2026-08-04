---
title: "Development Log — Peripheral Blood Smear (PBS) Image Acquisition App"
date: 2026-07-27T09:00:00+07:00
lastmod: 2026-08-04T18:00:00+07:00
status: "ongoing"
tags: ["thalassemia", "computer-vision", "edge-ai", "embedded", "hardware", "debugging", "sdk-integration"]
---

**Project:** Thalassemia Capture App (Flask + OpenCV, MiiCam USB microscope camera)
**Period:** ~July 27 – August 4, 2026
**Working directory:** `thalassemia-capture-app/` (working copy) — synced to the thesis documentation mirror

Part of the [Thalassemia Edge Deep Learning Model](/projects/thalassemia-edge-deep-learning-model/) project — this log covers the image acquisition app specifically.

## July 27, 2026 — Wireframe Design in Figma (Low & High Fidelity)

Per the supervisor's requirement, wireframes for the USB microscope camera capture flow were designed at two fidelity levels:

- Low-fidelity and high-fidelity wireframes were built in Figma, covering the entire flow: microscope stream, capture, review result, choose save location, through to saved — including extra states (a lightweight-overlay camera-select dropdown, a navbar with Capture/Segmentation tabs to leave room for future development).
- Hit the Figma MCP rate limit along the way (Starter plan, 6 calls/month), so most frames were built manually in Figma with step-by-step guidance (auto-layout, adding rows, header text, spacing, resizing the frame to 1280x720 for a typical laptop resolution).
- Got stuck on how to make the prototype (click-through flow) actually work — resolved with guidance on adding connectors/interactions between frames, setting the starting point, and a "Back" action pattern for the modal button reused across many frames (to keep navigation correct from different entry points).
- Also hit an issue where the prototype share link required login (a share-settings quirk on the Figma Starter plan) — fixed by changing the share option to "Anyone with the link".
- Once the design was approved by the supervisor, moved straight into implementation the next day.

## July 28, 2026 — MVP Done

- Implementation started as soon as the design was approved: built a local Python (Flask) + OpenCV web app implementing the capture+save flow per the wireframe (scope deliberately excluded the detection/segmentation model for now).
- Included debugging the MiiCam USB camera from scratch: installing the correct DirectShow driver (`MIIDshowSetup.exe`, not TWAIN), verifying via Device Manager & OBS Studio, and fixing a critical bug in camera enumeration (probing each index caused crashes/camera not detected — replaced with `pygrabber`, which queries device names without opening the device).
- MVP was done the same day — the basic capture+save app was usable end-to-end.

## July 29, 2026 — Capture Feature Refinements

Several UX refinements based on real MVP usage:

- **Automatic folder summary.** Previously the panel summarizing image counts per patient in the destination folder only appeared when a button was manually pressed. Changed so it automatically appears/refreshes whenever a folder is selected and whenever a capture is successfully saved — while still respecting it if the user deliberately closed the panel (using a `summaryDismissed` flag, not forcing it open again on every refresh).
- **Blank/uniform image warning badge.** Originally just a 3-second toast notification that was easy to miss. Changed to a permanent badge (`Blank/Uniform`, red) placed alongside the focus status badge, so it doesn't disappear on its own like a toast.
- **Duplicate-save confirmation.** Added a check: if the Save button is pressed again without re-capturing (the same capture), a confirmation dialog appears ("this image was already saved as X, save again as a new file?") — preventing accidental duplicate files while still allowing it to proceed if intentional.

## July 30, 2026 — Camera Resolution Control & Camera Detection Bug

**Attempting to set MiiCam resolution**

- Initially added a resolution dropdown (1920x1080 / 1280x720 / 640x480) that sent `width`/`height` to `cv2.set(CAP_PROP_FRAME_WIDTH/HEIGHT)` on connect. Didn't work for the MiiCam — the camera always reverted to its native resolution (unlike laptop webcams, which respond to generic resolution requests).
- **Option 1 tried:** opening the camera driver's native properties dialog via `cv2.CAP_PROP_SETTINGS` (a "Driver Settings" button). The dialog did appear ("MiiCam Properties" with Exposure/ROI/Color/etc. tabs), but the ROI tab — expected to hold resolution options — turned out to be just a crop area (shrinking the FOV, not a proportional resize) — not the solution wanted.
- **Option 2 implemented:** `resize_for_save()` — capture stays at native resolution (max quality for analysis), but the file is resized proportionally (scale-to-fit, full FOV preserved) before saving according to the dropdown selection. Works independently of camera driver support.
- The "Driver Settings" feature was then removed at the user's request (seen as making the app heavier) — later reinstated to investigate a color issue (see the color section below).

**Bug: camera dropdown reverts to generic names**

- After a server restart, the dropdown sometimes showed generic names ("USB Camera #0/#1") instead of the actual device names, even though this had already been fixed with `pygrabber`.
- Root cause found in the server log:

```
[DEBUG] pygrabber failed, falling back to OpenCV probe: [WinError -2147221008] CoInitialize has not been called
```

Flask runs with `threaded=True`, so each request can be handled by a new thread that has never called `CoInitialize()` — per-thread `comtypes`/COM initialization is required.

- **Fix:** call `comtypes.CoInitialize()` at the start of `list_cameras()` every time it's invoked (safe to call repeatedly on the same thread). Added `comtypes` to `requirements.txt`.

## August 1–2, 2026 — Porting to Ubuntu/Linux

- Archived the stable Windows version to a separate folder (`thalassemia-capture-app-windows-archive/`) before starting cross-platform changes (a `git tag` attempt failed because the local repo was locked by another process, so a plain folder copy was used instead).
- New `run.sh` — equivalent to `run.bat`: checks for Python3, creates a venv, installs dependencies, runs the server, opens the browser (`xdg-open`).
- Camera name detection on Linux: `list_cameras()` extended to read `/sys/class/video4linux/videoN/name` (equivalent to what `pygrabber` does on Windows, without needing to open the device).
- README expanded with Ubuntu-specific Requirements/How to run/Troubleshooting instructions (`python3-tk`, `v4l-utils`, etc.).
- `run.sh` bugfix: found `venv/bin/activate: No such file or directory` — root cause: `python3-venv` wasn't installed on the system, causing `python3 -m venv venv` to fail halfway (the venv folder was created but without `activate`/pip). **Fix:** the script now detects an incomplete venv, removes it automatically, and gives a clear message asking to install `python3-venv` if it still fails.

## August 3, 2026 — Debugging the MiiCam on an NVIDIA Jetson (Ubuntu ARM64)

**Driver research**

- On the official MiiCam/ToupTek download page, there's no dedicated Linux driver installer — the MiiCam is supposed to be UVC-compliant and should be picked up automatically by the Linux kernel's `uvcvideo` module without extra installation. What's available for Linux is just a viewer installer (`MIImageView.x64.tar.bz2`, labeled "Linux ARM64") and an SDK (`miicamsdk.20250415.zip`) — both optional.
- Device: NVIDIA Jetson (ARM64/aarch64 architecture). Important note: `pip install opencv-python` on Jetson risks being slow/failing because ARM64 wheels aren't always available — recommended to first check the OpenCV bundled with JetPack (`python3 -c "import cv2; print(cv2.__version__)"`) and use `venv --system-site-packages` if it's already present.

**"Camera not detected" investigation**

Diagnostic sequence (each step confirmed via a command/screenshot from the user):

1. `lsusb` → the MiiCam was detected as `ID 0547:1208 Anchor Chips, Inc. USB2.0 Camera` (a generic UVC chipset commonly used in cheap microscope cameras).
2. `v4l2-ctl --list-devices` → only showed the `NVIDIA Tegra Video Input Device` (`/dev/media0`) and `vi-output, imx219` (`/dev/video0`, the Jetson board's built-in CSI camera) — the MiiCam didn't show up at all, even though the `uvcvideo` module was already loaded (`lsmod`).
3. The user's `video` group membership was correct (`groups` showed `video` present) — not a permissions issue.
4. `dmesg` showed a repeating connect-then-immediately-disconnect pattern with no end (device number kept incrementing: 13→14→...→19, each connection lasting only a few seconds):

```
usb 1-2.4: USB disconnect, device number 13
usb 1-2.2: new high-speed USB device number 14 using tegra-xusb
usb 1-2.2: USB disconnect, device number 14
...
```

→ Initial hypothesis: unstable USB power supply for this power-hungry 5MP camera through the Jetson's internal hub.

5. USB autosuspend was disabled for testing (`echo -1 | sudo tee /sys/module/usbcore/parameters/autosuspend`) — the connect-disconnect loop still occurred, so autosuspend was ruled out as the cause.
6. Moved to a different physical USB port → the USB bus address changed but the symptom was identical. (Note: ports on a compact board like this usually still go through a single internal Jetson hub, so switching ports doesn't necessarily "bypass" the hub.)
7. Briefly tested incorrectly using `cv2.VideoCapture(0)` in a `test_kamera.py` script — that actually opens `/dev/video0`, which is the Jetson's CSI camera (`imx219`), not the MiiCam, and CSI cameras require the `nvarguscamerasrc` pipeline (can't be opened via generic V4L2/GStreamer) — clarified to avoid debugging in the wrong direction.
8. Checked the USB authorization/usbguard hypothesis — `usbguard.service` turned out not to be installed on the system, so this hypothesis was also ruled out (didn't get to directly check the `authorized` attribute in sysfs).

**🔑 Key finding (breakthrough)**

Tried the ToupCam SDK from `touptekphotonics.com` (the original vendor of the ToupTek chipset that's rebranded as MiiCam) — the camera was successfully detected through that SDK. Picked the **Latest** release (Jun 12, 2026) over **Stable** (Dec 30, 2025, the vendor's "Recommended" label) or **Legacy** (Oct 15, 2024), reasoning that a newer release would more likely have up-to-date OS/ARM64 compatibility fixes — relevant since the issue here was specifically about Linux kernel compatibility on this board. Stable was kept as a fallback in case Latest caused problems.

**Conclusion:** the MiiCam is likely not fully UVC-compliant in a way that the standard `uvcvideo` kernel module can bind to on this Jetson platform. The Linux kernel module fails to bind the device (even though it's successfully recognized at the USB level), but the vendor SDK (direct communication via `libusb`, bypassing `uvcvideo`/V4L2) works. This means Linux/Jetson integration for this app needs the ToupTek/MII vendor SDK as a separate capture backend, rather than relying on `cv2.VideoCapture` + generic V4L2 as currently used.

**Separate issue: yellow tint on some laptops (Windows)**

- Found during testing: captured images looked yellowish on 2 laptops, but normal ("white") on 1 laptop — confirmed this was the same physical camera & microscope, just moved between laptops.
- Initial hypothesis: different color format (YUV) negotiation between laptops → fix applied: explicitly force `MJPG` format via `cap.set(CAP_PROP_FOURCC, ...)` in `CameraManager.open()`, so decoding always goes through the same standard JPEG path consistently across machines.
- Compared Driver Provider/Version in Device Manager across laptops — initially looked identical, and the Windows Night Light / blue light filter was suspected as a possible cause.
- **Root cause confirmed:** the laptops showing the yellow tint were actually running an older camera driver version than the laptop showing normal color — not a Night Light issue after all. **Fix:** update the camera driver to the latest version on the affected laptops.

## August 4, 2026 — ToupCam SDK Integration: MiiCam Now Working on the Jetson

**SDK exploration**

Extracted the ToupCam SDK Latest release (Jun 12, 2026) and found the relevant structure for the Jetson (Linux ARM64):

```
linux/arm64/glibc/libtoupcam.so   ← used (Jetson Ubuntu = glibc, not musl)
linux/udev/99-toupcam.rules       ← udev rule for permissions
python/toupcam.py                 ← ctypes binding
```

Important finding: the contents of `99-toupcam.rules` (`SUBSYSTEM=="usb", ATTRS{idVendor}=="0547", MODE="0666"`) exactly match the VID `0547` seen in `lsusb` from the start (`Anchor Chips`) — confirming the theory that this camera needs raw USB access (`libusb`) via the vendor SDK, rather than the standard `uvcvideo`/V4L2 kernel path. `toupcam.py` also automatically looks for `libtoupcam.so` in the same folder as itself, so no system-wide install is needed.

**Implementation**

- SDK bundled into `vendor/toupcam/` (`toupcam.py`, `libtoupcam.so` for arm64/glibc, `99-toupcam.rules`).
- `CameraManager` in `app.py` refactored into a dual backend: `list_cameras()` merges ToupCam SDK enumeration results with the usual OpenCV/pygrabber/V4L2 probing, and `open()` automatically picks the right backend per device from the combined registry.
- The ToupCam backend uses the SDK's callback model (`StartPullModeWithCallback` → `PullImageV4` on each `TOUPCAM_EVENT_IMAGE` event), forced to BGR (`TOUPCAM_OPTION_BYTEORDER=1`) to stay consistent with the existing OpenCV pipeline — so none of the downstream functions (MJPEG streaming, focus/blank detection, resizing, PNG saving) needed any changes; the backend is fully abstracted away.
- Windows was left completely untouched, still using the already-working OpenCV/DirectShow path.
- `run.sh` updated to optionally offer installing `99-toupcam.rules` automatically (requires sudo).

**Bug & fix during live testing on the Jetson**

- First attempt: the SDK successfully enumerated the device (`ToupCam SDK found device: ['ECMOS05000KPA']` — the MiiCam's actual sensor name!) and `connect` succeeded (200 OK), but every frame pull failed: `[DEBUG] ToupCam PullImageV4 failed: argument 2: TypeError: wrong type`.
- Root cause: `Toupcam_PullImageV4` is declared with `ctypes.c_char_p` as the argtype for its image buffer, which only accepts `bytes` — the code was using a `bytearray` (incompatible with `c_char_p`, even though it's generally the more "correct" choice for a writable buffer).
- **Fix:** switched to `bytes(...)`, exactly matching the pattern used in the vendor's official example (`simplest.py`) — even though `bytes` is immutable at the Python level, the SDK can still write directly to its raw memory through the C pointer.
- After the fix: fully working end-to-end — connect → stream → capture (multiple times) → save (multiple times) → folder summary updates, all without errors in the server log.

**Status**

✅ MiiCam successfully detected and working on the NVIDIA Jetson via the ToupCam SDK backend. ⏳ Visual verification of capture results (making sure the blood smear images are sharp, correctly colored, and not corrupted) is still pending, since access to the microscope wasn't available at the time. Needs verification once access is available again.

**Performance optimization (app felt heavy after the ToupCam integration)**

After the integration was working, the app felt noticeably heavier/laggier on the Jetson than before. Root cause: unlike the old OpenCV backend (which only pulled frames at our own MJPEG polling rate, ~30fps), the ToupCam SDK pushes frames as fast as the sensor can produce them at full native resolution (5MP) via callback, with no throttling — every frame was being fully processed (raw data pull + reshape) even though the stream didn't need to be that fast.

Fixes applied in `_open_toupcam_locked`/`_on_toupcam_event`:

- Throttled to ~20fps — frames arriving faster than that are skipped immediately.
- `put_RealTime(1)` — the SDK always delivers the latest frame and drops the old queue instead of buffering it up.
- Fixed the resolution setting: the initial attempt used `put_Size(width, height)` with values from the dropdown (e.g. 1280x720), which failed with error `-2147024809` (E_INVALIDARG) — it turns out the ToupCam sensor only supports a fixed set of discrete resolutions, not arbitrary values. Fixed by finding the nearest valid resolution from the camera's supported list (`ResolutionNumber()` + `get_Resolution()`), then using `put_eSize(index)` to select it.

**Result:** confirmed by the user that the app felt noticeably lighter after these fixes.

**Multi-architecture CPU support (arm64 + x64)**

`libtoupcam.so` is a native binary per CPU architecture, so the arm64 version bundled initially wouldn't run if the app is moved to plain Ubuntu x86_64 (not the Jetson). Restructured into `vendor/toupcam/<arch>/` (`arm64/` and `x64/`, each carrying its own copy of `toupcam.py` since the binding looks for the `.so` in the exact same folder as itself). `app.py` now auto-detects the architecture via `platform.machine()` (`_TOUPCAM_ARCH_MAP`) and picks the matching folder — so the same app codebase runs on either the Jetson or Ubuntu x86_64 without manually swapping files. Verified working in an x86_64 sandbox (the SDK loaded automatically from `vendor/toupcam/x64/`).

## Status & Next Steps (as of August 4, 2026)

- [x] ToupCam SDK integration on the Jetson — MiiCam successfully detected and working end-to-end (connect/stream/capture/save).
- [x] ToupCam backend performance optimization (throttling, `put_RealTime`, discrete resolution handling via `put_eSize`).
- [x] Multi-architecture CPU support (arm64 + x64) — auto-detected, no manual file swapping needed.
- [x] Yellow tint issue on Windows laptops — confirmed to be an outdated camera driver version, fix identified (update the driver).
- [ ] Visually verify MiiCam capture results on the Jetson once microscope access is available again (image quality, color, no corruption).
- [ ] (Optional, if another power-hungry camera comes up later) Keep a powered USB hub on hand as a general mitigation for the Jetson.

## Related Files & Locations

- App working copy: `thalassemia-capture-app/`
- Thesis documentation mirror: `docs/gaps/thalassemia-capture-app/`
- Stable Windows version archive (before the Linux port): `thalassemia-capture-app-windows-archive/`
