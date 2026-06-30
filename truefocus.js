/* ============================================================
   TrueFocus (React Bits) ported to vanilla JS — no motion lib.
   For each [data-true-focus] container: auto-cycles a "focus frame"
   (four corner brackets) across the .focus-word spans, blurring the
   inactive words. Pure CSS transitions drive the motion.
   Config via data-attrs: data-blur, data-duration, data-pause.
   ============================================================ */
(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var containers = document.querySelectorAll("[data-true-focus]");
  if (!containers.length) return;

  containers.forEach(function (container) {
    var words = Array.prototype.slice.call(container.querySelectorAll(".focus-word"));
    var frame = container.querySelector(".focus-frame");
    if (!words.length || !frame) return;

    var blur = parseFloat(container.getAttribute("data-blur"));
    if (isNaN(blur)) blur = 5;
    var dur = parseFloat(container.getAttribute("data-duration"));
    if (isNaN(dur)) dur = 0.5;
    var pause = parseFloat(container.getAttribute("data-pause"));
    if (isNaN(pause)) pause = 1;

    var idx = 0;

    words.forEach(function (w) { w.style.transition = "filter " + dur + "s ease"; });
    frame.style.transition =
      "transform " + dur + "s ease, width " + dur + "s ease, height " + dur + "s ease, opacity " + dur + "s ease";

    function moveTo(i) {
      var pr = container.getBoundingClientRect();
      var ar = words[i].getBoundingClientRect();
      frame.style.transform =
        "translate(" + (ar.left - pr.left) + "px," + (ar.top - pr.top) + "px)";
      frame.style.width = ar.width + "px";
      frame.style.height = ar.height + "px";
      frame.style.opacity = "1";
      words.forEach(function (w, j) {
        w.style.filter = j === i ? "blur(0px)" : "blur(" + blur + "px)";
      });
    }

    if (reduce) {
      words.forEach(function (w) { w.style.filter = "none"; });
      frame.style.opacity = "0";
      return;
    }

    function start() {
      moveTo(idx);
      setInterval(function () {
        idx = (idx + 1) % words.length;
        moveTo(idx);
      }, (dur + pause) * 1000);
    }

    // Position once layout/fonts are settled.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      window.addEventListener("load", start);
    }
    window.addEventListener("resize", function () { moveTo(idx); });
  });
})();
