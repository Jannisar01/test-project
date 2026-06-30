/* ============================================================
   StaggeredMenu (React Bits) ported to vanilla JS.
   Hamburger toggle -> right slide-out panel with prelayer color
   sweep + staggered item entrance. No gsap; CSS transitions drive it.
   ============================================================ */
(function () {
  "use strict";

  var toggle = document.getElementById("sm-toggle");
  var menu = document.getElementById("sm");
  var panel = document.getElementById("sm-panel");
  if (!toggle || !menu || !panel) return;

  var label = toggle.querySelector(".sm-toggle-text");

  function open() {
    menu.classList.add("open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    panel.setAttribute("aria-hidden", "false");
    if (label) label.textContent = "Close";
  }
  function close() {
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    panel.setAttribute("aria-hidden", "true");
    if (label) label.textContent = "Menu";
  }

  toggle.addEventListener("click", function () {
    menu.classList.contains("open") ? close() : open();
  });

  // Close after choosing a destination
  panel.addEventListener("click", function (e) {
    if (e.target.closest("a")) close();
  });

  // Click-away
  document.addEventListener("click", function (e) {
    if (
      menu.classList.contains("open") &&
      !panel.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      close();
    }
  });

  // Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("open")) close();
  });
})();
