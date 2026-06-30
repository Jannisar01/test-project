# Software Requirements Specification (SRS)
### Café Global Grant Writing Website — MVP

Each requirement has a stable ID used in the Requirements Traceability Matrix (`03-rtm.md`) and Test Plan (`04-test-plan.md`).

---

## 1. Functional Requirements

### 1.1 Site Shell & Navigation

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-01 | Single-page scrolling site (or light 3-page) with the section order: Hero → Awareness → Services → Consultation → Contact → Footer. | Must | All sections render in order on one reachable page; in-page CTAs scroll to the contact form. |
| FR-02 | Persistent header showing brand ("Café Global") and a Contact link/CTA. | Must | Header visible on load; Contact link jumps to the form. |
| FR-03 | Responsive layout: 3-column services on desktop, stacked on mobile. | Must | Layout reflows correctly at ≤ 480px, 768px, and ≥ 1024px widths. |

### 1.2 Hero

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-04 | Hero headline "Grant Writing Services for Nonprofits" + subheader + primary CTA "Start Your Free Consultation". | Must | Text matches approved copy; CTA links to contact form. |

### 1.3 Awareness Band

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-05 | Awareness section educating that nonprofits can hire a grant writer ("Did you know you can hire a grant writer?"). | Must | Section present above Services with approved educational copy. |

### 1.4 Services

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-06 | Three service buckets: (1) Grant Research & Opportunity Identification, (2) Grant Proposal Writing, (3) Post-Award Reporting & Compliance — each with icon + title + 2–3 sentence explanation. | Must | Exactly three cards render with correct titles, icons, and approved copy. |

### 1.5 Free Consultation

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-07 | Consultation section ("Let's Talk Strategy — Free Consultation") with body copy and CTA "Request Your Consultation". | Must | Section present; CTA links to contact form. |

### 1.6 Contact Form

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-08 | Contact form with the fields specified in §3 (Field Spec). | Must | All fields render with visible labels above inputs. |
| FR-09 | Client-side validation: required fields enforced; email format validated; website field (if filled) accepts URL format. | Must | Submitting empty required fields blocks submission with clear inline errors; invalid email rejected. |
| FR-10 | On valid submit, form data is delivered to the owner's email inbox. | Must | A real submission lands in the inbox with all field values intact. |
| FR-11 | Submitter receives an automatic acknowledgment ("Thanks — I'll be in touch within X business days"). | Should | Test submission triggers auto-reply to the submitter's address. |
| FR-12 | Success state shown to the user after submission; error state shown on failure. | Must | User sees confirmation message on success and a recoverable error on failure. |
| FR-13 | Basic spam mitigation (honeypot or platform-native protection). | Should | Spam protection active without blocking legitimate submissions. |

### 1.7 Footer

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-14 | Footer with brand line, cafeglobal.org, email, phone, and sector statement. | Must | Footer shows contact info and sectors served; email/phone are correct. |

## 2. Non-Functional Requirements

| ID | Category | Requirement | Acceptance Criteria |
|---|---|---|---|
| NFR-01 | Performance | Lightweight, fast-loading for older devices / slow connections. | Page loads in a reasonable time on a throttled (3G-class) connection; images optimized. |
| NFR-02 | Accessibility | Meet WCAG 2.1 AA basics. | Color contrast ≥ AA (esp. button text); all form fields have visible labels (not placeholder-only); form is keyboard-navigable; logical focus order. |
| NFR-03 | Responsiveness | Mobile-first across phone/tablet/desktop. | No horizontal scroll; tap targets large enough on mobile. |
| NFR-04 | Security | HTTPS/SSL active; form submissions transmitted securely; no sensitive data stored client-side. | Valid SSL cert; form posts over HTTPS. |
| NFR-05 | Compatibility | Works on current Chrome, Safari, Firefox, Edge (desktop + mobile). | Renders and functions on latest 2 versions of each. |
| NFR-06 | Maintainability | No-code-friendly so a solo, non-technical owner can update copy. | Owner can edit text/images without developer help (or documented handoff if hand-coded). |
| NFR-07 | SEO basics | Indexable with sensible title, meta description, and semantic headings. | Page has unique `<title>`, meta description, one `<h1>`, logical heading order. |
| NFR-08 | Privacy | Collect only the data needed to qualify a lead; no unnecessary tracking. | Form collects only specified fields; any analytics disclosed. |

## 3. Contact Form Field Spec

| Field | Required | Type | Notes |
|---|---|---|---|
| Contact name | Yes | text | |
| Email | Yes | email | format validation |
| Organization name | Yes | text | |
| Organization type | Yes | text/select | e.g. arts, education, women's services, community |
| 501(c)(3) status | Yes | radio | Yes / No / Pending |
| Organization website | No | url | optional |
| Message / help needed | Yes | textarea | "What kind of help are you hoping to find?" |

**Behavior:** Submission delivers to the owner's email (FR-10) and triggers an auto-acknowledgment to the submitter (FR-11). This data set lets the owner qualify and prep for the listening session before the call.

## 4. Design System Reference (constraints for build)

- **Visual direction:** clean, professional, trustworthy, warm; generous white space; lightweight.
- **Color:** one primary (deep teal / forest green, e.g. `#1F6F6B` or `#2E5D4B`) + one accent/CTA (warm gold or coral, e.g. `#E8A33D` or `#E06B5A`); background `#FFFFFF` / `#FAF8F4`; text `#1A1A1A`; muted `#5A6B6A`.
- **Typography:** serif headings (Lora / Source Serif / Fraunces); sans body (Inter / Work Sans / Source Sans); comfortable line length ~60–75 chars.
- **Components:** primary button (filled accent, rounded); service card (icon + title + 2–3 sentences); form inputs (large tap targets, labels above fields, visible required markers).
- **Imagery:** professional owner headshot recommended; simple service icons; avoid generic stock.
