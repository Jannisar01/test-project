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

    // If the action endpoint is still the placeholder, don't fire a real POST.
    if (form.getAttribute("action").indexOf("your-form-id") !== -1) {
      e.preventDefault();
      setStatus(
        "Thanks! This form isn't connected to an email endpoint yet. " +
          "Add your Formspree form ID in index.html to start receiving submissions.",
        "failure"
      );
      return;
    }

    // Progressive enhancement: submit via fetch so the visitor stays on-page.
    if (window.fetch) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.label = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            setStatus(
              "Thank you — your request is in. I'll be in touch within two business days.",
              "success"
            );
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
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.label || "Submit";
          }
        });
    }
    // If fetch is unavailable, the form submits normally (no preventDefault).
  });
})();
