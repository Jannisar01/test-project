/* ============================================================
   MagicBento (React Bits) ported to vanilla JS — no gsap / motion.
   Effects per [data-bento] grid (configurable via data-* attributes):
     - cursor spotlight that fades card borders/highlights by proximity
     - per-card border glow following the pointer
     - 3D tilt + subtle magnetism toward the cursor
     - click ripple
     - floating particle "stars" on hover
   Uses requestAnimationFrame, Web Animations API and CSS custom props.
   Respects prefers-reduced-motion (disables motion, keeps static styling).
   ============================================================ */
(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var grids = document.querySelectorAll("[data-bento]");
  if (!grids.length) return;

  grids.forEach(function (grid) {
    var glow = grid.getAttribute("data-glow") || "74, 93, 108"; // "r, g, b"
    var spotlightRadius = parseFloat(grid.getAttribute("data-spotlight")) || 320;
    var particleCount = parseInt(grid.getAttribute("data-particles"), 10);
    if (isNaN(particleCount)) particleCount = 8;
    var enableTilt = grid.getAttribute("data-tilt") !== "false";
    var enableMagnet = grid.getAttribute("data-magnet") !== "false";

    var cards = Array.prototype.slice.call(grid.querySelectorAll(".bento-card"));

    /* ---- Global cursor spotlight overlay ---------------------------- */
    var spotlight = document.createElement("div");
    spotlight.className = "bento-spotlight";
    spotlight.style.background =
      "radial-gradient(circle, rgba(" + glow + ", 0.18) 0%, rgba(" +
      glow + ", 0.08) 18%, rgba(" + glow + ", 0) 70%)";
    grid.appendChild(spotlight);

    function moveSpotlight(e) {
      var r = grid.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      spotlight.style.setProperty("--sx", x + "px");
      spotlight.style.setProperty("--sy", y + "px");
      spotlight.style.setProperty("--sr", spotlightRadius + "px");
      spotlight.style.opacity = "1";

      // Fade each card's border glow by proximity to the pointer.
      cards.forEach(function (card) {
        var cr = card.getBoundingClientRect();
        var cx = cr.left + cr.width / 2 - r.left;
        var cy = cr.top + cr.height / 2 - r.top;
        var dist = Math.hypot(x - cx, y - cy);
        var fade = Math.max(0, 1 - dist / (spotlightRadius * 1.4));
        card.style.setProperty("--glow-opacity", fade.toFixed(3));
      });
    }
    function hideSpotlight() {
      spotlight.style.opacity = "0";
      cards.forEach(function (card) {
        card.style.setProperty("--glow-opacity", "0");
      });
    }

    if (!reduce) {
      grid.addEventListener("pointermove", moveSpotlight);
      grid.addEventListener("pointerleave", hideSpotlight);
    }

    /* ---- Per-card effects ------------------------------------------ */
    cards.forEach(function (card) {
      card.style.setProperty("--glow", glow);

      function onMove(e) {
        var r = card.getBoundingClientRect();
        var px = e.clientX - r.left;
        var py = e.clientY - r.top;
        // border-glow origin (in %)
        card.style.setProperty("--glow-x", (px / r.width) * 100 + "%");
        card.style.setProperty("--glow-y", (py / r.height) * 100 + "%");

        if (reduce) return;

        if (enableTilt) {
          var rx = ((py / r.height) - 0.5) * -8; // deg
          var ry = ((px / r.width) - 0.5) * 8;
          card.style.setProperty("--rx", rx.toFixed(2) + "deg");
          card.style.setProperty("--ry", ry.toFixed(2) + "deg");
        }
        if (enableMagnet) {
          var mx = ((px / r.width) - 0.5) * 6; // px
          var my = ((py / r.height) - 0.5) * 6;
          card.style.setProperty("--mx", mx.toFixed(2) + "px");
          card.style.setProperty("--my", my.toFixed(2) + "px");
        }
      }

      function reset() {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--mx", "0px");
        card.style.setProperty("--my", "0px");
      }

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", reset);

      if (reduce) return;

      /* particles on hover */
      var particles = [];
      function spawnParticles() {
        var r = card.getBoundingClientRect();
        for (var i = 0; i < particleCount; i++) {
          (function (i) {
            var p = document.createElement("span");
            p.className = "bento-particle";
            p.style.background = "rgba(" + glow + ", 0.9)";
            p.style.boxShadow = "0 0 6px rgba(" + glow + ", 0.7)";
            var startX = Math.round((0.12 + 0.76 * ((i + 1) / (particleCount + 1))) * r.width);
            var startY = Math.round((0.2 + 0.6 * pseudo(i)) * r.height);
            p.style.left = startX + "px";
            p.style.top = startY + "px";
            card.appendChild(p);
            particles.push(p);
            var anim = p.animate(
              [
                { transform: "translate(0,0) scale(0)", opacity: 0 },
                { transform: "translate(0,0) scale(1)", opacity: 1, offset: 0.15 },
                {
                  transform:
                    "translate(" + (pseudo(i + 1) * 24 - 12).toFixed(0) + "px," +
                    (-18 - pseudo(i + 2) * 22).toFixed(0) + "px) scale(1)",
                  opacity: 0
                }
              ],
              {
                duration: 2200 + pseudo(i) * 1600,
                easing: "ease-out",
                iterations: Infinity
              }
            );
            p._anim = anim;
          })(i);
        }
      }
      function clearParticles() {
        particles.forEach(function (p) {
          if (p._anim) p._anim.cancel();
          if (p.parentNode) p.parentNode.removeChild(p);
        });
        particles = [];
      }
      card.addEventListener("pointerenter", spawnParticles);
      card.addEventListener("pointerleave", clearParticles);

      /* click ripple */
      card.addEventListener("pointerdown", function (e) {
        var r = card.getBoundingClientRect();
        var ripple = document.createElement("span");
        ripple.className = "bento-ripple";
        ripple.style.background =
          "radial-gradient(circle, rgba(" + glow + ", 0.5) 0%, rgba(" +
          glow + ", 0) 70%)";
        var size = Math.max(r.width, r.height) * 1.4;
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = e.clientX - r.left - size / 2 + "px";
        ripple.style.top = e.clientY - r.top - size / 2 + "px";
        card.appendChild(ripple);
        ripple.animate(
          [
            { transform: "scale(0)", opacity: 0.6 },
            { transform: "scale(1)", opacity: 0 }
          ],
          { duration: 700, easing: "ease-out" }
        ).onfinish = function () {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        };
      });
    });
  });

  // Deterministic pseudo-random in [0,1) so layout is stable across renders.
  function pseudo(n) {
    var x = Math.sin((n + 1) * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }
})();
