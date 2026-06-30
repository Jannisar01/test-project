/* ============================================================
   TextType (React Bits) ported to vanilla JS.
   Typing / deleting / re-typing rotation through a list of words.
   No gsap/motion needed — the cursor blink is pure CSS.
   ============================================================ */
(function () {
  "use strict";

  var el = document.getElementById("hero-type");
  if (!el) return;

  var words = ["Women's Services", "The Arts", "Education", "Community Builders"];
  var typingSpeed = 80;   // ms per typed character
  var deletingSpeed = 40; // ms per deleted character
  var pause = 1500;       // hold after a word is fully typed
  var initialDelay = 400;

  // Respect reduced-motion: show the first word, no animation.
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words[0];
    return;
  }

  var wi = 0;
  var ci = 0;
  var deleting = false;

  function tick() {
    var word = words[wi];
    if (!deleting) {
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, pause);
      } else {
        setTimeout(tick, typingSpeed);
      }
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, typingSpeed * 3);
      } else {
        setTimeout(tick, deletingSpeed);
      }
    }
  }

  setTimeout(tick, initialDelay);
})();
