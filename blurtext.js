/* ============================================================
   BlurText (React Bits) ported to vanilla JS — LETTER mode.
   Each letter blurs + fades + slides in, staggered, triggered when
   the element scrolls into view. Letters are grouped per word so
   words never break across lines. Pure CSS transitions (no motion).
   ============================================================ */
(function () {
  "use strict";

  var els = document.querySelectorAll("[data-blurtext]");
  if (!els.length) return;

  var reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var stagger = 0.03; // seconds between each letter

  els.forEach(function (el) {
    var text = el.textContent.replace(/\s+/g, " ").trim();
    var words = text.split(" ");
    el.textContent = "";

    var letters = [];
    words.forEach(function (word, wi) {
      var wrap = document.createElement("span");
      wrap.className = "bt-wordwrap";
      for (var i = 0; i < word.length; i++) {
        var s = document.createElement("span");
        s.className = "bt-word";
        s.textContent = word[i];
        wrap.appendChild(s);
        letters.push(s);
      }
      el.appendChild(wrap);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
    });

    if (reduce) {
      letters.forEach(function (s) { s.classList.add("bt-in"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            letters.forEach(function (s, i) {
              s.style.transitionDelay = (i * stagger).toFixed(2) + "s";
              s.classList.add("bt-in");
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
  });
})();
