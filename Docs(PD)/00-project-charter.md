# Project Charter — Café Global Grant Writing Website

| Field | Detail |
|---|---|
| **Project name** | Café Global Marketing Website (MVP) |
| **Domain** | cafeglobal.org (already owned) |
| **Project type** | Marketing website — awareness + lead conversion |
| **Document owner** | Senior Product Designer (discovery & handoff) |
| **Prepared from** | Business Analyst + Technical PM discovery interview |
| **Status** | Approved for build — pending client sign-off |
| **Target launch** | Tuesday next week (hard target) · Thursday next week (fallback) |

---

## 1. Purpose & Vision

Café Global is a solo grant-writing consultancy serving nonprofits. This project delivers a lightweight, fast-loading marketing website whose single job is to make nonprofit decision-makers aware that hiring a grant writer is an option, and to convert that awareness into **free consultation requests** via a contact form.

The site is explicitly **not** a client portal, booking system, or service-delivery platform. It is a credibility-and-conversion tool built to launch within roughly one week.

## 2. Business Objectives

1. **Awareness** — Educate medium-sized nonprofits that external grant writing help exists and is hireable.
2. **Conversion** — Turn visitors into free-consultation ("listening session") requests through a contact form.
3. **Credibility** — Establish baseline trust through clear service explanations and authentic, non-overstated experience.

## 3. Scope Summary

**In scope (MVP):** single-page (or light 3-page) site; hero + CTA; "Did you know?" awareness band; three service buckets; free-consultation section; contact form with email delivery + auto-acknowledgment; sector-aware messaging (women's services, arts, education, community); responsive, accessible layout; domain + SSL.

**Out of scope (deferred):** client login/portal; online booking/calendar integration; testimonials, case studies, certifications; blog/resource library; payment processing; multi-language.

## 4. Stakeholders

| Role | Responsibility |
|---|---|
| **Business owner / Client** | Grant writer & subject-matter expert; approves copy, scope, and launch; receives form submissions; runs consultations. |
| **Builder / Developer** | Implements site on chosen platform; wires form + auto-reply; connects domain; runs pre-launch checks. (May be the owner using a no-code tool, or a freelancer.) |
| **Product Designer (this handoff)** | Owns requirements, IA, design system, and acceptance criteria. |

## 5. Success Criteria

- Site is live and reachable at cafeglobal.org by the target date with active SSL.
- Contact form submissions land reliably in the owner's inbox (primary conversion metric).
- Submitter receives an auto-acknowledgment.
- Inbound lead quality matches the target persona (medium nonprofits in the served sectors).
- Site is mobile-responsive and meets WCAG AA basics.

## 6. Key Constraints

- Solo operator with limited time; tight ~1-week timeline.
- No existing testimonials, certifications, or external client wins to display.
- Owner is unfamiliar with calendar-link tooling → contact form is the booking mechanism.
- Must remain lightweight (nonprofit visitors may use older devices / slower connections).

## 7. Assumptions

- Domain cafeglobal.org is owned and DNS is controllable by the owner.
- The owner can supply final copy approval and (ideally) a professional headshot.
- A no-code platform (Squarespace, Webflow, or Carrd) or Formspree-backed hand-code is acceptable.
- Email inbox for receiving submissions is available and monitored.

## 8. High-Level Timeline

| Day | Milestone |
|---|---|
| Day 1–2 | Pick platform · finalize copy · gather headshot |
| Day 3–4 | Build page · apply design system · wire up form |
| Day 5 | Test form end-to-end · mobile check · connect domain + SSL |
| Tue / Thu | Launch |

## 9. Top Risks (summary — see Test Plan & README for full register)

- **Over-claiming experience** — owner is early-stage and uncertified; messaging must lean on real, modest wins (~50% success rate, awards ≤ $5,000) without overstating. *Mitigation: honest-positioning copy, certification deferred.*
- **Form delivery failure** — primary conversion path; must be tested end-to-end before launch.
- **Timeline slip** — single operator; fallback launch date (Thursday) built in.

## 10. Honest-Positioning Guardrail

The owner is a public library director who has written and won grants firsthand (several, ≤ $5,000 each, ~50% success rate, via community foundations, humanities councils, and state government programs) but is not yet a certified grant writer and has so far written grants only for her own library. **All site copy must rely on real, demonstrated experience and trustworthiness without overclaiming.** Certification and external wins are intentionally deferred and added later.
