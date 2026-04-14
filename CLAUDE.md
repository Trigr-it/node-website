# Node Group Website — CLAUDE.md

## What This Is

Marketing website for **Node Group Ltd** — a specialist scaffold, hoist and MCWP design consultancy based in Walthamstow, London (Saxon House, 182 Hoe Street, E17 4QH). The site serves clients across the UK and Ireland.

**Live URL:** https://www.nodegroup.co.uk
**Owner:** Rory Brady (Founder & Principal Design Engineer)

---

## Tech Stack

- **Pure static HTML/CSS/JS** — no frameworks, no build step, no SSR
- **Hosting:** Netlify (deploys from GitHub on push to `master`)
- **Repo:** GitHub — `Trigr-it/node-website`
- **Domain:** www.nodegroup.co.uk (via Namecheap nameservers pointed at Netlify)
- **CMS:** Claude Code — Rory manages the site entirely through CC
- **Build:** `command = ""` in netlify.toml — Netlify skips build, just serves files (saves deploy credits)

---

## File Structure

```
index.html              Homepage
about.html              About page
projects.html           Projects listing page
project.html            Legacy project detail template (noindex, redirects to /projects/slug.html)
team.html               Team page
contact.html            Contact page
privacy.html            Privacy policy (UK GDPR)

projects/               Static project detail pages (13 files)
  royal-albert-hall.html
  canada-square.html
  vauxhall-gantry.html
  lso-st-lukes.html
  ... etc

css/styles.css          Single stylesheet — all styles
js/main.js              Project data (PD object), navigation, filters, gallery, counters

images/
  projects/             One folder per project (e.g. royal-albert-hall/)
    01.webp, 02.webp    Photos named sequentially, ALL in WebP format
  team/                 One folder per person (e.g. rory-brady/)
    photo.webp          Team headshot (compressed, max 800px wide)
  general/              Branding, hero images
  n-logo-orange.png     Main logo (256x256, ~6KB)
  Shard Model.glb       3D model for homepage hero

llms.txt                AI search self-description for LLM platforms
sitemap.xml             Lists all 19 pages — update when adding/removing pages
robots.txt              Points crawlers to sitemap
netlify.toml            Netlify config — headers (5 security headers), caching, no-build
favicon.ico             Favicon (32x32)
favicon-32x32.png       PNG favicon
favicon-192x192.png     Large PNG favicon
apple-touch-icon.png    Apple touch icon (180x180)
```

---

## How Pages Work

### Project System
- **Project data** lives in `js/main.js` in the `PD` object (titles, descriptions, specs, images, client info)
- **Project listing** (`projects.html`) shows all projects as cards with category filters
- **Project cards** use `<a href>` links inside `pc-title` for crawler discovery, plus `onclick` for full-card click
- **Project detail pages** are individual static HTML files in `/projects/` — each has unique SEO meta tags, canonical URLs, OG tags, JSON-LD schema, and server-rendered content
- **Each project page** has a "Related Projects" section before the footer linking to 2-3 similar projects
- **Legacy `project.html`** has `noindex` and a JS redirect that sends `?p=slug` URLs to the new static pages
- **Homepage** shows 3 featured project cards

### Adding a New Project
1. Create image folder: `images/projects/project-slug/` with photos as **WebP** (`01.webp`, `02.webp`, etc.) — max 800px wide, quality 80-85
2. Add project data to the `PD` object in `js/main.js` — body content must use `<h2>` for section headings
3. Add a project card to `projects.html` with a proper `<a href>` inside `pc-title` (and optionally replace one on `index.html`)
4. Create a new static file `projects/project-slug.html` — see SEO checklist below
5. Add "Related Projects" section before the footer (2-3 related projects)
6. Add the new URL to `sitemap.xml` with accurate `<lastmod>` date
7. Update `llms.txt` if the project is notable

### New Project Page Checklist
Every project page in `/projects/` MUST have:
- [ ] `<title>` — format: `[Project Name] — Scaffold Design | Node Group`
- [ ] `<meta name="description">` — unique, under 160 chars
- [ ] `<link rel="canonical" href="https://www.nodegroup.co.uk/projects/slug.html">`
- [ ] OG tags: `og:title`, `og:description`, `og:image` (project hero), `og:url`, `og:type="article"`, `og:site_name`
- [ ] `<meta name="twitter:card" content="summary_large_image">`
- [ ] Favicon link tags (3 lines — see any existing project page)
- [ ] JSON-LD `<script type="application/ld+json">` with CreativeWork + BreadcrumbList
- [ ] `<h1>` — project name only (one per page)
- [ ] `<h2>` headings for "Project Overview", "The Design Challenge", "What Node Delivered" (NOT h3)
- [ ] All images: `width`, `height`, `loading="lazy"` (except hero gal-img), `alt` text, WebP format
- [ ] "Related Projects" section before `<footer>`
- [ ] Footer with privacy link: `<a href="/privacy.html">Privacy Policy</a>`
- [ ] Matching entry in `js/main.js` PD object (body content must match HTML)
- [ ] Entry in `sitemap.xml`

### Team Page
- 4-column grid on desktop, 2-column on tablet, 1-column on mobile
- Photos are 450px tall with `object-position` per person for framing
- Sections: Directors, Design, Finance
- All team photos stored as `photo.webp` (max 800px wide, WebP quality 80)
- Team headshot framing uses `object-position` — adjust percentage to move image up/down in frame

### Navigation
- Fixed nav bar at top on all pages
- Hamburger menu on mobile (768px and below) — toggle button with open/close icons
- Active page highlighted via `data-nav` attributes and `setActiveNav()` in main.js
- The hamburger HTML and toggle script are on every page

---

## SEO Setup

### Per-Page Tags (all pages have these)
- `<title>` — unique, keyword-optimised, under 60 chars
- `<meta name="description">` — unique per page, under 160 chars
- `<link rel="canonical">` — absolute URL with `https://www.nodegroup.co.uk`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
- `<meta name="twitter:card" content="summary_large_image">`
- Favicon: `<link rel="icon">` (32x32 + 192x192) + `<link rel="apple-touch-icon">`
- JSON-LD structured data (see Schema section)

### JSON-LD Schema (on every page)
- **Homepage:** Organization + ProfessionalService (`@id: /#organization`), WebSite (`@id: /#website`), WebPage, BreadcrumbList
- **About:** AboutPage + BreadcrumbList
- **Projects listing:** CollectionPage + hasPart array + BreadcrumbList
- **Team:** AboutPage + Person entities (all 10 members) + BreadcrumbList
- **Contact:** ContactPage + BreadcrumbList
- **Project detail pages:** CreativeWork + BreadcrumbList (Home > Projects > Name)
- All schema uses `@id` cross-references to `https://www.nodegroup.co.uk/#organization` and `/#website`

### Target Keywords
- Primary: "scaffold design"
- Local: "scaffold design london", "scaffold design ireland"

### AI Search
- `llms.txt` at site root — update when adding notable projects or services
- All content is static HTML (fully crawlable by AI bots)
- robots.txt allows all crawlers

### Important SEO Rules
- All images must be **WebP format** with `width`, `height`, and `loading="lazy"` attributes
- When adding new pages, always include canonical + OG tags with `https://www.nodegroup.co.uk` domain
- Always include JSON-LD schema with BreadcrumbList + appropriate page type
- Update `sitemap.xml` when pages are added or removed — use **accurate per-page lastmod dates**
- Project detail pages must be static HTML (not JS-rendered) for Google to index
- Project cards on listing/homepage must have proper `<a href>` tags (not JS-only onclick)
- Every project page needs a "Related Projects" section with 2-3 cross-links
- All project body content uses `<h2>` headings (not h3) for "Project Overview", "The Design Challenge", "What Node Delivered"
- Avoid formulaic/generic closing paragraphs — every "What Node Delivered" must reference specific project outcomes
- Footer on every page must include: privacy link, service links to `/#services`
- Meta descriptions must be under 160 characters

---

## Design System

### Visual Theme
Engineering drawing / drafting paper aesthetic:
- Warm off-white backgrounds (`#F7F6F2`)
- Grid paper patterns on section backgrounds
- Monospace reference codes (e.g. "DWG / PRJ-012", "SVC / 01")
- Orange accent (`#FF6700`)
- Drawing-style corner marks and borders

### CSS Tokens (in `:root`)
- `--o: #FF6700` (orange primary)
- `--k: #1A1A1A` (dark text)
- `--bg: #F7F6F2` (paper background)
- `--sb: #D8D4C8` (warm border)
- `--s: #727272` (secondary text)
- `--mono: 'DM Mono'` (monospace font)

### Fonts
- **DM Sans** — body, headings (loaded from Google Fonts)
- **DM Mono** — reference codes, labels, specs

### Responsive Breakpoints
- `1100px` — tablet (2-col grids, stacked layouts)
- `768px` — mobile (1-col, hamburger nav, reduced padding)

---

## 3D Model (Homepage)
- Three.js with OrbitControls loads a GLB model (`Shard Model.glb`) in the hero
- Auto-rotates continuously
- **Mobile:** touch interaction disabled (auto-rotate only) to prevent scroll hijacking
- Heavy payload (~600KB Three.js + 2.8MB model) — loaded on all devices currently

---

## Image Standards

- **Format:** WebP for all project and team photos. PNG only for logo/favicon.
- **Team photos:** Max 800px wide, WebP quality 80, saved as `photo.webp` in each person's folder
- **Project photos:** WebP quality 82, named sequentially (`01.webp`, `02.webp`, etc.)
- **Logo:** 256x256px PNG (`n-logo-orange.png`, ~6KB)
- **All `<img>` tags must have:** `alt`, `width`, `height`, and `loading="lazy"` (except above-fold hero images)
- **To add new images:** Use `sharp` (installed in node_modules) to convert and compress: `sharp(input).resize(800).webp({quality:82}).toFile(output)`

---

## Deployment Workflow

- **All changes stay local** until Rory says to push
- After making changes, **always open the local page** in the browser so Rory can review
- Local server: `npx serve . -p 3000`
- Push: standard `git add` / `git commit` / `git push` to `master`
- Each push uses ~15 Netlify deploy credits (minimal, no build step)
- Netlify deploys automatically within seconds of push

---

## Key Files to Update

| Task | Files to Change |
|---|---|
| Add project | `js/main.js` (PD data), `projects.html` (card with `<a href>`), new `projects/slug.html` (with schema + related projects), `sitemap.xml`, optionally `llms.txt` |
| Edit project content | `js/main.js` (PD object) + corresponding `projects/slug.html` |
| Add team member | `team.html` (with `photo.webp`, width/height, lazy loading), update team.html JSON-LD Person entity |
| Update team photo | Compress to WebP 800px wide, save as `photo.webp`, update `team.html` |
| Change contact details | `contact.html`, footer on all pages, homepage JSON-LD Organization block, `llms.txt` |
| Update services | `index.html` (services section), footer on all pages |
| CSS changes | `css/styles.css` |
| SEO changes | Individual page `<head>` sections + JSON-LD + `sitemap.xml` |

---

## Things to Avoid

- Don't add a build step — the site is pure static, Netlify serves files directly
- Don't render project content via JavaScript — static HTML is required for SEO
- Don't use `project.html?p=slug` pattern for new projects — use `/projects/slug.html`
- Don't push without Rory reviewing locally first
- Don't forget to update `sitemap.xml` when adding/removing pages
- Don't use `www.nodegroup.co.uk` without `https://` in canonical/OG URLs
- Don't use `<h3>` for project body sections — always `<h2>`
- Don't use JPG/PNG for project or team photos — always WebP
- Don't add `<img>` tags without `width`, `height`, and `loading="lazy"`
- Don't write generic/formulaic "What Node Delivered" closings — always reference specific project outcomes
- Don't add project cards without proper `<a href>` tags inside the title
- Don't create pages without JSON-LD schema and BreadcrumbList
- Don't skip the "Related Projects" section on project detail pages
