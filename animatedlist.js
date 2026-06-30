/* ============================================================
   AnimatedList (React Bits) ported to vanilla JS — no motion lib.
   Drives [data-animated-list] containers:
     - items scale + fade in when they scroll into the list's view
       (IntersectionObserver, re-triggers on scroll like the original)
     - top/bottom gradient overlays fade based on scroll position
     - hover + arrow-key selection highlight (keyboard nav is scoped to
       when focus is inside the list, so it never hijacks page scroll)
   Pairs with the FAQ <details> accordions (native expand kept intact).
   ============================================================ */
(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var containers = document.querySelectorAll("[data-animated-list]");
  if (!containers.length) return;

  containers.forEach(function (container) {
    var scroll = container.querySelector(".scroll-list");
    var track = container.querySelector(".al-track");
    var loop = container.hasAttribute("data-loop");
    var topG = container.querySelector(".top-gradient");
    var botG = container.querySelector(".bottom-gradient");
    if (!scroll) return;

    var selected = -1;

    /* ---- Continuous looping marquee mode ---- */
    if (loop && track) {
      // Duplicate the item set once so the CSS translateY(-50%) loops seamlessly.
      var originals = Array.prototype.slice.call(track.children);
      originals.forEach(function (node) {
        var clone = node.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        track.appendChild(clone);
      });
      var allItems = Array.prototype.slice.call(container.querySelectorAll(".al-item"));
      var loopSel = null;
      allItems.forEach(function (it) {
        it.classList.add("al-in"); // always visible; the loop handles motion
        it.addEventListener("mouseenter", function () {
          if (loopSel) loopSel.classList.remove("al-selected");
          loopSel = it;
          it.classList.add("al-selected");
        });
      });

      if (reduce) return;

      // Auto-scroll via native scrollTop so the list stays manually scrollable.
      var speed = 0.4;          // px per frame (~24px/s)
      var paused = false;
      var resumeTimer = null;
      function half() { return track.scrollHeight / 2; }

      function pauseTemporarily() {
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () { paused = false; }, 1600);
      }
      // Pause while hovering or interacting; resume shortly after.
      container.addEventListener("mouseenter", function () { paused = true; });
      container.addEventListener("mouseleave", function () { paused = false; });
      scroll.addEventListener("wheel", pauseTemporarily, { passive: true });
      scroll.addEventListener("touchstart", pauseTemporarily, { passive: true });
      scroll.addEventListener("touchmove", pauseTemporarily, { passive: true });
      // Keep the manual scroll seamless by wrapping at the halfway point.
      scroll.addEventListener("scroll", function () {
        var h = half();
        if (scroll.scrollTop >= h) scroll.scrollTop -= h;
      }, { passive: true });

      function tick() {
        if (!paused) {
          scroll.scrollTop += speed;
          if (scroll.scrollTop >= half()) scroll.scrollTop -= half();
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      return; // gradients are static (CSS)
    }

    var items = Array.prototype.slice.call(container.querySelectorAll(".al-item"));
    if (!items.length) return;

    /* ---- Scale + fade in on scroll into view ---- */
    if (!reduce) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            en.target.classList.toggle("al-in", en.isIntersecting);
          });
        },
        { root: scroll, threshold: 0.5 }
      );
      items.forEach(function (it) { io.observe(it); });
    } else {
      items.forEach(function (it) { it.classList.add("al-in"); });
    }

    /* ---- Gradient overlays react to scroll position ---- */
    function updateGradients() {
      var st = scroll.scrollTop;
      var sh = scroll.scrollHeight;
      var ch = scroll.clientHeight;
      if (topG) topG.style.opacity = Math.min(st / 50, 1);
      if (botG) {
        var bottomDistance = sh - (st + ch);
        botG.style.opacity = sh <= ch ? 0 : Math.min(bottomDistance / 50, 1);
      }
    }
    scroll.addEventListener("scroll", updateGradients, { passive: true });
    updateGradients();

    /* ---- Selection highlight (hover) ---- */
    function setSelected(i) {
      if (selected >= 0 && items[selected]) items[selected].classList.remove("al-selected");
      selected = i;
      if (items[i]) items[i].classList.add("al-selected");
    }
    items.forEach(function (it, i) {
      it.addEventListener("mouseenter", function () { setSelected(i); });
    });

    /* ---- Arrow-key navigation, scoped to focus inside the list ---- */
    function scrollSelectedIntoView() {
      var el = items[selected];
      if (!el) return;
      var cr = scroll.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      var m = 40;
      if (er.top < cr.top + m) {
        scroll.scrollBy({ top: er.top - cr.top - m, behavior: "smooth" });
      } else if (er.bottom > cr.bottom - m) {
        scroll.scrollBy({ top: er.bottom - cr.bottom + m, behavior: "smooth" });
      }
    }
    document.addEventListener("keydown", function (e) {
      if (!container.contains(document.activeElement)) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected(Math.min(selected + 1, items.length - 1));
        scrollSelectedIntoView();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected(Math.max(selected - 1, 0));
        scrollSelectedIntoView();
      }
    });
  });
})();
