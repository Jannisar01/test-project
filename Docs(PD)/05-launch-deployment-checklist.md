# Launch & Deployment Checklist
### Café Global Grant Writing Website — MVP

Target: **Tuesday next week** (hard) · **Thursday next week** (fallback).

---

## 1. Platform Decision (Day 1)

Pick one and record it here:

- [ ] **Squarespace** — fast, polished, built-in forms + hosting *(recommended for credible 1-week launch)*
- [ ] **Webflow** — strong design control, built-in forms/hosting
- [ ] **Carrd** — fastest possible one-page launch (least custom)
- [ ] **Hand-coded + Formspree** — only if a developer is building
- _Chosen platform:_ ________________

## 2. Content Readiness (Day 1–2)

- [ ] Final copy approved by owner (hero, awareness, 3 services, consultation, footer)
- [ ] Honest-positioning guardrail confirmed — no overclaiming; certification not implied
- [ ] Optional credibility line decided (in or out): "~50% success rate via community foundations, humanities councils, state grants"
- [ ] Owner headshot gathered (recommended) or explicitly deferred
- [ ] Service icons selected
- [ ] Contact email + phone confirmed for footer

## 3. Build (Day 3–4)

- [ ] Page structure built in section order (Hero → Awareness → Services → Consultation → Contact → Footer)
- [ ] Design system applied (1 primary + 1 accent color, serif headings / sans body, white space)
- [ ] Three service cards with icon + title + 2–3 sentence copy
- [ ] Contact form built with all 7 fields + visible labels + required markers
- [ ] Form routed to owner's email
- [ ] Auto-acknowledgment reply configured ("in touch within X business days")
- [ ] Spam protection enabled (honeypot / platform-native)
- [ ] Success + error states configured

## 4. Pre-Launch QA (Day 5) — run Test Plan

- [ ] Three service blocks finalized (TC-06)
- [ ] **Contact form tested end-to-end — real submission lands in inbox** (TC-09/TC-11)
- [ ] Auto-reply confirmed (TC-12)
- [ ] Validation works on empty/invalid input (TC-10)
- [ ] Mobile layout checked (TC-16)
- [ ] Accessibility basics: contrast, labels, keyboard nav (TC-19)
- [ ] Cross-browser check (TC-21)
- [ ] Spelling / grammar pass
- [ ] Page load speed acceptable on throttled connection (TC-18)
- [ ] SEO basics: title, meta description, single H1 (TC-23)

## 5. Domain & Go-Live (Day 5 → Launch)

- [ ] Point cafeglobal.org DNS to the chosen platform
- [ ] SSL provisioned and active (https loads, no mixed-content warnings) (TC-17)
- [ ] www and non-www both resolve correctly
- [ ] Final live smoke test: load site, submit one real form, confirm inbox + auto-reply
- [ ] Owner UAT sign-off recorded

## 6. Post-Launch (first 48 hours)

- [ ] Monitor inbox for first real submissions; confirm formatting is usable for qualifying leads
- [ ] Verify no spam flood; tune protection if needed
- [ ] Spot-check on owner's own phone + a colleague's device
- [ ] Note any minor defects for a follow-up pass

## 7. Rollback / Contingency

- [ ] If form delivery fails at go-live → temporarily display a `mailto:` link or direct email address as fallback while fixing the endpoint
- [ ] If DNS/SSL not ready by Tuesday → hold on platform preview URL and target Thursday fallback
- [ ] Keep previous DNS settings noted so the domain can be re-pointed if needed

## 8. Deferred (Backlog — add later)

Client portal · online booking/calendar · testimonials & case studies · certification badge (once earned) · blog/resource library · payment processing.
