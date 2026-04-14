# SEO Standards — Node Group Website

This file defines the SEO approach for all content changes on this site. Follow these rules whenever creating, editing, or removing pages.

---

## Image Optimisation

### Rules
- **All images must be WebP.** No JPG or PNG for content images. Only the logo and favicons use PNG.
- **Compress on ingest.** When Rory provides a new photo (JPG from camera, screenshot, etc.), immediately convert it:
  ```js
  const sharp = require('sharp'); // already installed in node_modules
  await sharp(input).resize(800, null, { withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
  ```
- **Team photos:** Max 800px wide, WebP quality 80, always saved as `photo.webp` in the person's folder.
- **Project photos:** WebP quality 82, named sequentially (`01.webp`, `02.webp`, etc.).
- **Every `<img>` tag requires:** `alt`, `width`, `height`, and `loading="lazy"`.
  - Exception: the main gallery image (`id="gal-img"`) and logo in the nav do NOT get `loading="lazy"` (above fold).
  - Get dimensions from sharp: `const { width, height } = await sharp(file).metadata();`
- **No orphaned images.** If a project is removed, delete its image folder.

### Why
The site went from 44MB to 15MB image payload by following these rules. Team page alone went from 22MB to 1.3MB. This directly affects Core Web Vitals (LCP) and mobile performance.

---

## Structured Data (JSON-LD)

### Rules
- **Every page must have a `<script type="application/ld+json">` block** before `</head>`.
- **Homepage:** `@graph` array with Organization+ProfessionalService, WebSite, WebPage, BreadcrumbList.
- **Project detail pages:** CreativeWork + BreadcrumbList (Home > Projects > [Name]).
- **Other pages:** Appropriate PageType (AboutPage, ContactPage, CollectionPage) + BreadcrumbList.
- **All schema must use `@id` cross-references:**
  - Organization: `https://www.nodegroup.co.uk/#organization`
  - Website: `https://www.nodegroup.co.uk/#website`
  - Rory Brady: `https://www.nodegroup.co.uk/#rory-brady`
- **All URLs in schema must use the production domain:** `https://www.nodegroup.co.uk`

### Template for new project pages
```json
{"@context":"https://schema.org","@graph":[{"@type":"CreativeWork","name":"[Project Name] — Scaffold Design","description":"[First sentence of meta description]","url":"https://www.nodegroup.co.uk/projects/[slug].html","image":"https://www.nodegroup.co.uk/images/projects/[slug]/01.webp","creator":{"@id":"https://www.nodegroup.co.uk/#organization"},"locationCreated":{"@type":"Place","name":"[Location Name]","address":{"@type":"PostalAddress","addressLocality":"[Area]","addressRegion":"London","addressCountry":"GB"}}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.nodegroup.co.uk/"},{"@type":"ListItem","position":2,"name":"Projects","item":"https://www.nodegroup.co.uk/projects.html"},{"@type":"ListItem","position":3,"name":"[Project Name]","item":"https://www.nodegroup.co.uk/projects/[slug].html"}]}]}
```

### Why
The site went from 0 pages with schema to 18 pages. Schema score jumped from 4/100 to 82/100. Google uses this for Knowledge Panels, rich results, and AI Overviews.

---

## Content Quality

### Project Page Content Rules
1. **Three H2 sections required:** "Project Overview", "The Design Challenge", "What Node Delivered"
2. **Minimum 300 words** of unique body content per project page.
3. **"What Node Delivered" must be specific.** Reference actual deliverables, timescales, constraints overcome, or quantifiable outcomes. Never write generic closings like "A strong example of scaffold design for..." — these flag as AI-generated filler.
4. **"The Design Challenge" must exist** on every project page. Describe the actual engineering constraints: load paths, heritage restrictions, site access, wind loading, tidal constraints, highway licence requirements, etc.
5. **Write from project-specific detail.** Look at the images and specs to understand what actually happened. Mention visible details: netting, hoarding type, system brand (Layher, etc.), scaffold configuration, number of storeys, approximate heights.

### Content Structure
- One `<h1>` per page (project name only).
- `<h2>` for major sections.
- Paragraphs of 2-4 sentences.
- Engineering terminology used in context (not stuffed).
- Every project body in the HTML file must match the `body` field in `js/main.js` PD object.

### Meta Descriptions
- Under 160 characters.
- Unique per page.
- Include: project name, location, scaffold type, "by Node Group".

### Why
Content score went from 67 to 78. Thin pages (Merchant Square: 175 words, Millbrook Hall: 183 words) were expanded to 370-400+ words. Formulaic closings on 7 pages were all replaced with project-specific outcomes.

---

## Page Creation Checklist

When creating any new page:

### Head Section
- [ ] `<title>` — unique, under 60 chars, includes "Node Group"
- [ ] `<meta name="description">` — unique, under 160 chars
- [ ] `<link rel="canonical" href="https://www.nodegroup.co.uk/[path]">`
- [ ] OG tags: title, description, image, url, type, site_name
- [ ] Twitter card: `summary_large_image`
- [ ] Favicon links (copy from any existing page)
- [ ] JSON-LD schema with BreadcrumbList + appropriate type
- [ ] Google Fonts link + stylesheet link

### Body Section
- [ ] Standard nav (copy from existing page)
- [ ] Single `<h1>`
- [ ] All images: WebP, `alt`, `width`, `height`, `loading="lazy"`
- [ ] Footer with privacy link and service links to `/#services`

### After Creation
- [ ] Add to `sitemap.xml` with accurate `<lastmod>` date
- [ ] Update `llms.txt` if the page is notable
- [ ] Update JSON-LD on related pages if needed (e.g. CollectionPage hasPart array on projects.html)

---

## Internal Linking

### Rules
- **Project cards** on `projects.html` and `index.html` must have `<a href="/projects/slug.html">` inside the `pc-title` div.
- **Every project detail page** must have a "Related Projects" section before the footer with 2-3 links to similar projects.
- **Footer service links** must point to `/#services` (never `href="#"`).
- **Footer** must include a privacy policy link.
- **No dead links.** Every `href` must point to a real destination.

### Related Projects Groupings
- Heritage: royal-albert-hall, lso-st-lukes, london-coliseum, garda-hq, woolwich-town-hall
- Commercial: canada-square, vauxhall-gantry, fibi-house, wardour-street, merchant-square, the-gherkin
- Residential: millbrook-hall, narrow-street

When adding a new project, add it to the appropriate group and update cross-links on 2-3 related pages.

### Related Projects HTML Template
```html
<div style="padding:24px 52px 40px">
  <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
    <span class="s-hd-ref">PRJ / Related Work</span>
    <div class="s-hd-line" style="flex:1;height:1px;background:var(--sb)"></div>
  </div>
  <div style="display:flex;gap:16px;flex-wrap:wrap">
    <a href="/projects/SLUG.html" style="flex:1;min-width:200px;padding:16px 20px;border:1.5px solid var(--sb);text-decoration:none;color:var(--k);transition:border-color .2s">
      <div style="font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--s);margin-bottom:6px">TYPE LABEL</div>
      <div style="font-weight:600;font-size:15px">PROJECT TITLE</div>
    </a>
    <!-- repeat for 2-3 projects -->
  </div>
</div>
```

---

## Sitemap & Technical

- `sitemap.xml` must list every indexable page (currently 19).
- Each entry must have an **accurate** `<lastmod>` date (not all the same).
- `robots.txt` allows all crawlers and references the sitemap.
- `netlify.toml` has 5 security headers: X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- `llms.txt` is the AI search self-description — update when notable changes occur (new flagship project, new service, contact details change).
- Legacy `project.html` has `<meta name="robots" content="noindex">`.

---

## SEO Scores (as of April 2026)

| Category | Score |
|---|---|
| Technical SEO | 87/100 |
| Content Quality | 78/100 |
| On-Page SEO | 85/100 |
| Schema | 82/100 |
| Performance | 68/100 |
| AI Search Readiness | 60/100 |
| Images | 72/100 |
| **Overall** | **79/100** |

### Remaining opportunities to reach 90+
- Expand contact page (needs Rory's input on engagement process)
- Add FAQ section with FAQPage schema
- Add responsive images (srcset)
- Create dedicated service pages
- Add Google Maps embed to contact page
- Add Companies House number to footer
- Add client testimonials
