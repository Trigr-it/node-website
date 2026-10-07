/* ── Project Data ─────────────────────── */
const PD={
  'lso-st-lukes':{
    type:'Heritage \u00b7 Grade I Listed \u00b7 Old Street EC1',
    title:'LSO St. Luke\u2019s Church',
    ref:'DWG / PRJ-011',
    img:'/images/projects/lso-st-lukes/01.webp',
    images:['/images/projects/lso-st-lukes/01.webp','/images/projects/lso-st-lukes/02.webp','/images/projects/lso-st-lukes/03.webp'],
    client:'Unison Scaffolding',date:'February 2025',location:'Old Street, London',
    body:'<h2>Project Overview</h2><p>We provided the temporary roof and support scaffold design for The Greenwell Academy \u2014 a new purpose-built special school for the Beckmead Trust on Tendring Road, Harlow, delivered by main contractor Tilbury Douglas. Working for Fourways Plant, the scope covered two independent temporary roofs spanning the steel-framed school blocks, the perimeter tube-and-fitting scaffold carrying them, and a lift sequence that allowed the roof structure to be pre-assembled at ground level and craned into position in sections.</p><h2>The Design Challenge</h2><p>The Greenwell Academy is a 64-place all-through SEND school with residential accommodation, built as a steel frame with composite metal-deck floors that were still being completed as the roofs went up. The temporary roofs had to span the full footprint of each block, fully enclose the elevations so the following trades could work in the dry, and go up fast enough not to hold back the frame and envelope programme. The site had the room for a mobile crane, so rather than building the roof piece by piece at height, the design was arranged around crane-lifted sections from the outset.</p><p>Lattice-beam trusses were designed to span across each block, bearing onto a tube-and-fitting perimeter scaffold with ties and load paths resolved against a steel frame that was itself still being completed. The roof was set out in modular bays so trusses and purlins could be assembled on the ground, rigged and landed onto the supporting scaffold in sections, with the lifting condition checked separately from the in-service case \u2014 a part-assembled roof section hanging from a two-leg sling sees very different forces to a finished roof under wind. With the roofs and elevations fully sheeted, each enclosure was analysed as a sealed structure for ULS wind, with uplift resolved through the trusses into the standards and ties below. Low-level loading platforms were included for landing materials off the crane, and the two roofs were coordinated where the blocks abut so that neither structure relied on the other.</p><h2>What Node Delivered</h2><p>Full temporary works design package \u2014 2D construction drawings, 3D model and structural calculations \u2014 issued to Fourways Plant for both blocks of The Greenwell Academy, covering the lattice-beam roof structure, perimeter support scaffold, sheeting arrangement and the crane-lift sequencing of pre-assembled roof sections. Both roofs were erected at pace on site with the finished structures sitting neatly over the steel frames, giving Tilbury Douglas a dry envelope for the fit-out of the new school beneath and taking the job from initial design and planning through scaffolding, crane lifts and erection as one coordinated temporary works solution.</p>',
    specs:[['DWG Ref','PRJ-023 / Rev A'],['Client','Fourways Plant'],['Main Contractor','Tilbury Douglas'],['Sector','Education \u00b7 SEND New Build'],['Location','Harlow, Essex'],['Type','Temporary Roofs + Support Scaffold'],['Roofs','2 No. Lattice-Beam'],['Installation','Crane-Lifted Sections'],['Sheeting','Full Roof + Elevations'],['Deliverables','2D Dwgs, 3D Model, Calcs'],['Date','June 2026']]
  },
  'occasio-house':{
    type:'Commercial \u00b7 New Build \u00b7 Harlow',
    title:'Occasio House',
    ref:'DWG / PRJ-022',
    img:'/images/projects/occasio-house/01.webp',
    images:['/images/projects/occasio-house/01.webp','/images/projects/occasio-house/02.webp','/images/projects/occasio-house/03.webp','/images/projects/occasio-house/04.webp','/images/projects/occasio-house/05.webp'],
    client:'MK1 Indigo Group',date:'September 2026',location:'Harlow, Essex',
    body:'<h2>Project Overview</h2><p>We provided the full scaffold design for Occasio House \u2014 part of Harlow Council\u2019s flagship Playhouse Cultural Quarter regeneration, delivered for main contractor Hill. The scheme replaces a demolished 2001 housing block at Playhouse Square with a new arts and cultural quarter, and Node\u2019s scope covered the full-perimeter access scaffold across the multi-block new-build for MK1 Indigo Group\u2019s scaffolding division.</p><h2>The Design Challenge</h2><p>The scaffold had to keep pace with a reinforced concrete frame progressing slab-by-slab across two adjacent blocks of differing heights, with a live tower crane operating between them and a fully hoarded town-centre perimeter separating the site from an active public realm. The access design needed to hand safe working platforms up to the following trades \u2014 brickwork, cladding and roofing \u2014 immediately behind the concrete frame without ever holding up the crane pour cycle.</p><p>A full-perimeter access scaffold was designed to each block with lift-by-lift erection sequenced against the slab pour programme. Cantilevered loading bays were integrated into the scaffold at height for direct material handling off the tower crane, and independent external staircase towers were designed to keep site access separate from the crane exclusion zone and the material bays. Gable ends were sheeted with debris netting for containment through the taller lifts, with the sheeting layout coordinated against the ULS wind analysis so the scaffold remained stable through the summer\u2019s open-frame phase before cladding closed the envelope. Loads to ground were carefully distributed given the constrained site footprint and the presence of concrete slabs, capping beams and buried services at ground level.</p><h2>What Node Delivered</h2><p>Full scaffold design package for the Occasio House new-build \u2014 2D construction drawings, complete 3D model and structural calculations \u2014 issued to MK1 Indigo Group covering the full-perimeter access scaffold across both blocks, cantilevered loading bays at height, independent external staircase towers and the gable-end sheeting arrangement. The design resolved the sequencing interface between Hill\u2019s slab-by-slab concrete frame pour, the following trades behind and the live tower crane operating on the constrained town-centre plot at the heart of Harlow\u2019s Playhouse Cultural Quarter regeneration.</p>',
    specs:[['DWG Ref','PRJ-022 / Rev A'],['Client','MK1 Indigo Group'],['Main Contractor','Hill'],['Sector','Commercial \u00b7 New Build Regeneration'],['Location','Harlow, Essex'],['Type','Access Scaffold + Loading Bays + Staircase Towers'],['Programme','Slab-by-Slab Sequenced'],['Deliverables','2D Dwgs, 3D Model, Calcs'],['Date','September 2026']]
  }
};

/* ── Card metadata for homepage rendering ─ */
/* When adding a new project to PD, add a matching entry here */
const CARD_DATA={
  'greenwell-academy':{desc:'Two lattice-beam temporary roofs over the steel-frame blocks of a new SEND school in Harlow, pre-assembled at ground level and crane-lifted into position in sections. Fully sheeted roofs and elevations for all-weather fit-out.'},
  'occasio-house':{desc:'Full-perimeter access scaffold across two RC-frame blocks for the Playhouse Cultural Quarter regeneration in Harlow. Slab-by-slab erection sequencing, cantilevered loading bays and independent staircase towers.'},
  'wellings-house':{desc:'Full-height access, 2,000 kg passenger/goods hoist run, 200 kg tool hoist run, external staircase tower and Monarflex sheeting for the progressive top-down demolition of a 12-storey residential tower.'},
  'marylebone-high-street':{desc:'Cantilevered protection fan over the pavement with vehicle access beneath, full-height access scaffold, 2-tonne hoist tower, internal 2-tonne running beam, Hakki staircase and temporary roof enclosure.'},
  'tooley-street':{desc:'Access scaffold and pavement gantry for a corner-site refurbishment behind London Bridge station. Monarflex-clad with full pedestrian protection on one of London\u2019s busiest streets.'},
  'priory-court':{desc:'Bespoke vehicle access gantry serving second, third and fourth floor loading bays on a restricted residential new-build site. Carefully sequenced around live operations.'},
  'royal-albert-hall':{desc:'Bespoke heritage scaffold on one of London\'s most iconic landmarks. Full access to the curved terracotta fa\u00e7ade, handed over in just two weeks.',cardImg:'/images/projects/royal-albert-hall/02.webp'},
  'canada-square':{desc:'Bespoke Layher access and hanging scaffold for high-level signage removal at the former Bank of America building. Weekend closures, full material tethering at height.'},
  'cecil-avenue':{desc:'Cuplok system scaffold for a 237-home, nine-storey residential development in Wembley. Full perimeter access coordinated with the concrete frame programme for Wates Group.'},
  'collendale-road':{desc:'Large-scale temporary roof on a commercial rooftop in central London. Apollo X-Beams, dual-direction Niko rails and hoists, delivered under a tight winter programme.'},
  'seaford-house':{desc:'Gantry, hanging scaffold and temporary roof for Seaford House in London\u2019s West End. Three scaffold systems coordinated into one package.'},
  'vauxhall-gantry':{desc:'Heavy-duty protection gantry designed for 10kN/m\u00b2 loading with fire-rated steel boards and Layher public access staircase as secondary fire escape.'},
  'lso-st-lukes':{desc:'Highly complex access scaffold for the Grade I listed LSO venue. Freestanding system with engineered buttress frames \u2014 no ties into the historic fabric.'},
  'fibi-house':{desc:'Temporary roof scaffold for a central London commercial refurbishment. Full wind analysis and ULS load transfer calculations included.'},
  'millbrook-hall':{desc:'Bespoke scaffold for a large residential refurbishment with complex roof geometry and restricted access.'},
  'wardour-street':{desc:'Refurbishment scaffold in Soho with restricted pavement access and Westminster City Council highway licence documentation.'},
  'london-coliseum':{desc:'Heritage scaffold for the ENO\'s iconic West End theatre. Heavy-duty pavement gantry and full-height dome scaffold with bridged bays.'},
  'garda-hq':{desc:'Large-scale freestanding LAYHER scaffold and full temporary roof for the 1842 Garda Headquarters. No ties into the listed structure.'},
  'the-shard':{desc:'NASC award-winning scaffold at the top of Europe\'s tallest building. Cantilevered access scaffold and 2-tonne lifting gantry at levels 81-91, all transported manually above level 78.'},
  'woolwich-town-hall':{desc:'Full perimeter scaffold and large-span temporary roof for a Grade II* listed civic building. Pavement gantry and bespoke bridge beams over fragile roof structure.'},
  'merchant-square':{desc:'Bespoke access scaffold for a large mixed-use development in the heart of London, coordinated across multiple work packages.'},
  'narrow-street':{desc:'Riverside scaffold for balcony replacement on the Thames. PLA permits, tidal windows, and daily working restrictions in a demanding environment.'},
  'the-gherkin':{desc:'Rolling cantilevered roof platform for BMU hydraulic arm replacement. New arm delivered by helicopter lift \u2014 zero disruption to occupants or public.'}
};

/* ── Render homepage latest 3 projects ── */
function renderHomeProjects(){
  var grid=document.getElementById('home-projects');
  if(!grid) return;
  var projects=Object.keys(PD).map(function(slug){
    var d=PD[slug];
    var m=d.ref.match(/PRJ-(\d+)/);
    return {slug:slug,data:d,num:m?parseInt(m[1]):0};
  });
  projects.sort(function(a,b){return b.num-a.num});
  var top3=projects.slice(0,3);
  var arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  grid.innerHTML=top3.map(function(p){
    var d=p.data;
    var c=CARD_DATA[p.slug]||{};
    var img=c.cardImg||d.img;
    var desc=c.desc||d.body.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().substring(0,150)+'\u2026';
    var shortDate=d.date.replace(/(\w{3})\w+/,'$1');
    var shortLoc=d.location.split(',')[0];
    return '<div class="pc" onclick="window.location.href=\'/projects/'+p.slug+'.html\'">'
      +'<div class="pc-img" style="height:280px"><img src="'+img+'" alt="'+d.title+' scaffold design" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s" loading="lazy"></div>'
      +'<div class="pc-meta">'
      +'<div class="pc-ref"><span class="pc-ref-dot"></span>'+d.ref+'</div>'
      +'<div class="pc-type">'+d.type+'</div>'
      +'<div class="pc-title"><a href="/projects/'+p.slug+'.html" style="color:inherit;text-decoration:none">'+d.title+'</a></div>'
      +'<p class="pc-desc">'+desc+'</p>'
      +'<div class="pc-tb"><div class="pc-tb-date">'+shortDate+' \u00b7 '+d.client+' \u00b7 '+shortLoc+'</div><div class="pc-tb-arr">'+arrow+'</div></div>'
      +'</div></div>';
  }).join('');
}

/* ── Navigate to project detail ──────── */
function det(slug){
  window.location.href='/projects/'+slug+'.html';
}

/* ── Project filter (projects page) ──── */
function filt(cat,btn){
  document.querySelectorAll('.fb').forEach(function(b){b.classList.remove('on')});
  btn.classList.add('on');
  document.querySelectorAll('#pm .pc').forEach(function(c){
    c.style.display=(cat==='all'||c.dataset.cat===cat)?'block':'none';
  });
}

/* ── Scroll reveal animations ────────── */
function initReveal(){
  var all=document.querySelectorAll('.reveal:not(.on),.reveal-l:not(.on),.reveal-r:not(.on)');
  all.forEach(function(el,i){
    var r=el.getBoundingClientRect();
    if(r.top < window.innerHeight+100){
      setTimeout(function(){el.classList.add('on')},i*60);
    }
  });
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e,i){
        if(e.isIntersecting){
          setTimeout(function(){e.target.classList.add('on')},i*60);
          obs.unobserve(e.target);
        }
      });
    },{threshold:0.05});
    all.forEach(function(el){obs.observe(el)});
  } else {
    all.forEach(function(el,i){setTimeout(function(){el.classList.add('on')},200+(i*60))});
  }
}

/* ── Stat counters ───────────────────── */
function runCounters(){
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseInt(el.dataset.count);
    var cur=0;var inc=Math.ceil(target/50);
    var timer=setInterval(function(){
      cur=Math.min(cur+inc,target);
      el.textContent=cur+'+';
      if(cur>=target)clearInterval(timer);
    },25);
  });
}

/* ── Active nav highlighting ─────────── */
function setActiveNav(){
  var path=window.location.pathname;
  var map={
    '/':'home','/index.html':'home',
    '/projects.html':'projects',
    '/about.html':'about',
    '/team.html':'team',
    '/contact.html':'contact'
  };
  var active=map[path]||'';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.classList.remove('on');
    if(a.dataset.nav===active) a.classList.add('on');
  });
}

/* ── Gallery state ────────────────────── */
var galImages=[];
var galIndex=0;

function galGo(i){
  if(i<0) i=galImages.length-1;
  if(i>=galImages.length) i=0;
  galIndex=i;
  document.getElementById('gal-img').src=galImages[i];
  document.getElementById('gal-ref').textContent='IMG / '+(i+1).toString().padStart(2,'0')+' of '+galImages.length.toString().padStart(2,'0');
  var thumbs=document.querySelectorAll('.gal-thumb');
  thumbs.forEach(function(t,idx){t.classList.toggle('on',idx===i)});
}

/* ── Load project detail (project.html) ── */
function loadProjectDetail(){
  try{
  var slug=new URLSearchParams(window.location.search).get('p');
  var d=PD[slug];
  if(!d){
    document.getElementById('d-title').textContent='Project not found';
    document.getElementById('d-type').textContent='The project "'+slug+'" could not be loaded.';
    return;
  }
  document.getElementById('d-type').textContent=d.type;
  document.getElementById('d-title').textContent=d.title;
  document.getElementById('d-body').innerHTML=d.body;
  document.getElementById('d-specs').innerHTML=d.specs.map(function(s){
    return '<div class="spec-r"><div class="spec-l">'+s[0]+'</div><div class="spec-v">'+s[1]+'</div></div>';
  }).join('');
  var metaEl=document.getElementById('det-meta');
  if(metaEl){metaEl.innerHTML=(d.client?'<span>Client: '+d.client+'</span>':'')+(d.location?'<span style="margin-left:24px">Location: '+d.location+'</span>':'')+(d.date?'<span style="margin-left:24px">Date: '+d.date+'</span>':'');}
  document.title=d.title+' \u2014 Node Group';
  /* Build gallery */
  galImages=d.images||[d.img];
  var galImg=document.getElementById('gal-img');
  var galRef=document.getElementById('gal-ref');
  var thumbsEl=document.getElementById('gal-thumbs');
  var prevBtn=document.querySelector('.gal-prev');
  var nextBtn=document.querySelector('.gal-next');
  if(galImg){
    galImg.src=galImages[0];
    if(galRef) galRef.textContent='IMG / 01 of '+String(galImages.length).padStart(2,'0');
    if(galImages.length>1&&thumbsEl){
      thumbsEl.innerHTML=galImages.map(function(src,i){
        return '<button class="gal-thumb'+(i===0?' on':'')+'" onclick="galGo('+i+')"><img src="'+src+'" alt="Photo '+(i+1)+'"></button>';
      }).join('');
      if(prevBtn) prevBtn.style.display='';
      if(nextBtn) nextBtn.style.display='';
    } else {
      if(thumbsEl) thumbsEl.style.display='none';
      if(prevBtn) prevBtn.style.display='none';
      if(nextBtn) nextBtn.style.display='none';
    }
  }
  }catch(e){
    document.getElementById('d-title').textContent='Error loading project';
    document.getElementById('d-body').innerHTML='<p>'+e.message+'</p>';
  }
}

/* ── Init ─────────────────────────────── */
document.addEventListener('DOMContentLoaded',function(){
  setActiveNav();
  renderHomeProjects();
  setTimeout(function(){
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r')
      .forEach(function(el,i){setTimeout(function(){el.classList.add('on')},100+(i*60))});
  },50);
  if(document.querySelectorAll('[data-count]').length) setTimeout(runCounters,400);
  /* Project detail loading is now inline in project.html */
});
