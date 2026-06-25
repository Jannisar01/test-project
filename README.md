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

## Connect the contact form → Google Sheet (required before launch)

Submissions go straight into a Google Sheet that Holly owns, and the script
emails Holly on every lead **and** sends the nonprofit an auto-reply. No
third-party service, no monthly fee. The full script lives in
[`apps-script/Code.gs`](apps-script/Code.gs).

**Setup (one time, ~5 minutes, done in Holly's Google account):**

1. Create a new **Google Sheet** (share it with `holly@cafeglobal.org` if
   someone else owns it).
2. In the Sheet: **Extensions → Apps Script**. Delete the sample code, paste
   the entire contents of `apps-script/Code.gs`, and **Save**.
3. **Deploy → New deployment → Web app**:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   - Click **Deploy**, authorize when prompted, and copy the **Web app URL**
     (ends in `/exec`).
4. In `index.html`, find the `<form ... action="...">` tag and replace
   `https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec`
   with the URL you copied.

That's it — the first submission creates the column headers automatically.

> **Editing the script later?** You must redeploy for changes to go live:
> **Deploy → Manage deployments → ✏️ → Version: New version → Deploy.** The
> `/exec` URL stays the same, so the website needs no further changes.

Until a real endpoint is set, the form validates but shows a notice instead of
sending (so nothing is silently lost during setup).

**Form fields captured:** contact name, email, organization name, organization
type, 501(c)(3) status (Yes/No/Pending), website (optional), and a message —
exactly the data needed to qualify a lead and prep for the listening session.
A hidden honeypot field (`_gotcha`) silently filters spam bots.

*(Prefer a hosted form service instead? The site also supports a
[Formspree](https://formspree.io) endpoint — just paste a `formspree.io/f/...`
URL into the same `action` attribute; the JavaScript auto-detects which one
you're using.)*

## Deploy

Any static host works. Fastest options:

- **Netlify / Cloudflare Pages / GitHub Pages** — drag-and-drop or connect this
  repo; point the `cafeglobal.org` DNS at the host and enable SSL.
- No server-side code is required.

## Customize

- **Contact info:** update the email (`Holly@cafeglobal.org`) and add a phone in
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
