# Café Global — Grant Writing Services Website

Marketing website (MVP) for **Café Global**, a solo grant writing consultancy
serving nonprofits. The site's job is to (1) raise awareness that hiring a grant
writer is an option, (2) build trust, and (3) convert visitors into **free
consultation** requests via a contact form.

**Domain:** cafeglobal.org

## What this is

A single-page, fast-loading static website — no build step, no framework, no
dependencies. Three files do the work:

| File | Purpose |
|---|---|
| `index.html` | Page structure & content (hero, awareness band, 3 services, consultation, contact form, footer) |
| `styles.css` | Design system — deep-teal primary + warm-gold accent, responsive, WCAG-AA conscious |
| `script.js` | Accessible client-side form validation + graceful AJAX submission |
| `favicon.svg` | Site icon |

It's intentionally lightweight so it loads quickly for visitors on older
devices or slower connections.

## Run it locally

It's plain static files — just open `index.html` in a browser, or serve the
folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Connect the contact form (required before launch)

The form posts to [Formspree](https://formspree.io) (free, no-code) so
submissions land in the owner's inbox. To wire it up:

1. Create a free Formspree account and a new form.
2. Copy your form endpoint (looks like `https://formspree.io/f/abc123xy`).
3. In `index.html`, find the `<form ... action="...">` tag and replace
   `https://formspree.io/f/your-form-id` with your real endpoint.
4. (Recommended) In Formspree, turn on the **auto-response** so submitters get
   a "Thanks — I'll be in touch within two business days" confirmation email.

Until a real endpoint is set, the form validates but shows a notice instead of
sending (so no submissions are silently lost during setup).

**Form fields captured:** contact name, email, organization name, organization
type, 501(c)(3) status (Yes/No/Pending), website (optional), and a message —
exactly the data needed to qualify a lead and prep for the listening session.
A hidden honeypot field (`_gotcha`) helps filter spam.

## Deploy

Any static host works. Fastest options:

- **Netlify / Cloudflare Pages / GitHub Pages** — drag-and-drop or connect this
  repo; point the `cafeglobal.org` DNS at the host and enable SSL.
- No server-side code is required.

## Customize

- **Contact info:** update the email (`hello@cafeglobal.org`) and add a phone in
  `index.html` (footer + form note) when ready.
- **Headshot:** a professional photo builds trust fast — drop one into the hero
  or consultation section when available (noted as recommended in the brief).
- **Colors/fonts:** all tokens live at the top of `styles.css` (`:root`).

## Honest-positioning note

Per the brief, the copy leans on **real** experience and trustworthiness without
overclaiming. The optional credibility line (~50% success rate via community
foundations, humanities councils, and state grants) can be added when the owner
is comfortable. Testimonials, case studies, and certification are intentionally
deferred until available.

## Pre-launch checklist

- [ ] Replace Formspree endpoint and test a real submission end-to-end
- [ ] Confirm auto-reply fires
- [ ] Add real email + phone
- [ ] Add headshot (if available)
- [ ] Mobile layout check
- [ ] Connect domain + SSL
- [ ] Spelling/grammar pass
