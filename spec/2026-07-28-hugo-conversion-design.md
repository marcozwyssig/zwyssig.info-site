# Design: Convert zwyssig.info to a Hugo-driven, bilingual site

**Date:** 2026-07-28
**Site:** Zwyssig Informatik GmbH — https://www.zwyssig.info
**Author:** Marco Zwyssig (with Claude)

## Goal

Replace the current static, HTTrack-scraped Joomla/YooTheme site with a modern,
maintainable, **Hugo-driven** website. Take the opportunity to **redesign** the
front-end while faithfully carrying over the existing German content, and add a
second language (**English**). Keep the existing GitHub Pages deployment working
unchanged.

## Current state

- Repo is a scraped copy of a Joomla site: dead-weight `libraries/`,
  `templates/yoo_capture/`, `cache/`, `media/`, plus duplicated HTML in both
  `static/` and `docs/`. Uses jQuery, UIKit, Bootstrap, Font Awesome, and
  jQuery-driven accordions/sliders.
- A partial Hugo scaffold already exists: `config.toml` (placeholder values,
  `publishDir = "docs"`), `archetypes/default.md`, and `layouts/index.html`
  (which is actually the scraped home page, not a real Hugo template).
- Five content pages: **Home, Angebot, Kompetenzen, Firma, Impressum** (German).
- Hosting: GitHub Pages "legacy" mode — serves the committed `docs/` folder from
  the `master` branch. Custom domain `www.zwyssig.info` / `zwyssig.info` via
  `docs/CNAME`. HTTPS enforced by Pages.
- Toolchain: Hugo **v0.164.0 extended** installed locally.

## Decisions (from brainstorming)

| Topic | Decision |
|---|---|
| Visual approach | **Modern redesign** — custom in-repo theme, not a third-party theme |
| Aesthetic | **Clean corporate / trust** — whitespace, slate/blue accent, strong type, subtle motion, responsive, dark-mode-aware |
| Languages | **Bilingual**: German (default, served at `/`) + English (`/en/`). Claude writes the English translations; owner refines later |
| Content | Same 5 pages, same information architecture; German copy migrated faithfully (not rewritten) |
| Old scraped assets | **Remove** all cruft; keep only the logo and genuinely useful photos |
| Contact form | **No form** (the old ChronoForm is dropped) |
| Contact email | **sales@zwyssig.info** shown on Impressum + Firma as a `mailto:` link |
| Deployment | **Keep current** — Hugo builds into `docs/`, commit the output; no GitHub Actions, no Pages reconfiguration |

## Architecture

Single-repo Hugo site with a **hand-built theme living in the repo root**
(`layouts/` + `assets/`), no theme module. Content as Markdown; presentation in
templates; CSS hand-written and processed via Hugo Pipes (minify + fingerprint).

```
config/_default/
  hugo.toml          # baseURL, title, publishDir=docs, defaultContentLanguage=de
  languages.toml     # de + en definitions, weights, language names
  menus.toml         # main nav per language
  params.toml        # company info: address, phone, email, register no.
content/
  _index.md          # Home (DE)
  angebot.md
  kompetenzen.md
  firma.md
  impressum.md
  en/
    _index.md        # Home (EN)
    angebot.md
    kompetenzen.md
    firma.md
    impressum.md
i18n/
  de.toml            # UI strings (nav labels, buttons, footer, switcher)
  en.toml
layouts/
  _default/baseof.html
  _default/single.html
  index.html         # home template (hero + pillar cards + CTA)
  partials/head.html, header.html, footer.html, language-switcher.html
assets/
  css/main.css       # hand-written; compiled by Hugo Pipes
static/
  CNAME              # www.zwyssig.info + zwyssig.info -> copied into docs/
  images/            # logo + curated photos only
archetypes/default.md
docs/                # BUILD OUTPUT (git-committed, served by GitHub Pages)
```

Design intent: small, single-purpose templates. `baseof.html` owns the page
shell; `partials/*` own reusable chunks (head, header/nav, footer, language
switcher); page templates own page-specific structure. A consumer can change one
partial without touching the others.

## Multilingual design

- Hugo native i18n. `defaultContentLanguage = "de"`,
  `defaultContentLanguageInSubdir = false` → German at `/`, English at `/en/`.
- Every page has a parallel file under `content/en/`. Menus and UI strings are
  per-language (`menus.toml` + `i18n/*.toml`).
- Header shows a **DE / EN language switcher** that links to the current page's
  translation (falls back to the language home if no translation exists).
- Claude authors faithful English translations of the German copy.

## Content structure (per page)

- **Home** (`_index.md` + `index.html`): hero carrying "Die Welt durch Software
  sehen" / EN equivalent; short positioning line ("Ihr Partner für .NET
  Softwareentwicklung"); three pillar cards — **Schulung & Beratung**,
  **Unterstützung**, **Entwicklung**; a clear contact CTA.
- **Angebot**: intro + the offering sections (Unterstützung, Beratung & Schulung,
  Softwareentwicklungsprozess, Softwarearchitektur, Anforderungsanalyse, Pair
  Programming, …). The old jQuery accordions become clean, scannable sections /
  expandable blocks (native `<details>` or CSS, **no jQuery**).
- **Kompetenzen**: intro + Lösungen (Intelligence Lifecycle/BigData) and Software
  Praktiken (CI/CD, Testautomation, MDSD, Parallele Programmierung, …), same
  clean-section treatment.
- **Firma**: Über uns, Partner (carrara engineering GmbH), Kontakt block
  (address, phone, email — no form).
- **Impressum**: Kontaktadresse, Handelsregistereintrag (CHE-112.480.156,
  Handelsregisteramt Zürich), MWST, Haftungsausschluss, Haftung für Links,
  Urheberrechte, and the Google-Analytics/Datenschutz text. (Copy migrated as-is;
  owner is responsible for legal accuracy.)

Company facts to surface: **Zwyssig Informatik GmbH, Seebüelstrasse 38,
CH-8185 Winkel**; phone **+41 79 468 55 77**; email **sales@zwyssig.info**;
Handelsregister **CHE-112.480.156** (Zürich).

## Visual design — "clean corporate / trust"

- Generous whitespace, clear modern type scale, confident slate/blue accent.
- Responsive (mobile-first), accessible (semantic HTML, adequate contrast,
  keyboard-navigable nav + switcher), **dark-mode-aware** via
  `prefers-color-scheme`.
- Subtle motion only (hover/scroll reveals); no heavy libraries.
- **Vanilla CSS + minimal vanilla JS** (mobile nav toggle, language switcher).
  No jQuery, UIKit, or Bootstrap.
- Detailed visual craft to follow the `frontend-design` skill during build.

## Deployment

- `publishDir = "docs"`. Owner runs `hugo` (or `hugo --minify`) and commits the
  regenerated `docs/`. GitHub Pages continues serving `master` `/docs`.
- `static/CNAME` contains both `www.zwyssig.info` and `zwyssig.info` so Hugo
  copies it into `docs/CNAME` on every build, preserving the custom domain.
- No GitHub Actions workflow; no Pages settings change.

## Out of scope

- Contact form / backend.
- Blog, CMS, search, analytics re-implementation (the Analytics text stays in the
  Impressum as legal copy only; no tracking is wired up unless requested later).
- Content rewriting/SEO overhaul — copy is migrated faithfully.

## Testing / verification

1. `hugo` builds with **no errors or warnings**.
2. `hugo server` — manually verify: all 5 pages in **both** languages render;
   nav + **language switcher** work both directions; home hero + pillar cards +
   CTA present; responsive at mobile/desktop widths; dark mode renders.
3. Confirm `docs/CNAME` is present and correct after build.
4. Confirm no references to removed scraped assets remain (no 404s in build).

## Risks

- **English translation quality**: machine-authored; owner should proofread,
  especially the legal Impressum text (left in German where translation could
  change legal meaning — decide per-section during build).
- **Legal text accuracy** (Impressum/Datenschutz) is the owner's responsibility.
- **Content fidelity**: long German copy migrated by hand from scraped HTML;
  verify nothing is dropped during migration.
