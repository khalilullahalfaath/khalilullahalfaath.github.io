/* Notebook reading features:
   1. Footnotes become margin notes on wide screens (bottom list stays on phones).
   2. Blockquotes that start with "Result:", "Problem:" or "Next:" become labelled callouts. */
(function () {
  const content = document.querySelector(".single .content, .lab-single .content");
  if (!content) return;

  content.querySelectorAll("blockquote").forEach((q) => {
    const lead = q.querySelector(":scope > p:first-child > strong:first-child");
    const m = lead && lead.textContent.trim().match(/^(Result|Problem|Next)\s*:?$/i);
    if (m) {
      q.classList.add("nb-callout", "is-" + m[1].toLowerCase());
      q.dataset.label = m[1];
      lead.remove();
    }
  });

  const refs = [...content.querySelectorAll('sup[id^="fnref"] a[href^="#fn"]')];
  if (!refs.length) return;
  const notes = [];
  refs.forEach((a) => {
    const li = document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
    if (!li) return;
    const aside = document.createElement("aside");
    aside.className = "nb-sidenote";
    aside.setAttribute("aria-hidden", "true");
    const clone = li.cloneNode(true);
    clone.querySelectorAll(".footnote-backref").forEach((b) => b.remove());
    aside.innerHTML = '<span class="nb-sidenote-no">' + a.textContent + "</span> " + clone.innerHTML;
    content.appendChild(aside);
    notes.push({ ref: a, aside });
  });

  const wide = window.matchMedia("(min-width: 1080px)");
  function layout() {
    content.classList.toggle("has-sidenotes", wide.matches);
    if (!wide.matches) return;
    const base = content.getBoundingClientRect().top;
    let floor = 0;
    notes.forEach(({ ref, aside }) => {
      const top = Math.max(ref.getBoundingClientRect().top - base - 4, floor);
      aside.style.top = top + "px";
      floor = top + aside.offsetHeight + 12;
    });
  }
  layout();
  wide.addEventListener("change", layout);
  window.addEventListener("resize", layout);
  if (document.fonts) document.fonts.ready.then(layout);
  window.addEventListener("load", layout);
})();
