# Business Requirements Document (BRD) / Product Requirements Document (PRD)
### Café Global Grant Writing Website — MVP

---

## 1. Business Overview

Café Global is a solo grant-writing consultancy serving nonprofits. The owner is an experienced grant writer (currently a public library director who has written and won grants firsthand) launching this as a new business. The website is a **marketing tool** to generate awareness and convert visitors into free consultation requests — not a client portal or service-delivery platform.

## 2. Core Problem

Medium-sized nonprofits need grant funding but cannot afford in-house grant writers. Critically, **most do not even know that hiring an external grant writer is an option.** The site must therefore do **education and conversion at the same time**.

## 3. Target Customer (Persona)

| Attribute | Detail |
|---|---|
| Organization size | Medium nonprofits, ~$500K budget (some smaller, some larger) |
| Sectors | Women's services, the arts, education, community building |
| Pain point | Can't afford / can't hire in-house grant writers |
| Awareness level | Low — often unaware grant writing is a hireable service |
| Discovery path | Google search, or word of mouth |
| Decision driver | **Trust** — they hire people they know or who come recommended |

## 4. Value Proposition

Trustworthy, hands-on grant writing from someone who understands the nonprofit world from the inside. Real, demonstrated experience: several grants written and won with a **~50% success rate**, primarily through community foundations, humanities councils, and state government programs.

> **Honest-positioning note:** Owner is early-stage, not yet certified, and has so far written grants only for her own library (awards ≤ $5,000). Lean on *real* experience and trustworthiness without overclaiming. Certification is in progress and added later.

## 5. Business Goals & Success Metrics

| # | Goal | Metric |
|---|---|---|
| BG-1 | Awareness | Visitors reach/scroll the awareness band; qualitative reach |
| BG-2 | Conversion | **Contact form submissions** (primary metric) |
| BG-3 | Credibility | Clear service explanations + authentic experience present on page |
| BG-4 | Launch on time | Site live by Tue (fallback Thu) with SSL |
| BG-5 | Lead quality | Inbound leads match target persona |

## 6. Scope

**In scope (MVP)**
- Clear list of **three service buckets** with explanations
- Free consultation offer (a "listening session")
- Contact form for consultation requests, delivered to owner's email + auto-acknowledgment
- Sector-aware messaging (women, arts, education, community)
- Responsive, accessible, fast-loading single-page (or light 3-page) site
- Domain connection + SSL

**Out of scope (deferred)**
- Client login / portal
- Online booking / calendar integration
- Testimonials, case studies, certifications (none yet)
- Blog, resource library, payment processing

## 7. Information Architecture

Recommended **single-page scrolling site** (fastest to launch), or a light 3-page structure if preferred.

```
Home
 ├── Hero (headline + primary CTA)
 ├── "Did you know?" awareness band
 ├── Services (3 buckets)
 ├── Free Consultation (the offer)
 ├── Contact Form
 └── Footer (background + contact info)
```

## 8. Constraints & Assumptions

- Solo operator, limited time, ~1-week timeline.
- No testimonials/certifications/external wins available.
- Owner unfamiliar with calendar tooling → contact form only.
- Must be lightweight for older devices / slower connections.
- Domain cafeglobal.org owned; monitored email inbox available.

## 9. Dependencies

- Final copy approval from owner.
- Headshot asset (recommended, not blocking).
- Platform/email account access for the builder.

*Detailed functional and non-functional requirements are specified in `02-srs.md`.*
