# Design: Content-Restructure zwyssig.info — System- & Software-Engineering

**Date:** 2026-07-29
**Site:** Zwyssig Informatik GmbH — https://www.zwyssig.info
**Author:** Marco Zwyssig (with Claude)
**Builds on:** `spec/2026-07-28-hugo-conversion-design.md` (the Hugo/bilingual base)

## Goal

Reposition the site from a pure **.NET software** consultancy to a broader
**System- and Software-Engineering** consultancy that reflects the last ~10
years of work (networking & infrastructure, full delivery lifecycle) with the
cross-cutting disciplines **Automation, Security, Business Continuity**. Keep it
**marketing-simple** (short, scannable, benefit-led) and bilingual (DE/EN).

## Positioning shift

- Old: *"Ihr Partner für .NET Softwareentwicklung"* (Microsoft/.NET only).
- New: **"Ihr Partner für System- und Software-Engineering"** — platform- and
  language-agnostic; system engineering is presented as an equal peer to
  software engineering.

## The offering model (three dimensions + method + pitch)

| Dimension | Question | Values |
|---|---|---|
| **Angebot** (engagement type) | *What can the customer order?* | **Mitarbeit · Beratung · Schulung** |
| **Lösungen** (domain) | *Where?* | **System · Software** |
| **Kompetenzen** (topic) | *What?* | **Automatisierung · Sicherheit · Business Continuity** |
| **Methode** (delivery) | *How delivered?* | Initialisierung → Konzeption → Realisierung → Einführung |

Marketing narrative: *"Sie bestellen eine Leistungsart (Mitarbeit, Beratung oder
Schulung) – in Ihrem Bereich (System oder Software) – mit Fokus auf Ihr Thema
(Automatisierung, Sicherheit, Business Continuity). Geliefert nach einer
bewährten Methode."*

### The Accelerator pitch (the "why us", the Home hook)

Owner's raw pitch — AI = power, Models & Automation = consistency/maintainability,
Knowledge & Experience = direction — refined into marketing terms:

- **Tagline (DE):** „KI gibt das Tempo, Modelle und Automatisierung die
  Konsistenz, Erfahrung die Richtung."
- **Tagline (EN):** "AI sets the pace, models and automation ensure consistency,
  experience shows the direction."
- **Three pillars:**
  - **Tempo durch KI** / *Speed through AI* — moderne KI verstärkt die
    Entwicklungsleistung; schneller von der Idee zur Lösung.
  - **Konsistenz durch Modelle & Automatisierung** / *Consistency through models
    & automation* — modellgetriebene Entwicklung und Automatisierung sichern
    durchgängige Qualität und langfristige Wartbarkeit.
  - **Richtung durch Erfahrung** / *Direction through experience* — fundiertes
    Wissen und langjährige Erfahrung geben die richtige Entwicklungsrichtung vor.

**Customer value (Mehrwert / outcome).** The three levers map 1:1 onto a concrete
customer outcome — reaching goals faster, more cost-effectively, and with
confidence:

| Lever | Outcome |
|---|---|
| Tempo durch KI | **Schneller** ans Ziel |
| Konsistenz durch Modelle & Automatisierung | **Wirtschaftlicher** (weniger Nacharbeit, nachhaltig wartbar) |
| Richtung durch Erfahrung | **Zielsicher** (das Richtige, mit Zuversicht) |

- **Value line (DE):** „So erreichen Sie Ihre Ziele schneller, wirtschaftlicher
  und zielsicher." — short form: „Schneller. Wirtschaftlicher. Zielsicher."
- **Value line (EN):** "Reach your goals faster, more cost-effectively, and with
  confidence." — short form: "Faster. More efficient. On target."

The Home accelerator section shows the three levers as cards and closes with the
value line as the payoff.

## Navigation

`Home · Angebot · Lösungen · Methode · Kompetenzen · Firma` (Impressum in footer).
Two new pages (**Lösungen**, **Methode**); Home, Angebot, Kompetenzen restructured;
Firma/Impressum unchanged. English labels: `Home · Services · Solutions · Method
· Expertise · Company`.

## Per-page content

### Home
- Hero: **"Ihr Partner für System- und Software-Engineering"** + the accelerator
  tagline (one sentence).
- Primary section: the **three accelerator pillars** as cards (Tempo/Konsistenz/
  Richtung) — this replaces the old Schulung/Unterstützung/Entwicklung pillars.
- A compact secondary row linking to **Angebot · Lösungen · Methode · Kompetenzen**.

### Angebot (Services) — engagement types
Short, benefit-led blocks for the three orderable services (migrated/condensed
from the existing Angebot content):
- **Mitarbeit** — kompetente Fachkräfte zur kurz-/langfristigen Verstärkung des
  Teams (system & software); Tätigkeiten quer über den Lebenszyklus. (was:
  "Unterstützung")
- **Beratung** — Beratung entlang Prozess, Architektur, Anforderungen,
  Technologiewahl. (condensed from Beratung/Softwareentwicklungsprozess/
  Softwarearchitektur/Anforderungsanalyse)
- **Schulung** — Schulung/Coaching für Teams (Methoden & Technologien; agil,
  Engineering-Praktiken). (from existing Schulung)

### Lösungen (Solutions) — domains
Two equal blocks:
- **System-Engineering** (Networking & Infrastruktur): Netzwerk-Design
  (LAN/WAN/WLAN), Firewalls/VPN, Virtualisierung (VMware/Hyper-V/Proxmox),
  Server/Storage, Cloud (Azure/M365), Monitoring. *(NEW content.)*
- **Software-Engineering**: mehrsprachige Entwicklung — **.NET, Java, C++,
  Python**; agile Methoden, moderne Architektur. *(condensed from existing
  software content; broadened beyond .NET.)*
- Bracket sentence: same method, same quality standard across both worlds.

### Methode (Method) — delivery lifecycle
Four phases as a clean process line, 1–2 sentences each:
- **Initialisierung** — Angebot, Kalkulation.
- **Konzeption** — Anforderungen, Architektur.
- **Realisierung** — Entwicklung, Test, Abnahme.
- **Einführung** — Betrieb, Change Management.

### Kompetenzen (Expertise) — cross-cutting topics
Three disciplines, each a benefit paragraph + 2–4 proof points:
- **Automatisierung** — CI/CD, DevOps, Testautomation, MDSD, Infrastructure as
  Code (Ansible, Terraform, Puppet), PowerShell/Skripting. (absorbs existing
  software-practice detail: CI/CD, Testautomation, MDSD; arc42/Clean Code may be
  folded in as engineering-quality proof.)
- **Sicherheit** — Systemhärtung, Netzwerksegmentierung, Patch-Management,
  IAM/Zugriffskonzepte (RBAC), Firewalls, Schlüssel- & Zertifikatsmanagement
  (PKI). *(NEW content.)*
- **Business Continuity** — Backup-/Recovery-Strategien, Disaster Recovery,
  Hochverfügbarkeit/Redundanz, Notfall-/Wiederanlaufkonzepte, RTO/RPO. *(NEW
  content.)*
- **Zertifizierungen** at the end — existing (CPSA, CSPO, CSM, CSD) unchanged
  (owner may add infra/security certs later).
- The existing BigData/Intelligence-Lifecycle section is **DROPPED for now**
  (owner decision). Rationale: it is a *fachliche* (domain/subject-matter)
  competence — "domains where large data volumes arise" — whereas the new
  Kompetenzen page covers *technische* competences (Automation/Security/BC). A
  future split into **Technische Kompetenzen** vs. **Fachliche Kompetenzen**
  (BigData/large-data domains, etc.) is explicitly kept for later — out of scope
  now.

### Firma / Impressum
Unchanged.

## Language & tone

- Fully bilingual DE/EN (parallel `content/de` + `content/en`), English translated
  faithfully. Keep proper nouns/tech names as-is (VMware, Azure, Terraform, .NET,
  CI/CD, RBAC, PKI, RTO/RPO, arc42, MDSD).
- **Marketing-simple:** short, scannable, benefit-led. Condense the old dense
  technical prose to the strongest proof points; no walls of text, no accordions.

## Reuse of existing components

- Reuse the existing theme, CSS design tokens, card/pillar/section styles,
  contact card, i18n mechanism, per-language menus. Add menu entries for the two
  new pages (DE + EN). Add i18n keys for any new UI labels.
- Home template extended for the accelerator pillars + section-link row.
- New pages use the **same slug in both languages** — `loesungen.md` and
  `methode.md` in `content/de/` AND `content/en/` (URLs `/loesungen/`, `/en/loesungen/`,
  `/methode/`, `/en/methode/`), matching the existing `angebot`/`kompetenzen`
  pattern; only the nav label differs per language (Lösungen/Solutions,
  Methode/Method). Same-slug files across the two contentDirs auto-link as
  translations for the language switcher. Restructure `_index.md`, `angebot.md`,
  `kompetenzen.md` in both languages; add the two menu entries per language.

## Deployment

Unchanged: `hugo --gc --minify` into `docs/`, commit, push `master`; GitHub Pages
serves `master /docs`; `CNAME` preserved.

## Out of scope

- No contact form, no blog, no analytics.
- No new certifications (owner didn't supply; existing kept).
- Firma/Impressum content unchanged (address already corrected separately).

## Owner decisions (resolved)

1. Software broadening (.NET/Java/C++/Python) and generalized positioning —
   **confirmed**.
2. BigData/Intelligence Lifecycle — **dropped now**; future technische-vs-fachliche
   split kept for later.
3. Certifications — **remain as-is** (CPSA, CSPO, CSM, CSD).

## Testing / verification

1. `hugo --gc --minify` builds pristine (no errors/warnings).
2. All pages render in DE + EN; new nav (6 items) works both languages; language
   switcher works on the new pages; accelerator pillars render on Home.
3. No broken internal links; `docs/CNAME` present; no leftover "nur .NET/Microsoft"
   positioning in the new copy.
