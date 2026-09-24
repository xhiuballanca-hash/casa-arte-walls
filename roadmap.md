# Casa D'Arte — Roadmap

## Done
- Public site redesign (editorial, squared, photography-led), "Finishes" naming, Microcement added
- Factual cleanup: no fabricated testimonials / project counts / claims
- Intent-driven contact prefill (`/contact?intent=project|sample|quote|partner`)
- Per-route SEO head() + JSON-LD, sitemap, robots
- Inquiry submission → `inquiries` table (verified end to end)

## In progress
- [x] Casa D'Arte showcase update
  - [x] Six-finish catalog with Beton Look
  - [x] Five verified project labels and approved-image-ready slots
  - [x] Homepage hero and visual clarity verification
- [ ] Admin dashboard + CRM
  - [ ] Auth: email/password sign-in at `/auth`, `user_roles` + `has_role()`, admin-only gate under `/admin`
  - [ ] Leads: list (search, status/source filters), detail with pipeline status, priority, value, next action, notes timeline, CSV export
  - [ ] Quotations: list, create/edit with line items, link to lead, status, print/PDF view
  - [ ] Analytics: leads over time, by source / client type / status, quotation totals, conversion
  - [ ] Portfolio manager: DB-backed projects with image upload; public portfolio/home read from DB
  - [ ] Blog manager: DB-backed posts with editor; public journal reads from DB

## Ready
- [ ] Email notification to studio on new inquiry (needs Resend or similar connector)
- [ ] Before/after slider on a finish page using real project photography (once supplied)
- [ ] Macedonian language version (user chose English-only for now)
- [ ] Replace temporary Microcement visual with a dedicated photograph
