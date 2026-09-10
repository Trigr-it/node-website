/* LinkedIn carousel PDF generator for Node Group project pages.
 *
 * Usage:    node carousel/generate.js <project-slug>
 * Example:  node carousel/generate.js royal-albert-hall
 *
 * Output:   carousel/output/<slug>-carousel.pdf  (1080 x 1350 portrait)
 */

const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const projects = require('./projects.js');

const SLIDE_W = 1080;
const SLIDE_H = 1350;
const MODEL_LOAD_WAIT_MS = 8000; // time given to 3D viewer to load + start auto-rotate

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node carousel/generate.js <project-slug>');
  process.exit(1);
}
const data = projects[slug];
if (!data) {
  console.error(`Unknown project slug: "${slug}". Known: ${Object.keys(projects).join(', ')}`);
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '..');
const imgDir = path.join(repoRoot, 'images', 'projects', slug);
const logoPath = path.join(repoRoot, 'images', 'n-logo-orange.png');

function fileToDataUri(p) {
  const ext = path.extname(p).slice(1).toLowerCase();
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : `image/${ext}`;
  const b64 = fs.readFileSync(p).toString('base64');
  return `data:${mime};base64,${b64}`;
}

(async () => {
  // Outputs go alongside the project's HTML page so each project's assets
  // live in one place: projects/<slug>.html + projects/<slug>/carousel.pdf, etc.
  const outDir = path.join(repoRoot, 'projects', slug);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });

  // --- Step 1: capture 3D model screenshot if URL configured ---
  let model3dSrc = null;
  if (data.model3d && data.model3d.url) {
    console.log(`Capturing 3D model from ${data.model3d.url} ...`);
    const mPage = await browser.newPage();
    // Wider viewport to give the model space to render
    await mPage.setViewport({ width: 1400, height: 1100, deviceScaleFactor: 2 });
    await mPage.goto(data.model3d.url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, MODEL_LOAD_WAIT_MS));

    // Crop the top to remove any viewer chrome (matches the project page's -60px offset trick)
    const screenshotPath = path.join(outDir, `3d-capture.png`);
    await mPage.screenshot({
      path: screenshotPath,
      clip: { x: 0, y: 80, width: 1400, height: 980 }
    });
    await mPage.close();
    model3dSrc = fileToDataUri(screenshotPath);
    console.log(`Wrote 3D capture: ${screenshotPath}`);
  }

  // --- Step 2: prepare other image assets ---
  const coverSrc = fileToDataUri(path.join(imgDir, data.coverImage));
  const deliveredSrc = data.delivered.image
    ? fileToDataUri(path.join(imgDir, data.delivered.image))
    : null;
  const photoSrc = !model3dSrc && data.photoSlide && data.photoSlide.image
    ? fileToDataUri(path.join(imgDir, data.photoSlide.image))
    : null;
  const logoSrc = fileToDataUri(logoPath);

  // --- Step 3: build slide HTML ---
  // 3D and photo slide are mutually exclusive — 3D wins if configured
  const hasMidSlide = !!(model3dSrc || photoSrc);
  const TOTAL = hasMidSlide ? 5 : 4;
  const refTag = (n) => `DWG / ${String(n).padStart(2, '0')} OF ${String(TOTAL).padStart(2, '0')}`;

  const cornerMarks = `
    <span class="cm cm-tl"></span>
    <span class="cm cm-tr"></span>
    <span class="cm cm-bl"></span>
    <span class="cm cm-br"></span>
  `;

  const headerStrip = (n) => `
    <div class="strip strip-top">
      <span class="mono">${refTag(n)}</span>
      <span class="strip-line"></span>
      <span class="mono">NODE GROUP · SCAFFOLD DESIGN</span>
    </div>
  `;

  const footerStrip = `
    <div class="strip strip-bot">
      <span class="mono">NODEGROUP.CO.UK</span>
      <span class="strip-line"></span>
      <span class="mono">${data.ref} / Rev A</span>
    </div>
  `;

  const slide1 = `
<section class="slide cover" id="slide-1">
  ${cornerMarks}
  <div class="cover-img" style="background-image:url('${coverSrc}')"></div>
  <div class="cover-meta">
    <div class="mono cover-ref">${data.ref} / Rev A</div>
    <h1 class="cover-title">${data.title}</h1>
    <div class="mono cover-sector">${data.sector} · ${data.location}</div>
    <div class="cover-specs">
      <div class="cspec"><div class="mono cspec-l">Client</div><div class="cspec-v">${data.client}</div></div>
      <div class="cspec"><div class="mono cspec-l">Date</div><div class="cspec-v">${data.date}</div></div>
    </div>
  </div>
  <div class="cover-foot">
    <div class="logo-row">
      <img src="${logoSrc}" alt="" class="logo">
      <div>
        <div class="logo-word">Node</div>
        <div class="mono logo-sub">Specialist Scaffold Design Consultancy</div>
      </div>
    </div>
    <div class="mono cover-swipe">SWIPE →</div>
  </div>
</section>
  `;

  // Overview slide removed — its lead-in is now an intro line on the Challenge slide,
  // and Client/Date have moved to the cover slide.
  const slide2 = `
<section class="slide content" id="slide-2">
  ${cornerMarks}
  ${headerStrip(2)}
  <div class="body">
    <div class="mono kicker">The Design Challenge</div>
    <p class="lead">${data.overview.body}</p>
    <h2 class="headline small">${data.challenge.headline}</h2>
    <ul class="bullets">
      ${data.challenge.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
  </div>
  ${footerStrip}
</section>
  `;

  const midSlideNum = 3;
  const deliveredSlideNum = hasMidSlide ? 4 : 3;
  const ctaSlideNum = hasMidSlide ? 5 : 4;

  const slide3D = model3dSrc ? `
<section class="slide model-slide" id="slide-${midSlideNum}">
  ${cornerMarks}
  ${headerStrip(midSlideNum)}
  <div class="model-body">
    <div class="mono kicker">3D Structural Model</div>
    <h2 class="headline small">${data.model3d.headline || 'Designed and modelled in 3D.'}</h2>
    <div class="model-frame" style="background-image:url('${model3dSrc}')"></div>
    <div class="model-cap">
      <span class="mono model-ref">3D-MODEL / Interactive View</span>
      <span class="model-cap-text">${data.model3d.caption || ''}</span>
    </div>
  </div>
  ${footerStrip}
</section>
  ` : '';

  const slidePhoto = (!model3dSrc && photoSrc) ? `
<section class="slide photo-slide" id="slide-${midSlideNum}">
  ${cornerMarks}
  ${headerStrip(midSlideNum)}
  <div class="photo-frame" style="background-image:url('${photoSrc}')"></div>
  <div class="photo-caption">
    <span class="mono photo-ref">${data.photoSlide.ref || 'IMG / ON SITE'}</span>
    <span class="photo-cap-text">${data.photoSlide.caption}</span>
  </div>
  ${footerStrip}
</section>
  ` : '';

  const slide4 = `
<section class="slide content delivered" id="slide-${deliveredSlideNum}">
  ${cornerMarks}
  ${headerStrip(deliveredSlideNum)}
  <div class="body">
    <div class="mono kicker">What Node Delivered</div>
    <div class="stat-row">
      <div class="stat-num">${data.delivered.stat}</div>
      <div class="mono stat-lbl">${data.delivered.statLabel}</div>
    </div>
    <h2 class="headline small">${data.delivered.headline}</h2>
    <ul class="bullets">
      ${data.delivered.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
    ${deliveredSrc ? `<div class="del-img" style="background-image:url('${deliveredSrc}')"></div>` : ''}
  </div>
  ${footerStrip}
</section>
  `;

  const slide5 = `
<section class="slide cta" id="slide-${ctaSlideNum}">
  ${cornerMarks}
  ${headerStrip(ctaSlideNum)}
  <div class="cta-body">
    <img src="${logoSrc}" alt="" class="cta-logo">
    <div class="mono cta-kicker">Considering a similar project?</div>
    <h2 class="cta-headline">Let’s discuss your scaffold design.</h2>
    <div class="cta-contact">
      <div><span class="mono cta-l">Phone</span><span class="cta-v">020 3488 0882</span></div>
      <div><span class="mono cta-l">Email</span><span class="cta-v">info@nodegroup.co.uk</span></div>
      <div><span class="mono cta-l">Web</span><span class="cta-v">nodegroup.co.uk</span></div>
    </div>
    <div class="mono cta-tag">Specialist scaffold, hoist & MCWP design · UK & Ireland</div>
  </div>
  ${footerStrip}
</section>
  `;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${data.title} — Carousel</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --o:#FF6700; --od:#CC5200; --ol:#FFF0E6;
    --k:#1A1A1A; --w:#FFFFFF;
    --bg:#F7F6F2; --bg2:#F0EEE8;
    --sb:#D8D4C8; --s:#727272; --mu:#999990;
    --mono:'DM Mono','Courier New',monospace;
    --grid-major:rgba(180,170,150,0.16);
    --grid-minor:rgba(180,170,150,0.07);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    font-family:'DM Sans', sans-serif;
    color:var(--k);
    background:#fff;
    -webkit-font-smoothing:antialiased;
  }
  .mono { font-family:var(--mono); letter-spacing:.08em; text-transform:uppercase; }

  .slide {
    width:${SLIDE_W}px;
    height:${SLIDE_H}px;
    position:relative;
    background:var(--bg);
    background-image:
      linear-gradient(var(--grid-major) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-major) 1px, transparent 1px),
      linear-gradient(var(--grid-minor) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-minor) 1px, transparent 1px);
    background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
    overflow:hidden;
    page-break-after: always;
    break-after: page;
  }
  .slide:last-child { page-break-after: auto; break-after: auto; }

  .cm { position:absolute; width:36px; height:36px; border:2px solid var(--k); }
  .cm-tl { top:36px; left:36px; border-right:none; border-bottom:none; }
  .cm-tr { top:36px; right:36px; border-left:none; border-bottom:none; }
  .cm-bl { bottom:36px; left:36px; border-right:none; border-top:none; }
  .cm-br { bottom:36px; right:36px; border-left:none; border-top:none; }

  .strip {
    position:absolute; left:80px; right:80px;
    display:flex; align-items:center; gap:18px;
    font-size:18px; color:var(--s); font-weight:500;
  }
  .strip-top { top:78px; }
  .strip-bot { bottom:78px; }
  .strip-line { flex:1; height:1px; background:var(--sb); }

  .body {
    position:absolute; left:80px; right:80px; top:150px; bottom:150px;
    display:flex; flex-direction:column;
  }
  .kicker { font-size:22px; color:var(--o); margin-bottom:32px; font-weight:600; }
  .headline {
    font-size:68px; line-height:1.08; font-weight:700;
    letter-spacing:-0.02em; max-width:880px; margin-bottom:32px;
  }
  .headline.small { font-size:48px; margin-top:24px; max-width:820px; }
  .copy { font-size:30px; line-height:1.45; color:var(--k); max-width:880px; }
  .lead {
    font-size:26px; line-height:1.4; color:var(--k);
    max-width:880px; margin-bottom:28px;
    padding-bottom:24px; border-bottom:1.5px solid var(--sb);
  }

  .spec-grid {
    margin-top:auto; display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0;
    border-top:1.5px solid var(--sb); padding-top:28px;
  }
  .spec { padding-right:16px; }
  .spec-l { font-size:18px; color:var(--mu); margin-bottom:10px; font-weight:500; }
  .spec-v { font-size:28px; font-weight:700; }

  .bullets { list-style:none; margin-top:8px; }
  .bullets li {
    position:relative; padding-left:42px; margin-bottom:28px;
    font-size:30px; line-height:1.4;
  }
  .bullets li::before {
    content:''; position:absolute; left:0; top:18px;
    width:24px; height:3px; background:var(--o);
  }

  /* photo slide */
  .photo-frame {
    position:absolute; left:80px; right:80px; top:150px; bottom:230px;
    background-size:cover; background-position:center;
    border:1.5px solid var(--sb);
  }
  .photo-caption {
    position:absolute; left:80px; right:80px; bottom:140px;
    display:flex; flex-direction:column; gap:10px;
  }
  .photo-ref { font-size:18px; color:var(--o); font-weight:600; }
  .photo-cap-text { font-size:24px; line-height:1.35; color:var(--k); font-weight:500; max-width:880px; }

  /* 3D model slide */
  .model-body {
    position:absolute; left:80px; right:80px; top:150px; bottom:150px;
    display:flex; flex-direction:column;
  }
  .model-body .kicker { margin-bottom:18px; }
  .model-body .headline.small { margin-top:0; margin-bottom:24px; font-size:42px; }
  .model-frame {
    flex:1; min-height:0;
    background:#1A1A1A;
    background-size:cover; background-position:center;
    border:1.5px solid var(--sb);
    margin-bottom:20px;
  }
  .model-cap { display:flex; flex-direction:column; gap:8px; }
  .model-ref { font-size:18px; color:var(--o); font-weight:600; }
  .model-cap-text { font-size:22px; line-height:1.35; color:var(--k); font-weight:500; max-width:880px; }

  /* cover */
  .cover-img {
    position:absolute; left:80px; right:80px; top:150px; height:560px;
    background-size:cover; background-position:center;
    border:1.5px solid var(--sb);
  }
  .cover-meta { position:absolute; left:80px; right:80px; top:750px; }
  .cover-ref { font-size:20px; color:var(--o); margin-bottom:18px; font-weight:600; }
  .cover-title {
    font-size:96px; font-weight:700; letter-spacing:-0.025em; line-height:1;
    margin-bottom:20px;
  }
  .cover-sector { font-size:22px; color:var(--s); font-weight:500; }
  .cover-specs {
    margin-top:22px; padding-top:22px;
    border-top:1.5px solid var(--sb);
    display:flex; gap:48px;
  }
  .cspec-l { font-size:16px; color:var(--mu); margin-bottom:6px; font-weight:500; }
  .cspec-v { font-size:24px; font-weight:700; }
  .cover-foot {
    position:absolute; left:80px; right:80px; bottom:120px;
    display:flex; justify-content:space-between; align-items:center;
  }
  .logo-row { display:flex; align-items:center; gap:16px; }
  .logo { width:64px; height:64px; }
  .logo-word { font-size:36px; font-weight:700; letter-spacing:-0.02em; }
  .logo-sub { font-size:16px; color:var(--s); margin-top:4px; font-weight:500; }
  .cover-swipe { font-size:22px; color:var(--o); font-weight:600; }

  /* delivered slide */
  .stat-row { display:flex; align-items:baseline; gap:24px; margin-bottom:8px; }
  .stat-num {
    font-size:140px; font-weight:700; letter-spacing:-0.04em; color:var(--o);
    line-height:1;
  }
  .stat-lbl { font-size:22px; color:var(--s); font-weight:500; }
  .del-img {
    margin-top:auto; height:300px;
    background-size:cover; background-position:center;
    border:1.5px solid var(--sb);
  }

  /* CTA */
  .cta-body {
    position:absolute; left:80px; right:80px; top:150px; bottom:150px;
    display:flex; flex-direction:column; justify-content:center;
  }
  .cta-logo { width:120px; height:120px; margin-bottom:44px; }
  .cta-kicker { font-size:22px; color:var(--o); margin-bottom:20px; font-weight:600; }
  .cta-headline {
    font-size:80px; line-height:1.05; font-weight:700;
    letter-spacing:-0.02em; max-width:880px; margin-bottom:56px;
  }
  .cta-contact { display:flex; flex-direction:column; gap:20px; margin-bottom:52px; }
  .cta-contact > div { display:flex; align-items:baseline; gap:32px; border-bottom:1px solid var(--sb); padding-bottom:18px; }
  .cta-l { font-size:20px; color:var(--mu); width:120px; font-weight:500; }
  .cta-v { font-size:36px; font-weight:700; }
  .cta-tag { font-size:20px; color:var(--s); font-weight:500; }
</style>
</head>
<body>
${slide1}
${slide2}
${slide3D}
${slidePhoto}
${slide4}
${slide5}
</body>
</html>`;

  const debugHtml = path.join(outDir, `slides.html`);
  fs.writeFileSync(debugHtml, html);
  console.log(`Wrote slide HTML: ${debugHtml}`);

  // --- Step 4: render slides to a single Puppeteer page, then to PNGs + PDF ---
  const page = await browser.newPage();
  await page.setViewport({ width: SLIDE_W, height: SLIDE_H * TOTAL, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // One PNG per slide for the preview
  const slidePngNames = [];
  for (let i = 0; i < TOTAL; i++) {
    const slideHandle = await page.$(`#slide-${i + 1}`);
    if (!slideHandle) continue;
    const pngName = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await slideHandle.screenshot({ path: path.join(outDir, pngName) });
    slidePngNames.push(pngName);
  }
  console.log(`Wrote ${slidePngNames.length} slide PNGs`);

  // LinkedIn-size preview viewer (uses the PNGs — reliable, no iframes)
  const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${data.title} — LinkedIn Carousel Preview</title>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body {
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:#F3F2EF;
    padding:32px 24px 80px;
    color:#1A1A1A;
  }
  h1 { font-size:22px; margin-bottom:6px; }
  .subtitle { color:#666; font-size:14px; margin-bottom:32px; }
  .legend { font-size:12px; color:#888; margin-bottom:24px; }
  .columns { display:flex; gap:48px; align-items:flex-start; flex-wrap:wrap; }
  .col { display:flex; flex-direction:column; gap:20px; }
  .col-head {
    font-size:13px; font-weight:600; text-transform:uppercase;
    letter-spacing:.05em; color:#444; padding-bottom:8px;
    border-bottom:2px solid #d8d4c8;
  }
  .frame { background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.06); }
  .frame img { display:block; }
  .slide-num {
    font-size:11px; font-family:'DM Mono', monospace;
    color:#888; padding:4px 10px;
  }
  .desktop img { width:552px; height:auto; }
  .mobile img { width:390px; height:auto; }
  @media (max-width: 1100px) { .columns { flex-direction:column; } }
</style>
</head>
<body>
  <h1>${data.title} — LinkedIn Carousel Preview</h1>
  <div class="subtitle">Each slide rendered at the size LinkedIn actually displays them at in the feed.</div>
  <div class="legend">Desktop feed: ~552px wide · Mobile feed: ~390px wide · Source: 1080 × 1350px</div>

  <div class="columns">
    <div class="col desktop">
      <div class="col-head">Desktop feed (552 × 690)</div>
      ${slidePngNames.map((name, i) => `
        <div>
          <div class="slide-num">SLIDE ${String(i+1).padStart(2,'0')} / ${String(TOTAL).padStart(2,'0')}</div>
          <div class="frame"><img src="${name}" alt="slide ${i+1}"></div>
        </div>`).join('')}
    </div>
    <div class="col mobile">
      <div class="col-head">Mobile feed (390 × 488)</div>
      ${slidePngNames.map((name, i) => `
        <div>
          <div class="slide-num">SLIDE ${String(i+1).padStart(2,'0')} / ${String(TOTAL).padStart(2,'0')}</div>
          <div class="frame"><img src="${name}" alt="slide ${i+1}"></div>
        </div>`).join('')}
    </div>
  </div>
</body>
</html>`;
  const previewPath = path.join(outDir, `preview.html`);
  fs.writeFileSync(previewPath, previewHtml);
  console.log(`Wrote LinkedIn-size preview: ${previewPath}`);

  // LinkedIn post text (copy-paste source for the actual LinkedIn post body)
  if (data.linkedinPost) {
    const postMd = `# LinkedIn Post — ${data.title}\n\nCopy the text below the line into your LinkedIn post body when uploading the carousel.\n\n---\n\n${data.linkedinPost}\n`;
    const postPath = path.join(outDir, `linkedin-post.md`);
    fs.writeFileSync(postPath, postMd);
    console.log(`Wrote LinkedIn post text: ${postPath}`);
  }

  // --- Step 5: render PDF (reuses the same page that captured the slide PNGs) ---
  let pdfPath = path.join(outDir, `carousel.pdf`);
  try {
    await page.pdf({
      path: pdfPath,
      width: `${SLIDE_W}px`,
      height: `${SLIDE_H}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false
    });
  } catch (e) {
    if (e.code === 'EBUSY') {
      const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      pdfPath = path.join(outDir, `carousel-${ts}.pdf`);
      console.log(`Main PDF locked (probably open in a viewer). Writing to ${pdfPath} instead.`);
      await page.pdf({
        path: pdfPath,
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: false
      });
    } else {
      throw e;
    }
  }

  await browser.close();
  console.log(`✓ PDF: ${pdfPath}`);
})();
