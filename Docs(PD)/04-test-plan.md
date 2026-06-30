# Test Plan & Test Cases
### Café Global Grant Writing Website — MVP

---

## 1. Test Strategy

A lightweight, manual test pass appropriate for a one-page marketing MVP built on a no-code platform. Focus is weighted toward the **conversion path (contact form)** since it is the primary success metric. Testing is performed by the builder, with final sign-off by the owner via UAT.

## 2. Scope

**In scope:** content correctness, navigation/CTAs, contact form (validation, delivery, auto-reply, states), responsiveness, accessibility basics, performance, SSL, cross-browser, SEO basics, owner-editability.

**Out of scope:** load/stress testing, penetration testing, automated regression suites, anything tied to deferred features (portal, booking, payments).

## 3. Test Environments

| Type | Targets |
|---|---|
| Desktop browsers | Latest 2 versions of Chrome, Safari, Firefox, Edge |
| Mobile | iOS Safari + Android Chrome (phone), one tablet width |
| Network | Normal + one throttled (3G-class) run for performance |
| Email | Owner inbox (delivery) + a separate test address (auto-reply) |

## 4. Entry / Exit Criteria

- **Entry:** site built on staging/preview URL; copy finalized; form endpoint configured.
- **Exit:** all Must-priority test cases Pass; no open blocker defects; owner UAT sign-off recorded.

## 5. Test Cases

| TC | Linked Req | Title | Steps | Expected Result |
|---|---|---|---|---|
| TC-01 | FR-01 | Section order | Load page; scroll top→bottom | Sections appear: Hero → Awareness → Services → Consultation → Contact → Footer |
| TC-02 | FR-01 | In-page CTA scroll | Click each "consultation" CTA | Page scrolls/anchors to the contact form |
| TC-03 | FR-02 | Header & Contact link | Inspect header; click Contact | Brand visible; Contact link jumps to form |
| TC-04 | FR-04 | Hero content | Inspect hero | Approved headline, subheader, and CTA present |
| TC-05 | FR-05 | Awareness band | Inspect section | Educational "hire a grant writer" copy present above Services |
| TC-06 | FR-06 | Three service cards | Inspect Services | Exactly 3 cards: Research, Proposal Writing, Reporting & Compliance — each with icon, title, 2–3 sentence copy |
| TC-07 | FR-07 | Consultation section | Inspect section | Headline, body, and "Request Your Consultation" CTA present |
| TC-08 | FR-08 | Form fields render | Inspect form | All 7 fields present with visible labels above inputs; required markers shown |
| TC-09 | FR-10, NFR-08 | Field integrity on delivery | Submit valid form with known values | Email received contains every field value, accurately; no extra data collected |
| TC-10 | FR-09 | Validation | Submit empty form; submit invalid email | Required-field errors shown inline; invalid email rejected with message |
| TC-11 | FR-10 | Delivery to owner | Submit valid form | Submission lands in owner inbox within expected time |
| TC-12 | FR-11 | Auto-acknowledgment | Submit with test submitter address | Submitter receives auto-reply ("in touch within X business days") |
| TC-13 | FR-12 | Success & error states | Submit valid; simulate failure | Success confirmation shown; failure shows recoverable error |
| TC-14 | FR-13 | Spam mitigation | Trigger honeypot / platform protection | Spam blocked; legitimate submission unaffected |
| TC-15 | FR-14 | Footer | Inspect footer | Brand line, cafeglobal.org, correct email & phone, sectors served |
| TC-16 | FR-03, NFR-03 | Responsive layout | View at 480 / 768 / 1024px | Services stack on mobile; no horizontal scroll; tap targets adequate |
| TC-17 | NFR-04 | SSL active | Visit https://cafeglobal.org | Valid cert; no mixed-content warnings; form posts over HTTPS |
| TC-18 | NFR-01 | Performance | Load on throttled connection | Loads in reasonable time; images optimized |
| TC-19 | NFR-02 | Accessibility | Run contrast check; keyboard-only nav | Contrast ≥ AA; all fields labeled; full keyboard navigation + logical focus order |
| TC-20 | Charter | Launch readiness | Run pre-launch checklist | All checklist items pass |
| TC-21 | NFR-05 | Cross-browser | Open on Chrome/Safari/Firefox/Edge | Renders and functions consistently |
| TC-22 | NFR-06 | Owner-editability | Owner edits a line of copy | Owner can update text/image without developer (or per documented process) |
| TC-23 | NFR-07 | SEO basics | View source / inspect head | Unique title, meta description, single `<h1>`, logical heading order |

## 6. Defect Severity

| Severity | Definition | Launch impact |
|---|---|---|
| Blocker | Form doesn't deliver, site down, no SSL | Must fix before launch |
| Major | Validation broken, broken layout on mobile, wrong contact info | Fix before launch |
| Minor | Cosmetic spacing, non-critical copy tweak | May fix post-launch |

## 7. UAT Sign-off

Owner reviews the live/staging site against this plan and confirms: copy is accurate and honestly positioned, a real test submission arrived in the inbox, and the auto-reply works. Sign-off captured in `README.md`.
