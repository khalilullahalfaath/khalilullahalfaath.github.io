---
title: "Development Log — Peripheral Blood Smear (PBS) Image Acquisition App"
date: 2026-07-27T09:00:00+07:00
lastmod: 2026-08-03T18:00:00+07:00
status: "ongoing"
tags: ["thalassemia", "computer-vision", "edge-ai", "embedded", "hardware", "debugging"]
---

**Project:** Thalassemia Capture App (Flask + OpenCV, MiiCam USB microscope camera)
**Period:** ~July 27 – August 3, 2026
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

Tried the Linux ARM64 driver/SDK from `touptekphotonics.com` (the original vendor of the ToupTek chipset that's rebranded as MiiCam) — the camera was successfully detected through that driver application.

**Conclusion:** the MiiCam is likely not fully UVC-compliant in a way that the standard `uvcvideo` kernel module can bind to on this Jetson platform. The Linux kernel module fails to bind the device (even though it's successfully recognized at the USB level), but the vendor SDK (direct communication via `libusb`, bypassing `uvcvideo`/V4L2) works. This means Linux/Jetson integration for this app needs the ToupTek/MII vendor SDK as a separate capture backend, rather than relying on `cv2.VideoCapture` + generic V4L2 as currently used.

**Separate issue: yellow tint on some laptops (Windows)**

- Found during testing: captured images looked yellowish on 2 laptops, but normal ("white") on 1 laptop — confirmed this was the same physical camera & microscope, just moved between laptops.
- Initial hypothesis: different color format (YUV) negotiation between laptops → fix applied: explicitly force `MJPG` format via `cap.set(CAP_PROP_FOURCC, ...)` in `CameraManager.open()`, so decoding always goes through the same standard JPEG path consistently across machines.
- Compared Driver Provider/Version in Device Manager across laptops → results were identical, so it's not a driver version issue.
- Next hypothesis suggested (not yet confirmed by the user): Windows Night Light / blue light filter active on the 2 laptops showing yellow — this would only affect the on-screen display, not the saved PNG file. Needs verification by opening the saved file on a different laptop.

## Status & Next Steps (as of August 3, 2026)

- [ ] Extract & study the contents of `miicamsdk.20250415.zip` (find the ARM64 `.so` library + Python bindings, e.g. `toupcam.py`) for integration planning.
- [ ] Design an alternative capture backend for Linux that uses the vendor SDK (not `cv2.VideoCapture`), possibly auto-enabled via OS detection / V4L2 failure.
- [ ] Verify the Night Light hypothesis for the yellow tint issue (compare saved PNG files across different laptops).
- [ ] (Optional, if another power-hungry camera comes up later) Keep a powered USB hub on hand as a general mitigation for the Jetson.

## Related Files & Locations

- App working copy: `thalassemia-capture-app/`
- Thesis documentation mirror: `docs/gaps/thalassemia-capture-app/`
- Stable Windows version archive (before the Linux port): `thalassemia-capture-app-windows-archive/`
