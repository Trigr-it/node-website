Create a new website project page from a LinkedIn post.

## Input
The user will provide a LinkedIn post URL. They may also provide the project name and/or client name. Everything else should be inferred — never ask questions, just build it.

## Gathering information

Before building anything, gather all available information from multiple sources:

1. **LinkedIn post text** — Fetch via WebFetch to get the full post content
2. **LinkedIn post images** — Curl the raw HTML and extract all `feedshare` image URLs (filter out `displayphoto` profile pics)
3. **LinkedIn poster profile** — The poster's name/company often indicates the scaffolding contractor (client). Check their profile headline/company if visible in the page HTML
4. **Web search** — If the project name or location isn't clear from the post, search the web for context (e.g. search the poster's company + keywords from the post to find the project/site)
5. **Image review** — After downloading images, read each one to identify: scaffold type, site conditions, building type (residential/commercial/heritage), hoarding, netting, bracing, signage, location clues
6. **User-provided info** — Use any project name, client, or details the user provides alongside the URL

## Filling in gaps

Use this priority order for each field:

| Field | Source priority |
|-------|---------------|
| **Project name** | User-provided > post text > web search > image clues |
| **Client** | User-provided > poster's company > post text > leave as "TBC" |
| **Location** | User-provided > post text > web search > image clues (signage, landmarks) > leave as "TBC" |
| **Sector** | Infer from building type in images/text (residential, commercial, heritage, infrastructure) |
| **Date** | User-provided > current month/year |
| **Type** | Infer from post text + images (e.g. "Vehicle Access Gantry", "Heritage Access Scaffold") |
| **Body content** | Write from post text, refined with image observations. Follow Node Group tone. |

If a field absolutely cannot be determined, use "TBC" so it's easy to find and fill later. Never ask — just build with best available info.

## Process

Follow these steps exactly:

### Step 1 — Extract content and images from the LinkedIn post
- Fetch the post URL with WebFetch to get the full text
- Curl the raw HTML to extract all `feedshare` image URLs
- If post text is thin, web search for the project/site name + client for additional context

### Step 2 — Download and convert images
- Download each feedshare image to `/tmp/`
- Use sharp (via node) to convert to WebP at 800px wide, quality 82
- Save to `images/projects/[slug]/` as `01.webp`, `02.webp`, etc.
- Note each image's dimensions (width x height) for the HTML

### Step 3 — Review images
Read each converted WebP image to visually inspect what's shown. Use what you see to:
- Confirm or identify sector (residential/commercial/heritage)
- Identify scaffold type, bracing, systems visible
- Spot site conditions (tight access, hoarding, netting, trees, pedestrian routes)
- Look for signage or text that reveals project name, client, or location
- Refine and add specificity to the written content

### Step 4 — Write the project detail page
Create `projects/[slug].html` following the CLAUDE.md project page checklist exactly:
- `<title>` format: `[Project Name] — Scaffold Design | Node Group`
- Unique `<meta name="description">` under 160 chars
- `<link rel="canonical">` with full `https://www.nodegroup.co.uk` URL
- OG tags: title, description, image (01.webp), url, type="article", site_name
- Twitter card: summary_large_image
- Favicon link tags (3 lines)
- JSON-LD with CreativeWork + BreadcrumbList (Home > Projects > Name)
- Google Analytics snippet
- Full nav, hero, gallery, body content, sidebar specs, related projects, footer
- Body content uses `<h2>` headings: "Project Overview", "The Design Challenge", "What Node Delivered"
- "What Node Delivered" must reference specific project outcomes — never generic/formulaic
- All images have `width`, `height`, `loading="lazy"` (except hero gal-img)
- "Related Projects" section with 2-3 similar projects before footer
- The DWG ref is the next number in sequence (check existing PD entries in main.js)

### Step 5 — Add PD entry to js/main.js
Add the project data object to the PD constant in `js/main.js`. Include: type, title, ref, img, images array, client, date, location, body (HTML string with h2 headings), and specs array. The body content must match the HTML in the detail page.

### Step 6 — Add project card to projects.html
Insert a new `.pc` card div in `projects.html` so that all cards are in **descending PRJ number order** (highest/newest first). The card must have:
- Correct `data-cat` attribute (heritage, commercial, residential, or infrastructure)
- `onclick` linking to the detail page
- `<a href>` inside `.pc-title` for crawler discovery
- Card title should NOT include the location (location is already in the tag text)
- Image with width, height, loading="lazy"
- DWG ref, type, title, short description, date/client/location line

### Step 7 — Update projects.html JSON-LD
Add a new `CreativeWork` entry to the `hasPart` array in the `CollectionPage` JSON-LD schema in `projects.html`.

### Step 8 — Update sitemap.xml
Add the new project URL to `sitemap.xml` with today's date as `<lastmod>` and priority `0.7`.

### Step 8b — Update llms-full.txt and llms.txt
Add a new project entry to the "Notable Projects" section of `llms-full.txt` following the existing format (Type, Location, Client, Summary, URL). Also add a one-line entry to the "Notable Projects" section of `llms.txt`. This ensures AI systems can discover and cite the new project.

### Step 8c — Update homepage static cards if new project is in the top 3
The homepage (`index.html`) has a `#home-projects` div with **static HTML cards** for the 3 latest projects (highest PRJ numbers). These are the SEO/no-JS fallback — JS overwrites them at runtime via `renderHomeProjects()` in main.js, but the static HTML must also be correct for crawlers.

**Always check:** If the new project's PRJ number is in the top 3 (i.e. higher than at least one of the existing static cards), update the static HTML in `index.html`:
1. Read the current 3 static cards in `#home-projects`
2. Determine the top 3 projects by PRJ number from `js/main.js`
3. Replace all 3 static cards with the correct top 3, using the same card HTML structure (pc-img, pc-meta, pc-ref, pc-type, pc-title with `<a href>`, pc-desc, pc-tb)
4. Use data from PD and CARD_DATA in main.js for descriptions, images, types, dates etc.

This step is critical — skipping it causes the homepage to show stale project cards to search engines and briefly on page load.

### Step 9 — Open locally for review
Start the local server and open the project page in the browser so Rory can review before pushing.

## Key rules
- **Never ask questions** — infer everything possible, use "TBC" for anything truly unknown
- Client is always the scaffolding contractor
- Images always come from the LinkedIn post — don't ask for separate files
- All images must be WebP, max 800px wide, quality 82
- No formulaic/generic "What Node Delivered" closings — reference specific project outcomes
- Every page needs all SEO tags, JSON-LD schema, and breadcrumbs
- Card titles on projects.html should not include location (it's in the tag line)
- PRJ numbers must be in chronological order (oldest = lowest)
- Don't push without Rory reviewing locally first
