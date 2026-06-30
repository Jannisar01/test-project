/* ============================================================
   GlassSurface (React Bits) ported to vanilla JS.
   Drives the #glass-surface-filter: builds an SVG displacement map
   sized to the header and applies per-channel chromatic displacement.
   Falls back to a plain blur on browsers without url() backdrop-filter.
   ============================================================ */
(function () {
  "use strict";

  var target = document.querySelector(".header-inner");
  if (!target) return;

  var feImage = document.getElementById("gs-feimage");
  var redCh = document.getElementById("gs-red");
  var greenCh = document.getElementById("gs-green");
  var blueCh = document.getElementById("gs-blue");
  var blur = document.getElementById("gs-blur");

  // Tunables (GlassSurface defaults, lightly adapted)
  var cfg = {
    borderRadius: 999,
    borderWidth: 0.07,
    brightness: 50,
    opacity: 0.93,
    inputBlur: 11,
    displace: 0.6,
    distortionScale: -150,
    redOffset: 0,
    greenOffset: 12,
    blueOffset: 22,
    xChannel: "R",
    yChannel: "G"
  };

  // Chromium-only: url() backdrop filters with feDisplacementMap.
  var ua = navigator.userAgent;
  var isWebkit = /Safari/.test(ua) && !/Chrome/.test(ua);
  var isFirefox = /Firefox/.test(ua);
  var supported = !isWebkit && !isFirefox;

  if (!supported || !feImage) {
    target.classList.add("glass-surface--fallback");
    return;
  }
  target.classList.add("glass-surface--svg");

  function buildMap(w, h) {
    var br = Math.min(cfg.borderRadius, h / 2);
    var edge = Math.min(w, h) * (cfg.borderWidth * 0.5);
    var svg =
      '<svg viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg">' +
      "<defs>" +
      '<linearGradient id="rg" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>' +
      '<linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>' +
      "</defs>" +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="black"/>' +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + br + '" fill="url(#rg)"/>' +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + br + '" fill="url(#bg)" style="mix-blend-mode:difference"/>' +
      '<rect x="' + edge + '" y="' + edge + '" width="' + (w - edge * 2) + '" height="' + (h - edge * 2) + '" rx="' + br + '" fill="hsl(0 0% ' + cfg.brightness + "% / " + cfg.opacity + ')" style="filter:blur(' + cfg.inputBlur + 'px)"/>' +
      "</svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function update() {
    var r = target.getBoundingClientRect();
    var w = Math.max(1, Math.round(r.width));
    var h = Math.max(1, Math.round(r.height));
    feImage.setAttribute("href", buildMap(w, h));
    feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", buildMap(w, h));
    redCh.setAttribute("scale", String(cfg.distortionScale + cfg.redOffset));
    greenCh.setAttribute("scale", String(cfg.distortionScale + cfg.greenOffset));
    blueCh.setAttribute("scale", String(cfg.distortionScale + cfg.blueOffset));
    [redCh, greenCh, blueCh].forEach(function (c) {
      c.setAttribute("xChannelSelector", cfg.xChannel);
      c.setAttribute("yChannelSelector", cfg.yChannel);
    });
    blur.setAttribute("stdDeviation", String(cfg.displace));
  }

  update();
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function () { update(); });
    ro.observe(target);
  }
  window.addEventListener("resize", update);
})();
