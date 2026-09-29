# Casa D'Arte — Roadmap

## Done
- Public site redesign (editorial, squared, photography-led), "Finishes" naming, Microcement added
- Casa D'Arte showcase update: six finishes, five verified project labels, refined photographic hero
- Factual cleanup: no fabricated testimonials / project counts / claims
- Intent-driven contact prefill (`/contact?intent=project|sample|quote|partner`)
- Per-route SEO head() + JSON-LD, sitemap, robots
- Inquiry submission → `inquiries` table (verified end to end)
- Final public-site refinement: location, navigation, footer, finish-page clarity, and consistent process language
- Responsive homepage hero rebuilt with a clean photograph, semantic translated text and controls, and an always-visible language switcher

## In progress
- [ ] Admin dashboard + CRM
  - [ ] Auth: email/password sign-in at `/auth`, `user_roles` + `has_role()`, admin-only gate under `/admin`
  - [ ] Leads: list (search, status/source filters), detail with pipeline status, priority, value, next action, notes timeline, CSV export
  - [ ] Quotations: list, create/edit with line items, link to lead, status, print/PDF view
  - [ ] Analytics: leads over time, by source / client type / status, quotation totals, conversion
  - [ ] Portfolio manager: DB-backed projects with image upload; public portfolio/home read from DB
  - [ ] Blog manager: DB-backed posts with editor; public journal reads from DB

## Ready
- [x] Approved Albanian-only copy refinement: terminology, grammar, metadata, Journal, and factual corrections
- [ ] Email notification to studio on new inquiry (needs Resend or similar connector)
- [ ] Before/after slider on a finish page using real project photography (once supplied)
- [ ] Macedonian language version (user chose English-only for now)
- [x] Replace temporary Microcement visual with the approved material photograph (done)
- [x] Finish Advisor: visitors upload a room photo + description, AI suggests finishes and next steps (`/finish-advisor`)
