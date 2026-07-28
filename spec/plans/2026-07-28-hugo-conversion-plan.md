# Hugo Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the scraped static Joomla site with a modern, bilingual (DE/EN) Hugo-driven site that deploys to the existing GitHub Pages `docs/` folder.

**Architecture:** A hand-built Hugo theme lives in the repo root (`layouts/` + `assets/`), no external theme module. Content is Markdown under `content/` (German at root, English mirrored under `content/en/`). CSS is hand-written and processed by Hugo Pipes. Hugo builds into `docs/`, which GitHub Pages serves from `master`.

**Tech Stack:** Hugo v0.164 extended, Go templates, vanilla CSS (+ minimal vanilla JS), TOML config. No jQuery/UIKit/Bootstrap.

## Global Constraints

- Hugo **extended v0.164+** (installed). Use `hugo.toml`-style config under `config/_default/`.
- `publishDir = "docs"`; the committed `docs/` folder is the live site.
- `static/CNAME` MUST contain `www.zwyssig.info` and `zwyssig.info` (two lines) so every build writes `docs/CNAME`.
- Languages: `de` (default, served at `/`), `en` (served at `/en/`). `defaultContentLanguageInSubdir = false`.
- No jQuery, UIKit, Bootstrap, Font Awesome, or any CDN/remote asset. Vanilla CSS + minimal vanilla JS only.
- Aesthetic: clean corporate / trust — whitespace, slate/blue accent, strong type, responsive, `prefers-color-scheme` dark-mode-aware.
- German copy is migrated **faithfully** from the existing scraped files (source of truth listed per task); do not rewrite it. English is a faithful translation.
- Company facts (verbatim): **Zwyssig Informatik GmbH, Seebüelstrasse 38, CH-8185 Winkel**; phone **+41 79 468 55 77**; email **sales@zwyssig.info**; Handelsregister **CHE-112.480.156**, Handelsregisteramt **Zürich**.
- **During development, build to a scratch dir** (`hugo -d /tmp/zw-build`) for verification so `docs/` is not churned. Only the FINAL task builds into `docs/` and commits it.
- Commit source at the end of each task. Do NOT commit `docs/` until the final task. Add `docs/` build artifacts to `.gitignore` during development is NOT desired (docs/ is tracked) — instead simply avoid rebuilding into docs/ until the end.

---

## File Structure

- `config/_default/hugo.toml` — core config (baseURL, title, publishDir, defaultContentLanguage).
- `config/_default/languages.toml` — de/en definitions.
- `config/_default/menus.toml` — main nav per language.
- `config/_default/params.toml` — company contact facts.
- `i18n/de.toml`, `i18n/en.toml` — UI strings.
- `layouts/_default/baseof.html` — page shell.
- `layouts/_default/single.html` — generic content page.
- `layouts/index.html` — home page (hero + pillars + CTA).
- `layouts/partials/head.html`, `header.html`, `footer.html`, `language-switcher.html`.
- `assets/css/main.css` — hand-written styles + design tokens.
- `assets/js/site.js` — mobile nav toggle.
- `content/_index.md`, `angebot.md`, `kompetenzen.md`, `firma.md`, `impressum.md` (+ `content/en/` mirror).
- `static/CNAME`, `static/images/` (logo + curated photos).
- `docs/` — build output (committed in final task only).

Old, removed at Task 1: `static/*.html`, `static/libraries/`, `static/templates/`, `static/cache/`, `static/modules/`, `static/media/`, the old `layouts/index.html` (scraped), and the entire current `docs/` contents (regenerated).

---

### Task 1: Clean slate + Hugo config skeleton

**Files:**
- Delete: `static/angebot.html`, `static/firma.html`, `static/impressum.html`, `static/kompetenzen.html`, `static/libraries/`, `static/templates/`, `static/cache/`, `static/modules/`, `static/media/`, old `layouts/index.html`, old top-level `config.toml`.
- Preserve: `static/images/logo.png`, `static/images/logo.jpg`, `static/images/slides/`, `static/images/header/`, `static/CNAME`, `LICENSE`, `archetypes/default.md`.
- Create: `config/_default/hugo.toml`, `config/_default/languages.toml`, `config/_default/menus.toml`, `config/_default/params.toml`, `static/CNAME` (rewrite to two lines).

**Interfaces:**
- Produces: a Hugo project that builds with no content yet. Config keys `params.company.*` consumed by later tasks: `name`, `street`, `city`, `phone`, `email`, `register`, `registerOffice`.

- [ ] **Step 1: Remove scraped assets and stale config**

```bash
cd <repo>
git rm -r --quiet static/libraries static/templates static/cache static/modules static/media 2>/dev/null || true
git rm --quiet static/angebot.html static/firma.html static/impressum.html static/kompetenzen.html 2>/dev/null || true
git rm --quiet layouts/index.html config.toml 2>/dev/null || true
# also drop scraped media under images we do not want (keep logo + slides + header)
ls static/images
```
Keep `static/images/{logo.png,logo.jpg,slides,header}`. Remove any other stray scraped image dirs if present.

- [ ] **Step 2: Rewrite `static/CNAME`**

```
www.zwyssig.info
zwyssig.info
```

- [ ] **Step 3: Create `config/_default/hugo.toml`**

```toml
baseURL = "https://www.zwyssig.info/"
title = "Zwyssig Informatik GmbH"
publishDir = "docs"
defaultContentLanguage = "de"
defaultContentLanguageInSubdir = false
enableRobotsTXT = true
enableGitInfo = false

[markup.goldmark.renderer]
unsafe = true

[outputs]
home = ["HTML"]
```

- [ ] **Step 4: Create `config/_default/languages.toml`**

```toml
[de]
languageName = "Deutsch"
languageCode = "de-CH"
weight = 1
title = "Zwyssig Informatik GmbH"

[en]
languageName = "English"
languageCode = "en"
weight = 2
contentDir = "content/en"
title = "Zwyssig Informatik GmbH"
```

- [ ] **Step 5: Create `config/_default/params.toml`**

```toml
[company]
name = "Zwyssig Informatik GmbH"
street = "Seebüelstrasse 38"
city = "CH-8185 Winkel"
phone = "+41 79 468 55 77"
phoneHref = "+41794685577"
email = "sales@zwyssig.info"
register = "CHE-112.480.156"
registerOffice = "Zürich"
```

- [ ] **Step 6: Create `config/_default/menus.toml`**

```toml
[[de.main]]
name = "Home"
pageRef = "/"
weight = 1
[[de.main]]
name = "Angebot"
pageRef = "/angebot"
weight = 2
[[de.main]]
name = "Kompetenzen"
pageRef = "/kompetenzen"
weight = 3
[[de.main]]
name = "Firma"
pageRef = "/firma"
weight = 4

[[en.main]]
name = "Home"
pageRef = "/"
weight = 1
[[en.main]]
name = "Services"
pageRef = "/angebot"
weight = 2
[[en.main]]
name = "Expertise"
pageRef = "/kompetenzen"
weight = 3
[[en.main]]
name = "Company"
pageRef = "/firma"
weight = 4
```

- [ ] **Step 7: Add a minimal placeholder home so the build has output**

Create `content/_index.md`:
```markdown
---
title: "Home"
---
Platzhalter
```
Create `content/en/_index.md`:
```markdown
---
title: "Home"
---
Placeholder
```

- [ ] **Step 8: Build to scratch dir and verify success**

Run: `hugo -d /tmp/zw-build --gc`
Expected: builds with no errors; `/tmp/zw-build/index.html` and `/tmp/zw-build/en/index.html` exist; `/tmp/zw-build/CNAME` contains both domains.
```bash
test -f /tmp/zw-build/index.html && test -f /tmp/zw-build/en/index.html && grep -q "zwyssig.info" /tmp/zw-build/CNAME && echo OK
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: remove scraped assets, add Hugo config skeleton (de/en)"
```

---

### Task 2: Base theme shell + design tokens (CSS)

**Files:**
- Create: `layouts/_default/baseof.html`, `layouts/partials/head.html`, `layouts/partials/header.html`, `layouts/partials/footer.html`, `layouts/partials/language-switcher.html`, `assets/css/main.css`, `assets/js/site.js`, `layouts/_default/single.html`.

**Interfaces:**
- Consumes: `params.toml` company facts; menus from `menus.toml`.
- Produces: the `baseof` shell with blocks `main`; partials reusable by all pages. CSS custom properties (design tokens) used site-wide: `--color-bg`, `--color-fg`, `--color-accent`, `--color-muted`, `--maxw`, spacing scale.

- [ ] **Step 1: Create `layouts/partials/head.html`**

```go-html-template
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ if .IsHome }}{{ .Site.Title }}{{ else }}{{ .Title }} · {{ .Site.Title }}{{ end }}</title>
{{ with .Description }}<meta name="description" content="{{ . }}">{{ end }}
{{ $css := resources.Get "css/main.css" | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
<link rel="icon" href="/images/logo.png" type="image/png">
{{ range .AllTranslations }}
<link rel="alternate" hreflang="{{ .Language.Lang }}" href="{{ .Permalink }}">
{{ end }}
```

- [ ] **Step 2: Create `layouts/partials/language-switcher.html`**

```go-html-template
<nav class="lang-switch" aria-label="Language">
  {{ range .AllTranslations }}
    <a href="{{ .RelPermalink }}"{{ if eq .Language.Lang $.Language.Lang }} aria-current="true"{{ end }}>{{ .Language.Lang | upper }}</a>
  {{ else }}
    {{/* no translations: link to language homes */}}
    {{ range .Sites }}<a href="{{ .Home.RelPermalink }}"{{ if eq .Language.Lang $.Language.Lang }} aria-current="true"{{ end }}>{{ .Language.Lang | upper }}</a>{{ end }}
  {{ end }}
</nav>
```

- [ ] **Step 3: Create `layouts/partials/header.html`**

```go-html-template
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="{{ "/" | relLangURL }}">
      <img src="/images/logo.png" alt="{{ .Site.Params.company.name }}" height="40">
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">☰</button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul>
        {{ range .Site.Menus.main }}
          <li><a href="{{ .PageRef | relLangURL }}"{{ if $.IsMenuCurrent "main" . }} aria-current="page"{{ end }}>{{ .Name }}</a></li>
        {{ end }}
      </ul>
    </nav>
    {{ partial "language-switcher.html" . }}
  </div>
</header>
```

- [ ] **Step 4: Create `layouts/partials/footer.html`**

```go-html-template
<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>&copy; {{ now.Year }} {{ .Site.Params.company.name }}</p>
    <p><a href="{{ "impressum" | relLangURL }}">{{ i18n "impressum" }}</a></p>
  </div>
</footer>
```

- [ ] **Step 5: Create `layouts/_default/baseof.html`**

```go-html-template
<!doctype html>
<html lang="{{ .Site.Language.LanguageCode }}">
<head>{{ partial "head.html" . }}</head>
<body>
  {{ partial "header.html" . }}
  <main>{{ block "main" . }}{{ end }}</main>
  {{ partial "footer.html" . }}
  {{ $js := resources.Get "js/site.js" | minify | fingerprint }}
  <script src="{{ $js.RelPermalink }}" defer></script>
</body>
</html>
```

- [ ] **Step 6: Create `layouts/_default/single.html`**

```go-html-template
{{ define "main" }}
<article class="page">
  <div class="wrap">
    <h1>{{ .Title }}</h1>
    {{ .Content }}
  </div>
</article>
{{ end }}
```

- [ ] **Step 7: Create `assets/js/site.js`**

```js
const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}
```

- [ ] **Step 8: Create `assets/css/main.css` (design tokens + shell)**

Write a hand-crafted stylesheet following the frontend-design skill. It MUST define, at minimum: CSS custom properties for light + dark (`prefers-color-scheme`), a `.wrap` container (`max-width` ~1080px, centered, side padding), sticky `.site-header` with flex `.header-inner`, `.site-nav` desktop horizontal list, `.nav-toggle` hidden on desktop / shown < 720px with `.site-nav.open` reveal, `.lang-switch` styling, `.site-footer`, base typography (system font stack, fluid `clamp()` headings), and accessible focus states. Slate/blue accent. Example token block:

```css
:root{
  --color-bg:#ffffff; --color-fg:#1a2230; --color-muted:#5b6472;
  --color-accent:#2b5ce6; --color-surface:#f4f6fb; --maxw:1080px;
  --space:1rem; --radius:12px;
}
@media (prefers-color-scheme:dark){
  :root{ --color-bg:#0f141c; --color-fg:#e6eaf2; --color-muted:#9aa4b2;
    --color-accent:#6d8bff; --color-surface:#161d28; }
}
*{box-sizing:border-box} body{margin:0;background:var(--color-bg);color:var(--color-fg);
  font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
.wrap{max-width:var(--maxw);margin-inline:auto;padding-inline:clamp(1rem,4vw,2rem)}
/* ...header, nav, toggle (@media max-width:720px), footer, headings, links, focus... */
```

- [ ] **Step 9: Build and verify shell renders**

Run: `hugo -d /tmp/zw-build --gc`
Expected: no errors; header/nav/footer present.
```bash
grep -q 'site-header' /tmp/zw-build/index.html && grep -q 'lang-switch' /tmp/zw-build/index.html && grep -q '/css/main' /tmp/zw-build/index.html && echo OK
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: base theme shell, partials, and design-token CSS"
```

---

### Task 3: i18n strings + verify language switching

**Files:**
- Create: `i18n/de.toml`, `i18n/en.toml`.
- Modify: none (partials already call `i18n`).

**Interfaces:**
- Consumes: `i18n` keys referenced in partials/templates.
- Produces: translation keys used across pages: `impressum`, `contact`, `cta_contact`, `cta_learn_more`, `hero_tagline`, `pillars_title`, `partner`, `about`, `read_more`.

- [ ] **Step 1: Create `i18n/de.toml`**

```toml
[impressum]
other = "Impressum"
[contact]
other = "Kontakt"
[cta_contact]
other = "Kontaktieren Sie uns"
[cta_learn_more]
other = "Mehr erfahren"
[hero_tagline]
other = "Ihr Partner für .NET Softwareentwicklung"
[pillars_title]
other = "Unser Angebot"
[partner]
other = "Partner"
[about]
other = "Über uns"
[read_more]
other = "Weiterlesen"
```

- [ ] **Step 2: Create `i18n/en.toml`**

```toml
[impressum]
other = "Legal notice"
[contact]
other = "Contact"
[cta_contact]
other = "Get in touch"
[cta_learn_more]
other = "Learn more"
[hero_tagline]
other = "Your partner for .NET software development"
[pillars_title]
other = "What we offer"
[partner]
other = "Partner"
[about]
other = "About us"
[read_more]
other = "Read more"
```

- [ ] **Step 3: Build and verify both languages + switcher**

Run: `hugo -d /tmp/zw-build --gc`
```bash
grep -q "Impressum" /tmp/zw-build/index.html && grep -q "Legal notice" /tmp/zw-build/en/index.html && echo OK
```
Expected: German footer shows "Impressum", English shows "Legal notice".

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add de/en i18n string tables"
```

---

### Task 4: Home page (hero + pillar cards + CTA)

**Files:**
- Create: `layouts/index.html`.
- Modify: `content/_index.md`, `content/en/_index.md` (front-matter params for hero + pillars).
- Add CSS: extend `assets/css/main.css` with `.hero`, `.pillars`, `.card`, `.cta` styles.

**Content source:** old home text (scraped) — hero line "Die Welt durch Software sehen", tagline "Ihr Partner für .NET Softwareentwicklung", subline "Mit agilen Methoden und Microsoft Technologien unterstützen wir unsere Kunden für eine effiziente und effektive Softwareentwicklung", three pillars: **Schulung und Beratung** ("Möchten Sie die Produktivität der Software-Entwicklung steigern?"), **Unterstützung** ("Suchen Sie kompetente Fachkräfte für die Überbrückung von Personalengpässen?"), **Entwicklung** ("Sie sind auf der Suche nach Software, die einfach das macht was Sie brauchen?").

**Interfaces:**
- Consumes: front-matter keys `hero.title`, `hero.subtitle`, and `pillars` list (`title`, `text`, `link`).
- Produces: home page at `/` and `/en/`.

- [ ] **Step 1: Write `content/_index.md` (DE)**

```markdown
---
title: "Home"
hero:
  title: "Die Welt durch Software sehen"
  subtitle: "Mit agilen Methoden und Microsoft Technologien unterstützen wir unsere Kunden für eine effiziente und effektive Softwareentwicklung."
pillars:
  - title: "Schulung und Beratung"
    text: "Möchten Sie die Produktivität der Software-Entwicklung steigern?"
    link: "/angebot"
  - title: "Unterstützung"
    text: "Suchen Sie kompetente Fachkräfte für die Überbrückung von Personalengpässen?"
    link: "/angebot"
  - title: "Entwicklung"
    text: "Sie sind auf der Suche nach Software, die einfach das macht was Sie brauchen?"
    link: "/kompetenzen"
---
```

- [ ] **Step 2: Write `content/en/_index.md` (EN)**

```markdown
---
title: "Home"
hero:
  title: "Seeing the world through software"
  subtitle: "With agile methods and Microsoft technologies we help our clients develop software efficiently and effectively."
pillars:
  - title: "Training & Consulting"
    text: "Do you want to increase the productivity of your software development?"
    link: "/angebot"
  - title: "Staff Augmentation"
    text: "Are you looking for skilled specialists to bridge staffing gaps?"
    link: "/angebot"
  - title: "Development"
    text: "Are you looking for software that simply does what you need?"
    link: "/kompetenzen"
---
```

- [ ] **Step 3: Create `layouts/index.html`**

```go-html-template
{{ define "main" }}
<section class="hero">
  <div class="wrap">
    <h1>{{ .Params.hero.title }}</h1>
    <p class="hero-sub">{{ .Params.hero.subtitle }}</p>
    <p class="hero-tagline">{{ i18n "hero_tagline" }}</p>
    <a class="btn" href="{{ "firma" | relLangURL }}">{{ i18n "cta_contact" }}</a>
  </div>
</section>
<section class="pillars-section">
  <div class="wrap">
    <h2>{{ i18n "pillars_title" }}</h2>
    <div class="pillars">
      {{ range .Params.pillars }}
      <a class="card" href="{{ .link | relLangURL }}">
        <h3>{{ .title }}</h3>
        <p>{{ .text }}</p>
        <span class="card-cta">{{ i18n "cta_learn_more" }} →</span>
      </a>
      {{ end }}
    </div>
  </div>
</section>
{{ end }}
```

- [ ] **Step 4: Extend `assets/css/main.css`**

Add `.hero` (large clamp() headline, generous vertical padding, accent tagline), `.btn` (accent background, radius, hover), `.pillars-section`, `.pillars` (CSS grid `repeat(auto-fit,minmax(240px,1fr))`, gap), `.card` (surface bg, radius, padding, hover lift via transform + subtle shadow, `.card-cta` accent). Respect `prefers-reduced-motion` for the hover transition.

- [ ] **Step 5: Build and verify**

Run: `hugo -d /tmp/zw-build --gc`
```bash
grep -q "Die Welt durch Software" /tmp/zw-build/index.html && grep -q "Seeing the world through software" /tmp/zw-build/en/index.html && grep -q "pillars" /tmp/zw-build/index.html && echo OK
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: home page hero, pillar cards, and CTA (de/en)"
```

---

### Task 5: Angebot page

**Files:**
- Create: `content/angebot.md`, `content/en/angebot.md`.
- Add CSS: `.sections` / `details.section` (or `.section-block`) styling in `main.css`.

**Content source (migrate faithfully):** `git show HEAD~4:static/angebot.html` is gone after Task 1; instead migrate from the pre-Task-1 copy. The full German text was extracted during brainstorming and is reproduced here so the executor needs no external file:

Intro (two paragraphs):
> "Wir setzen ausnahmslos auf höchst qualifizierte Mitarbeiter, um den Ansprüchen an unsere Lösungen und Produkten gerecht zu werden. Qualität, Umfang und Ressourcen müssen optimal miteinander abgestimmt werden. Dies resultiert in erhöhter Effizienz und Effektivität, welche die Garanten für nachhaltige Kundenlösungen bilden."
>
> "Professionelle Methoden und innovative Technologien können gute Resultate erreichen, sind aber selten allein verantwortlich für den Erfolg. Wir sind eine kleine Firma und wir schätzen die kurzen Entscheidungswege, die hochmotivierten und zufriedenen Mitarbeiter, welche ihre Arbeit und die Zufriedenheit der Kunden am Herzen liegt."

Sections (each becomes a `## heading` + body; use native `<details>`/`<summary>` via a shortcode OR plain sections — plain `##` sections chosen for simplicity):
- **Unterstützung** — "Vermehrt sehen sich Unternehmen mit Personalengpässen in der Entwicklungsabteilung konfrontiert, die Projekte oder das Tagesgeschäft in Verzug bringen. Zwyssig Informatik GmbH bietet kompetente Fachkräfte zur kurz- oder langfristigen Verstärkung ihres .NET Entwicklungsteams an. Sie übernehmen ein breites Spektrum an Tätigkeiten innerhalb des agilen Entwicklungsprozess:" + list: Projektleitung, Anforderungsanalysen, Softwarearchitektur, Entwurf und Entwicklung, Qualitätssicherung, Inbetriebnahmen.
- **Beratung und Schulung** — "Eine effiziente und effektive Softwareentwicklung bedingt ein fundiertes Wissen der Methoden und der Technologien. Zwyssig Informatik GmbH bietet Beratung und Schulung für ihr .NET Entwicklungsteams an. Erzielen Sie so mehr nachhaltige Produktivität, zufriedenere Mitarbeiter, eine bessere Qualität Ihrer Produkte und Dienstleistungen und weniger Ausfallzeiten." Then sub-topics: **Softwareentwicklungsprozess**, **Softwarearchitektur**, **Anforderungsanalyse** (with erhebungstechniken list), **Pair Programming** — full paragraphs as extracted in the brainstorming transcript.

> NOTE TO EXECUTOR: The complete extracted German text for each sub-section is in the brainstorming exploration output in this session's history and in the original `static/angebot.html` at commit `cdc70bd` (pre-conversion). If any paragraph is unavailable, recover it with:
> `git show cdc70bd:static/angebot.html | sed 's/<[^>]*>//g'`
> Migrate every paragraph and list item faithfully; do not summarize or drop content.

**Interfaces:**
- Consumes: `single.html` template (Task 2).
- Produces: `/angebot/` and `/en/angebot/`.

- [ ] **Step 1: Recover authoritative source text**

Run: `git show cdc70bd:static/angebot.html | sed 's/<[^>]*>//g' | grep -v '^[[:space:]]*$' > /tmp/angebot-de.txt`
Use this as the source of truth for the German copy.

- [ ] **Step 2: Write `content/angebot.md` (DE)**

Front matter + faithful migration of the intro, all section headings (`## Unterstützung`, `## Beratung und Schulung`, with `### Softwareentwicklungsprozess` etc.), paragraphs, and bullet lists from `/tmp/angebot-de.txt`.
```markdown
---
title: "Angebot"
description: "Das Angebot der Zwyssig Informatik GmbH: Unterstützung, Beratung und Schulung für .NET Entwicklungsteams."
---
```
(followed by the migrated Markdown body)

- [ ] **Step 3: Write `content/en/angebot.md` (EN)**

Faithful English translation of the same structure (title `"Services"`).

- [ ] **Step 4: Build and verify**

Run: `hugo -d /tmp/zw-build --gc`
```bash
grep -q "Unterstützung" /tmp/zw-build/angebot/index.html && test -f /tmp/zw-build/en/angebot/index.html && echo OK
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Angebot page content (de/en)"
```

---

### Task 6: Kompetenzen page

**Files:**
- Create: `content/kompetenzen.md`, `content/en/kompetenzen.md`.

**Content source:** `git show cdc70bd:static/kompetenzen.html`. Intro: "Erfahren Sie mehr über die Leistungen und Kompetenzen der Zwyssig Informatik GmbH und überzeugen Sie sich von unseren Kompetenzen in der Software Entwicklung." Sections: **Lösungen** (Intelligence Lifecycle / BigData paragraph + list: Ablegen von grossen Datenmengen; Erkennen von Mustern; Verarbeiten und Aggregieren…; Zeit- und geoorientierte Analysen…) and **Software Praktiken** (Continuous Integration und Delivery; Testautomation + benefits list; Modellgetriebene Softwareentwicklung (MDSD) + benefits list; Parallele Programmierung).

**Interfaces:**
- Produces: `/kompetenzen/` and `/en/kompetenzen/`.

- [ ] **Step 1: Recover source**

Run: `git show cdc70bd:static/kompetenzen.html | sed 's/<[^>]*>//g' | grep -v '^[[:space:]]*$' > /tmp/kompetenzen-de.txt`

- [ ] **Step 2: Write `content/kompetenzen.md` (DE)** — faithful migration.
```markdown
---
title: "Kompetenzen"
description: "Kompetenzen der Zwyssig Informatik GmbH: Lösungen (BigData) und Software-Praktiken (CI/CD, Testautomation, MDSD)."
---
```

- [ ] **Step 3: Write `content/en/kompetenzen.md` (EN)** — faithful translation (title `"Expertise"`).

- [ ] **Step 4: Build and verify**

Run: `hugo -d /tmp/zw-build --gc`
```bash
grep -q "Lösungen" /tmp/zw-build/kompetenzen/index.html && test -f /tmp/zw-build/en/kompetenzen/index.html && echo OK
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Kompetenzen page content (de/en)"
```

---

### Task 7: Firma page (with contact block)

**Files:**
- Create: `content/firma.md`, `content/en/firma.md`.
- Create: `layouts/_default/single.html` already exists; add a contact partial `layouts/partials/contact-card.html`.
- Add CSS: `.contact-card` styling.

**Content source:** `git show cdc70bd:static/firma.html`. Sections: **Über uns** ("Zwyssig Informatik GmbH wurde 2005 gegründet. In ihrem beinahe 10-jährigen Bestehen hat sie sich einen hervorragenden Ruf aufgebaut… " full two paragraphs), **Partner** ("carrara engineering GmbH löst Ihre Probleme in den Bereichen OOD, OOA, C++, Java, XML und andere verwandte Themen der Objektorientierung…"), **Kontakt** (address + phone + email from params — replaces old ChronoForm; NO form).

**Interfaces:**
- Consumes: `params.company.*`.
- Produces: `/firma/` and `/en/firma/`.

- [ ] **Step 1: Recover source**

Run: `git show cdc70bd:static/firma.html | sed 's/<[^>]*>//g' | grep -v '^[[:space:]]*$' > /tmp/firma-de.txt`

- [ ] **Step 2: Create `layouts/partials/contact-card.html`**

```go-html-template
{{ $c := .Site.Params.company }}
<aside class="contact-card">
  <h2>{{ i18n "contact" }}</h2>
  <address>
    <strong>{{ $c.name }}</strong><br>
    {{ $c.street }}<br>
    {{ $c.city }}<br>
    <a href="tel:{{ $c.phoneHref }}">{{ $c.phone }}</a><br>
    <a href="mailto:{{ $c.email }}">{{ $c.email }}</a>
  </address>
</aside>
```

- [ ] **Step 3: Add a `firma` layout that includes the contact card**

Create `layouts/_default/firma.html` (Hugo picks it up when page has `layout: firma`, OR use a section). Simpler: reuse `single.html` and embed the contact card via a shortcode `{{< contact >}}`. Create `layouts/shortcodes/contact.html`:
```go-html-template
{{ partial "contact-card.html" . }}
```

- [ ] **Step 4: Write `content/firma.md` (DE)** — Über uns + Partner paragraphs, then `{{< contact >}}` shortcode for the Kontakt block.
```markdown
---
title: "Firma"
description: "Über die Zwyssig Informatik GmbH, gegründet 2005, und unsere Partner."
---
```

- [ ] **Step 5: Write `content/en/firma.md` (EN)** — faithful translation (title `"Company"`), same `{{< contact >}}` shortcode.

- [ ] **Step 6: Add `.contact-card` CSS** — surface background, radius, padding, accent links.

- [ ] **Step 7: Build and verify**

Run: `hugo -d /tmp/zw-build --gc`
```bash
grep -q "sales@zwyssig.info" /tmp/zw-build/firma/index.html && grep -q "+41 79 468 55 77" /tmp/zw-build/firma/index.html && test -f /tmp/zw-build/en/firma/index.html && echo OK
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: Firma page with contact card (de/en)"
```

---

### Task 8: Impressum page

**Files:**
- Create: `content/impressum.md`, `content/en/impressum.md`.

**Content source:** `git show cdc70bd:static/impressum.html`. Sections (migrate verbatim, German): Kontaktadresse, Handelsregistereintrag (Nummer CHE-112.480.156, Handelsregisteramt Zürich), Mehrwertsteuernummer, Haftungsausschluss, Haftung für Links, Urheberrechte, Datenschutzerklärung für die Nutzung von Google Analytics (full text).

**Translation decision:** Keep the **legal body text in German** on the English page too (translating legal/liability text can change its meaning), but translate the section *headings* and add a short EN note: "The following legal notice is authoritative in German." Owner may replace with a full EN legal text later.

**Interfaces:**
- Produces: `/impressum/` and `/en/impressum/`.

- [ ] **Step 1: Recover source**

Run: `git show cdc70bd:static/impressum.html | sed 's/<[^>]*>//g' | grep -v '^[[:space:]]*$' > /tmp/impressum-de.txt`

- [ ] **Step 2: Write `content/impressum.md` (DE)** — verbatim migration.
```markdown
---
title: "Impressum"
description: "Impressum der Zwyssig Informatik GmbH."
---
```

- [ ] **Step 3: Write `content/en/impressum.md` (EN)** — translated headings + EN note + German legal body (per translation decision above). Title `"Legal notice"`.

- [ ] **Step 4: Build and verify**

Run: `hugo -d /tmp/zw-build --gc`
```bash
grep -q "CHE-112.480.156" /tmp/zw-build/impressum/index.html && test -f /tmp/zw-build/en/impressum/index.html && echo OK
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Impressum page (de/en)"
```

---

### Task 9: Final polish, full verification, and production build into docs/

**Files:**
- Modify: `assets/css/main.css` (responsive/dark-mode fixes as found), any template touch-ups.
- Generate + commit: `docs/`.

**Interfaces:**
- Produces: the deployable `docs/` folder with `CNAME`.

- [ ] **Step 1: Full clean build to scratch + verify every route**

Run: `hugo -d /tmp/zw-build --gc --minify`
```bash
for p in "" en/ angebot/ en/angebot/ kompetenzen/ en/kompetenzen/ firma/ en/firma/ impressum/ en/impressum/; do
  test -f "/tmp/zw-build/${p}index.html" && echo "OK ${p}" || echo "MISSING ${p}"
done
grep -R "yoo_capture\|uikit\|jquery\|widgetkit" /tmp/zw-build && echo "STRAY OLD REFS" || echo "no old refs"
test -f /tmp/zw-build/CNAME && cat /tmp/zw-build/CNAME
```
Expected: all 10 routes OK; "no old refs"; CNAME has both domains.

- [ ] **Step 2: Manual review with live server**

Run: `hugo server --bind 0.0.0.0` and open `http://localhost:1313/`.
Verify by eye: home hero + 3 pillar cards + CTA; nav to all pages; DE↔EN switcher on each page; mobile nav toggle at narrow width; dark mode (toggle OS appearance); footer Impressum link. Fix any CSS/responsive/dark issues in `main.css` and rebuild.

- [ ] **Step 3: Production build into docs/**

```bash
rm -rf docs && hugo --gc --minify
test -f docs/CNAME && test -f docs/index.html && test -f docs/en/index.html && echo BUILD_OK
```

- [ ] **Step 4: Commit the built site**

```bash
git add -A
git commit -m "build: generate production site into docs/"
```

- [ ] **Step 5: (Owner) push and verify live**

```bash
git push origin master
```
After Pages redeploys, verify https://www.zwyssig.info/ and https://www.zwyssig.info/en/ load the new site with the correct custom domain.

---

## Self-Review Notes

- **Spec coverage:** architecture (T1–T2), i18n (T1/T3), all 5 pages DE/EN (T4–T8), clean-corporate design + dark mode + no jQuery (T2/T4 CSS), remove scraped assets (T1), contact email + no form (T7), deployment into docs/ + CNAME (T1/T9). All covered.
- **Content fidelity:** long German copy is recovered from commit `cdc70bd` via `git show` in each page task, guaranteeing the source survives Task 1's deletions.
- **Type/name consistency:** `params.company.*` keys defined in T1 are used identically in T7 partial and T9 checks; i18n keys defined in T3 match partial/template usage; front-matter `hero.*`/`pillars` defined in T4 match `layouts/index.html`.
- **Deployment safety:** dev builds go to `/tmp/zw-build`; only T9 writes `docs/`, so the live site is not disturbed mid-implementation.
