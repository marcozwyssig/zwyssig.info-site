# Content-Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Reposition the bilingual Hugo site to "System- und Software-Engineering": new nav (Home · Angebot · Lösungen · Methode · Kompetenzen · Firma), Home accelerator pitch, restructured Angebot/Kompetenzen, two new pages (Lösungen, Methode), all DE/EN, then deploy.

**Architecture:** Reuse the existing theme, CSS tokens, card/section styles, per-language menus, i18n, contact card. Content lives in `content/de/` + `content/en/` (same slug per language). Home uses front-matter-driven sections in `layouts/index.html`. Build into `docs/`, push `master`.

**Tech Stack:** Hugo v0.164 extended, Go templates, TOML, vanilla CSS. No new deps.

## Global Constraints

- Bilingual: every page in `content/de/` AND `content/en/` with the SAME slug; nav label differs per language via `menus.de.toml`/`menus.en.toml`.
- New nav order (weights): Home(1) · Angebot(2) · Lösungen(3) · Methode(4) · Kompetenzen(5) · Firma(6). EN labels: Home · Services · Solutions · Method · Expertise · Company.
- Positioning: "Ihr Partner für System- und Software-Engineering" — remove any "nur .NET / Microsoft-only" framing. Software = .NET, Java, C++, Python.
- Marketing-simple: short, scannable, benefit-led. No accordions/JS. Keep proper nouns as-is (VMware, Hyper-V, Proxmox, Azure, M365, Ansible, Terraform, Puppet, CI/CD, RBAC, PKI, RTO/RPO, arc42, MDSD, .NET).
- Nav links use `.PageRef | relLangURL` (string paths) — no REF_NOT_FOUND even before pages exist.
- Dev builds to `/tmp/zw-build` (`hugo -d /tmp/zw-build --gc`); build MUST be pristine (no WARN/ERROR). `docs/` only rebuilt/committed in the final task.
- Accelerator pitch (verbatim):
  - Tagline DE: „KI gibt das Tempo, Modelle und Automatisierung die Konsistenz, Erfahrung die Richtung." EN: "AI sets the pace, models and automation ensure consistency, experience shows the direction."
  - Pillars: Tempo durch KI / Konsistenz durch Modelle & Automatisierung / Richtung durch Erfahrung (EN: Speed through AI / Consistency through models & automation / Direction through experience).
  - Value line DE: „So erreichen Sie Ihre Ziele schneller, wirtschaftlicher und zielsicher." EN: "Reach your goals faster, more cost-effectively, and with confidence."

---

## File Structure

- `config/_default/menus.de.toml` / `menus.en.toml` — add Lösungen/Methode entries, set weights.
- `layouts/index.html` — Home: hero + accelerator pillars + value line + section-link row.
- `assets/css/main.css` — small additions if needed (accelerator value line, section-link row); reuse existing `.pillars`/`.card`.
- `content/de/_index.md` + `content/en/_index.md` — Home front matter (hero, tagline, accelerator[], valueLine, sectionLinks).
- `content/de/angebot.md` + `content/en/angebot.md` — Mitarbeit · Beratung · Schulung.
- `content/de/loesungen.md` + `content/en/loesungen.md` — System · Software (NEW).
- `content/de/methode.md` + `content/en/methode.md` — 4 phases (NEW).
- `content/de/kompetenzen.md` + `content/en/kompetenzen.md` — Automatisierung · Sicherheit · Business Continuity + Zertifikate (drop BigData).
- `docs/` — production build (final task only).

---

### Task 1: Navigation + Home (accelerator pitch)

**Files:** `config/_default/menus.de.toml`, `menus.en.toml`, `layouts/index.html`, `content/de/_index.md`, `content/en/_index.md`, `assets/css/main.css` (small).

**Interfaces:** Produces the 6-item nav and the new Home. Front-matter keys consumed by `layouts/index.html`: `hero.title`, `hero.tagline`, `accelerator` (list of `{title,text}`), `valueLine`, `sections` (list of `{title,link}`).

- [ ] **Step 1: Add menu entries.** In `menus.de.toml` add after Angebot: `Lösungen`→`/loesungen/` (weight 3), `Methode`→`/methode/` (weight 4); set Kompetenzen weight 5, Firma weight 6. Mirror in `menus.en.toml` with labels `Solutions`/`Method`/`Expertise`/`Company`, same paths/weights.

- [ ] **Step 2: Rewrite `content/de/_index.md` front matter:**
```yaml
hero:
  title: "Ihr Partner für System- und Software-Engineering"
  tagline: "KI gibt das Tempo, Modelle und Automatisierung die Konsistenz, Erfahrung die Richtung."
accelerator:
  - title: "Tempo durch KI"
    text: "Moderne KI verstärkt unsere Entwicklungsleistung – schneller von der Idee zur Lösung."
  - title: "Konsistenz durch Modelle & Automatisierung"
    text: "Modellgetriebene Entwicklung und Automatisierung sichern durchgängige Qualität und langfristige Wartbarkeit."
  - title: "Richtung durch Erfahrung"
    text: "Fundiertes Wissen und langjährige Erfahrung geben die richtige Entwicklungsrichtung vor."
valueLine: "So erreichen Sie Ihre Ziele schneller, wirtschaftlicher und zielsicher."
sections:
  - { title: "Angebot", link: "/angebot/" }
  - { title: "Lösungen", link: "/loesungen/" }
  - { title: "Methode", link: "/methode/" }
  - { title: "Kompetenzen", link: "/kompetenzen/" }
```
Remove the old `subtitle`/`pillars` keys.

- [ ] **Step 3: Rewrite `content/en/_index.md` front matter** — English equivalents (hero.title "Your partner for system and software engineering"; tagline EN; accelerator EN titles/texts: Speed through AI / Consistency through models & automation / Direction through experience; valueLine EN; sections: Services/Solutions/Method/Expertise with same links).

- [ ] **Step 4: Update `layouts/index.html`** to render: hero (`hero.title` + `hero.tagline`), an accelerator section (heading e.g. `i18n "why_us"` or plain; the 3 `accelerator` cards reusing `.pillars`/`.card`), the `valueLine` as a highlighted payoff, then a compact `sections` link row. Keep it a single clean template; reuse existing classes; add minimal CSS only if needed for `.value-line`/`.section-links`.

- [ ] **Step 5: Build & verify pristine.** `hugo -d /tmp/zw-build --gc`; then:
```
grep -q "System- und Software-Engineering" /tmp/zw-build/index.html && grep -q "Tempo durch KI" /tmp/zw-build/index.html && grep -q "zielsicher" /tmp/zw-build/index.html && grep -q "Speed through AI" /tmp/zw-build/en/index.html && echo OK
```
Nav shows 6 items in both languages; no WARN/ERROR.

- [ ] **Step 6: Commit** `feat: new positioning + accelerator-pitch home + 6-item nav`.

---

### Task 2: Angebot page (Mitarbeit · Beratung · Schulung)

**Files:** `content/de/angebot.md`, `content/en/angebot.md`.

- [ ] **Step 1:** Rewrite `content/de/angebot.md` (keep `title: "Angebot"`, new description) as three short, benefit-led sections:
  - `## Mitarbeit` — kompetente Fachkräfte zur kurz- oder langfristigen Verstärkung Ihres Teams, in System und Software, über den ganzen Lebenszyklus (Projektleitung, Anforderungen, Architektur, Entwicklung, Test, Inbetriebnahme). (condense existing "Unterstützung".)
  - `## Beratung` — Beratung entlang Prozess, Architektur, Anforderungen und Technologiewahl; unabhängig und praxisnah. (condense existing Beratung/Prozess/Architektur/Anforderungen.)
  - `## Schulung` — Schulung und Coaching für Ihr Team: agile Methoden und Engineering-Praktiken. (from existing Schulung.)
  Short intro line up top. No accordions, no long lists (keep at most a short bullet list per section).

- [ ] **Step 2:** Rewrite `content/en/angebot.md` (`title: "Services"`) — faithful EN translation of the three sections (Collaboration/Staff Augmentation · Consulting · Training). Use "Staff augmentation" or "Team reinforcement" for Mitarbeit.

- [ ] **Step 3:** Build pristine; `grep -q "Mitarbeit" /tmp/zw-build/angebot/index.html && grep -q "Beratung" /tmp/zw-build/angebot/index.html && grep -q "Schulung" /tmp/zw-build/angebot/index.html && test -f /tmp/zw-build/en/angebot/index.html && echo OK`.

- [ ] **Step 4:** Commit `feat: Angebot page — Mitarbeit/Beratung/Schulung (de/en)`.

---

### Task 3: Lösungen page (System · Software) — NEW

**Files:** `content/de/loesungen.md`, `content/en/loesungen.md`.

- [ ] **Step 1:** Create `content/de/loesungen.md` (`title: "Lösungen"`, description). Short intro, then:
  - `## System-Engineering` — Networking & Infrastruktur. One benefit paragraph + a compact list: Netzwerk-Design (LAN/WAN/WLAN), Firewalls & VPN, Virtualisierung (VMware, Hyper-V, Proxmox), Server & Storage, Cloud (Azure, Microsoft 365), Monitoring.
  - `## Software-Engineering` — mehrsprachige Entwicklung. One benefit paragraph + a compact list: .NET, Java, C++, Python; agile Methoden; moderne, wartbare Architektur.
  - Closing bracket sentence: dieselbe Methode und derselbe Qualitätsanspruch in beiden Welten.

- [ ] **Step 2:** Create `content/en/loesungen.md` (`title: "Solutions"`) — faithful EN translation (System Engineering / Software Engineering), proper nouns as-is.

- [ ] **Step 3:** Build pristine; `grep -q "System-Engineering" /tmp/zw-build/loesungen/index.html && grep -q "Software-Engineering" /tmp/zw-build/loesungen/index.html && test -f /tmp/zw-build/en/loesungen/index.html && echo OK`. (Nav link to /loesungen/ now resolves.)

- [ ] **Step 4:** Commit `feat: Lösungen page — System & Software (de/en)`.

---

### Task 4: Methode page (4 phases) — NEW

**Files:** `content/de/methode.md`, `content/en/methode.md`.

- [ ] **Step 1:** Create `content/de/methode.md` (`title: "Methode"`, description). Short intro (durchgängiger, bewährter Ablauf), then four sections, 1–2 sentences each:
  - `## Initialisierung` — Angebot und Kalkulation: Ziele, Rahmen, Aufwand realistisch abstecken.
  - `## Konzeption` — Anforderungen und Architektur: das Richtige richtig planen.
  - `## Realisierung` — Entwicklung, Test und Abnahme: qualitätsgesichert umsetzen.
  - `## Einführung` — Betrieb und Change Management: sicher in Produktion bringen und verankern.

- [ ] **Step 2:** Create `content/en/methode.md` (`title: "Method"`) — faithful EN translation (Initiation · Conception · Realization · Rollout, or Initialization/Design/Implementation/Introduction — pick natural business English and keep consistent).

- [ ] **Step 3:** Build pristine; `grep -q "Initialisierung" /tmp/zw-build/methode/index.html && grep -q "Einführung" /tmp/zw-build/methode/index.html && test -f /tmp/zw-build/en/methode/index.html && echo OK`.

- [ ] **Step 4:** Commit `feat: Methode page — 4-phase lifecycle (de/en)`.

---

### Task 5: Kompetenzen page (Automatisierung · Sicherheit · Business Continuity)

**Files:** `content/de/kompetenzen.md`, `content/en/kompetenzen.md`.

- [ ] **Step 1:** Rewrite `content/de/kompetenzen.md` (`title: "Kompetenzen"`, description). Short intro (übergreifende, technische Kompetenzen), then:
  - `## Automatisierung` — benefit paragraph + points: CI/CD, DevOps, Testautomation, MDSD, Infrastructure as Code (Ansible, Terraform, Puppet), PowerShell/Skripting. (May reference engineering quality: arc42, Clean Code briefly.)
  - `## Sicherheit` — benefit paragraph + points: Systemhärtung, Netzwerksegmentierung, Patch-Management, IAM & Zugriffskonzepte (RBAC), Firewalls, Schlüssel- & Zertifikatsmanagement (PKI).
  - `## Business Continuity` — benefit paragraph + points: Backup- & Recovery-Strategien, Disaster Recovery, Hochverfügbarkeit & Redundanz, Notfall- & Wiederanlaufkonzepte, RTO/RPO.
  - `## Zertifizierungen` — keep existing (CPSA, CSPO, CSM, CSD).
  - **Drop** the BigData/Intelligence-Lifecycle section entirely.

- [ ] **Step 2:** Rewrite `content/en/kompetenzen.md` (`title: "Expertise"`) — faithful EN translation (Automation · Security · Business Continuity · Certifications).

- [ ] **Step 3:** Build pristine; verify:
```
grep -q "Automatisierung" /tmp/zw-build/kompetenzen/index.html && grep -q "Sicherheit" /tmp/zw-build/kompetenzen/index.html && grep -q "Business Continuity" /tmp/zw-build/kompetenzen/index.html && test -f /tmp/zw-build/en/kompetenzen/index.html && echo OK
grep -qi "BigData\|Intelligence Lifecyle\|Intelligence Lifecycle" /tmp/zw-build/kompetenzen/index.html && echo "!! BigData still present" || echo "BigData removed"
```

- [ ] **Step 4:** Commit `feat: Kompetenzen — Automation/Security/Business Continuity; drop BigData (de/en)`.

---

### Task 6: Positioning sweep + production build + deploy

**Files:** any content/template touch-ups; regenerate `docs/`.

- [ ] **Step 1: Positioning sweep.** Grep the DE/EN content + templates for stale "nur .NET / Microsoft-only" framing:
```
grep -rniE 'nur .?net|\.NET Softwareentwicklung|Microsoft Technologien' content/ layouts/ && echo "review hits above" || echo "clean"
```
Fix any remaining lines to the generalized System-/Software-Engineering wording (e.g., the old home subline, any leftover). Keep .NET where it is a legitimate tech in a list.

- [ ] **Step 2: Full clean build to scratch + verify all routes.** `hugo -d /tmp/zw-build --gc --minify` (pristine). Verify 12 routes exist:
```
for p in "" en/ angebot/ en/angebot/ loesungen/ en/loesungen/ methode/ en/methode/ kompetenzen/ en/kompetenzen/ firma/ en/firma/ impressum/ en/impressum/; do test -f "/tmp/zw-build/${p}index.html" && echo "OK ${p}" || echo "MISSING ${p}"; done
grep -RIl "yoo_capture\|uikit\|jquery\|widgetkit" /tmp/zw-build && echo "STRAY OLD REFS" || echo "no old refs"
```

- [ ] **Step 3: Production build into docs/ + verify CNAME.** `rm -rf docs && hugo --gc --minify`; `test -f docs/CNAME && test -f docs/loesungen/index.html && test -f docs/methode/index.html && echo BUILD_OK`.

- [ ] **Step 4: Commit** `build: regenerate docs/ for System+Software restructure`.

- [ ] **Step 5: Deploy.** `git push origin master`; confirm Pages build goes `built` and spot-check the live home shows the new positioning + accelerator pitch.

---

## Self-Review Notes

- **Spec coverage:** positioning (T1/T6), accelerator pitch + value line (T1), nav+2 new pages (T1/T3/T4), Angebot engagement types (T2), Kompetenzen technische topics + drop BigData (T5), bilingual throughout, deploy (T6). Covered.
- **Slug/translation consistency:** `loesungen`/`methode` same slug in both contentDirs → auto-linked translations; menu labels differ per language. Home front-matter keys (`hero`, `accelerator`, `valueLine`, `sections`) defined in T1 match `layouts/index.html`.
- **No pageRef warnings:** nav uses `.PageRef | relLangURL`; new-page links resolve once T3/T4 land; final build (T6) has all pages.
- **Marketing tone:** each content task specifies short benefit-led sections, not the old dense prose.
