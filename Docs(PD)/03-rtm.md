# Requirements Traceability Matrix (RTM)
### Café Global Grant Writing Website — MVP

Traces business goals → requirements → test cases so nothing is built untested and nothing is tested without a reason. IDs reference `01-brd-prd.md`, `02-srs.md`, and `04-test-plan.md`.

---

## 1. Goal → Requirement → Test Coverage

| Business Goal | Requirement(s) | Test Case(s) | Status |
|---|---|---|---|
| **BG-1 Awareness** | FR-05 (awareness band), FR-04 (hero), FR-06 (services) | TC-04, TC-05, TC-06 | Planned |
| **BG-2 Conversion** | FR-04/FR-07 (CTAs), FR-08–FR-13 (contact form) | TC-07 – TC-14 | Planned |
| **BG-3 Credibility** | FR-06 (service explanations), FR-14 (footer), design system | TC-06, TC-15, TC-19 | Planned |
| **BG-4 Launch on time** | NFR-04 (SSL), deployment checklist | TC-17, TC-20 | Planned |
| **BG-5 Lead quality** | FR-08 field spec, FR-10 delivery | TC-09, TC-11 | Planned |

## 2. Full Requirement → Test Matrix

| Req ID | Requirement (short) | Priority | Test Case(s) |
|---|---|---|---|
| FR-01 | Single-page section order + in-page scroll | Must | TC-01, TC-02 |
| FR-02 | Header with brand + Contact CTA | Must | TC-03 |
| FR-03 | Responsive 3-col / stacked layout | Must | TC-16 |
| FR-04 | Hero headline + subheader + CTA | Must | TC-04 |
| FR-05 | Awareness band | Must | TC-05 |
| FR-06 | Three service buckets w/ copy + icons | Must | TC-06 |
| FR-07 | Consultation section + CTA | Must | TC-07 |
| FR-08 | Contact form fields render | Must | TC-08 |
| FR-09 | Client-side validation | Must | TC-10 |
| FR-10 | Submission delivered to owner email | Must | TC-09, TC-11 |
| FR-11 | Auto-acknowledgment to submitter | Should | TC-12 |
| FR-12 | Success / error states | Must | TC-13 |
| FR-13 | Spam mitigation | Should | TC-14 |
| FR-14 | Footer with contact info + sectors | Must | TC-15 |
| NFR-01 | Performance / lightweight | — | TC-18 |
| NFR-02 | Accessibility (WCAG AA basics) | — | TC-19 |
| NFR-03 | Responsiveness | — | TC-16 |
| NFR-04 | SSL / HTTPS | — | TC-17 |
| NFR-05 | Cross-browser compatibility | — | TC-21 |
| NFR-06 | Maintainability (owner-editable) | — | TC-22 |
| NFR-07 | SEO basics | — | TC-23 |
| NFR-08 | Privacy / minimal data | — | TC-09 |

## 3. Coverage Check

- Every Must requirement maps to at least one test case. ✅
- Every business goal maps to at least one requirement and test case. ✅
- Out-of-scope items (portal, booking, testimonials, blog, payments) intentionally **not** traced — deferred per charter. ✅

*Update the Status column to Pass/Fail during execution.*
