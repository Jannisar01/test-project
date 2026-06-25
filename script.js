/* ============================================================
   Café Global — front-end behavior
   - Accessible client-side form validation
   - Graceful submission to a Formspree-style endpoint (AJAX),
     with a no-JS fallback (the form still POSTs normally).
   ============================================================ */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var form = document.getElementById("consultation-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");

  // Fields to validate: id -> human label + custom message
  var rules = [
    { name: "contact_name", id: "contact-name", message: "Please enter your name." },
    { name: "email", id: "email", message: "Please enter a valid email address." },
    { name: "organization_name", id: "org-name", message: "Please enter your organization's name." },
    { name: "organization_type", id: "org-type", message: "Please choose an organization type." },
    { name: "nonprofit_status", id: "nonprofit_status", message: "Please select your 501(c)(3) status." },
    { name: "website", id: "website", message: "Please enter a valid URL (including https://).", optional: true },
    { name: "message", id: "message", message: "Please tell me a little about what you need." }
  ];

  function showError(rule, show) {
    var errEl = form.querySelector('[data-error-for="' + rule.id + '"]');
    var field = errEl ? errEl.closest(".field, .field-radio") : null;
    if (errEl) {
      errEl.textContent = show ? rule.message : "";
      errEl.hidden = !show;
    }
    if (field) field.classList.toggle("invalid", show);
    var control = document.getElementById(rule.id);
    if (control) control.setAttribute("aria-invalid", show ? "true" : "false");
  }

  function validateRule(rule) {
    // Radio group is validated by name, not id
    if (rule.name === "nonprofit_status") {
      var checked = form.querySelector('input[name="nonprofit_status"]:checked');
      var ok = !!checked;
      showError(rule, !ok);
      return ok;
    }

    var el = document.getElementById(rule.id);
    if (!el) return true;
    var value = (el.value || "").trim();

    if (rule.optional && value === "") {
      showError(rule, false);
      return true;
    }
    if (value === "") {
      showError(rule, true);
      return false;
    }
    // Native validity covers email/url type checks
    if (typeof el.checkValidity === "function" && !el.checkValidity()) {
      showError(rule, true);
      return false;
    }
    showError(rule, false);
    return true;
  }

  function validateForm() {
    var firstInvalid = null;
    var valid = true;
    rules.forEach(function (rule) {
      var ok = validateRule(rule);
      if (!ok && !firstInvalid) {
        firstInvalid =
          rule.name === "nonprofit_status"
            ? form.querySelector('input[name="nonprofit_status"]')
            : document.getElementById(rule.id);
      }
      valid = valid && ok;
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  // Live-clear errors as the user fixes a field
  form.addEventListener("input", function (e) {
    var target = e.target;
    var rule = rules.filter(function (r) {
      return r.id === target.id || r.name === target.name;
    })[0];
    if (rule) validateRule(rule);
  });

  function setStatus(message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "form-status " + kind;
    statusEl.hidden = false;
  }

  form.addEventListener("submit", function (e) {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }

    var action = form.getAttribute("action") || "";

    // If the action endpoint is still a placeholder, don't fire a real POST.
    if (
      action.indexOf("REPLACE_WITH_YOUR_DEPLOYMENT_ID") !== -1 ||
      action.indexOf("your-form-id") !== -1
    ) {
      e.preventDefault();
      setStatus(
        "Thanks! This form isn't connected yet. Follow the Google Sheet setup " +
          "in README.md, then paste your deployment URL into index.html.",
        "failure"
      );
      return;
    }

    var SUCCESS = "Thank you — your request is in. I'll be in touch within two business days.";
    var isAppsScript = action.indexOf("script.google.com") !== -1;

    // No fetch (very old browser): let the form POST normally.
    if (!window.fetch) return;

    e.preventDefault();
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.label = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
    }

    function restoreBtn() {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.label || "Submit";
      }
    }

    if (isAppsScript) {
      // Google Apps Script web apps don't send CORS headers, so we POST in
      // "no-cors" mode. The response is opaque (unreadable) but the request
      // still reaches the script and writes the row — so a resolved promise
      // means success.
      fetch(action, { method: "POST", mode: "no-cors", body: new FormData(form) })
        .then(function () {
          form.reset();
          setStatus(SUCCESS, "success");
        })
        .catch(function () {
          setStatus(
            "Network error — please email Holly@cafeglobal.org and I'll respond personally.",
            "failure"
          );
        })
        .finally(restoreBtn);
      return;
    }

    // Formspree-style JSON endpoint (kept as an alternative).
    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          setStatus(SUCCESS, "success");
        } else {
          return response.json().then(function (data) {
            var msg =
              data && data.errors
                ? data.errors.map(function (er) { return er.message; }).join(", ")
                : "Something went wrong. Please email Holly@cafeglobal.org instead.";
            setStatus(msg, "failure");
          });
        }
      })
      .catch(function () {
        setStatus(
          "Network error — please email Holly@cafeglobal.org and I'll respond personally.",
          "failure"
        );
      })
      .finally(restoreBtn);
  });
})();
