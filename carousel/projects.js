/* Per-project carousel content.
 * Add a new entry keyed by slug, then run:  node carousel/generate.js <slug>
 *
 * Each project gets 5 slides:
 *   1. Cover (auto from project meta)
 *   2. Overview (headline + body)
 *   3. Challenge (headline + bullets)
 *   4. Delivered (stat + bullets + photo)
 *   5. CTA (auto)
 */

module.exports = {
  'royal-albert-hall': {
    ref: 'PRJ-017',
    title: 'Royal Albert Hall',
    sector: 'Heritage · Grade I Listed',
    location: 'Kensington, London SW7',
    date: 'April 2026',
    client: 'Unison Scaffolding',
    coverImage: '01.webp',

    overview: {
      headline: 'A bespoke scaffold for one of London’s most iconic landmarks.',
      body: 'We were appointed as scaffold design consultants for a package at the Royal Albert Hall — a Grade I listed concert hall requiring façade access scaffold designed and delivered under an extremely tight programme.'
    },

    challenge: {
      headline: 'Designing around a Grade I listed façade.',
      bullets: [
        'No fixings into listed fabric — carefully managed tie positions only',
        'Scaffold follows the curved geometry of the red-brick and terracotta façade',
        'Bridging arrangement over the arched entrance to maintain public access',
        'Full netting to upper levels for debris containment'
      ]
    },

    delivered: {
      stat: '2 weeks',
      statLabel: 'Programme turnaround',
      headline: 'Full bespoke design package, accelerated.',
      bullets: [
        '2D construction drawings',
        '3D structural model',
        'Structural calculations',
        'Handed over to contractor in just over two weeks'
      ],
      image: '02.webp'
    },

    model3d: {
      url: 'https://3d.nodegroup.co.uk/m/93c4a445-8f63-4547-9705-8c35fcd7c191',
      headline: 'Designed and modelled in 3D before a tube was lifted.',
      caption: 'Full structural 3D model coordinated with the Hall’s curved heritage façade.'
    },

    linkedinPost: `Bespoke façade access scaffold design for one of London’s most iconic Grade I listed landmarks.

No fixings into the heritage fabric. A scaffold that follows the building’s curved terracotta and brick. Bridging over the public arched entrance. Full design package — 2D drawings, 3D model, structural calcs — handed over to the contractor in just over two weeks.

Read the full case study → https://www.nodegroup.co.uk/projects/royal-albert-hall.html

#ScaffoldDesign #HeritageScaffolding #RoyalAlbertHall #StructuralEngineering #UKConstruction`
  },

  'marylebone-high-street': {
    ref: 'PRJ-021',
    title: '1 Marylebone High Street',
    sector: 'Commercial · Refurbishment',
    location: 'Marylebone, London W1U',
    date: 'August 2026',
    client: 'Unison Scaffolding',
    coverImage: '01.webp',

    overview: {
      headline: 'A full scaffold package for a busy West End retail street.',
      body: 'We provided the scaffold design for a full refurbishment at 1 Marylebone High Street — cantilevered protection fan over the pavement, full-height access scaffold, 2-tonne hoist tower, integrated running beam, Hakki staircase and a temporary roof across the full building footprint.'
    },

    challenge: {
      headline: 'Six systems, one load path, one of London’s busiest retail streets.',
      bullets: [
        'Cantilevered protection fan over pavement with HGV access beneath',
        '2-tonne rack-and-pinion hoist plus internal 2-tonne running beam',
        'Full temporary roof enclosure over the building footprint',
        'Printed facade dressing to meet Westminster presentation requirements'
      ]
    },

    delivered: {
      stat: '2t',
      statLabel: 'Hoist + running beam capacity',
      headline: 'Six coordinated scaffold systems, one design package.',
      bullets: [
        'Cantilevered protection fan + full-height access scaffold',
        '2-tonne hoist tower + 2-tonne internal running beam',
        'Hakki staircase and temporary roof enclosure',
        '2D drawings, 3D model and structural calculations to programme'
      ],
      image: '02.webp'
    },

    photoSlide: {
      image: '03.webp',
      caption: 'Temporary roof over the full building footprint, seen from above.',
      ref: 'IMG / 03'
    },

    linkedinPost: `A full scaffold package for a full refurbishment on one of the West End’s busiest retail streets.

Cantilevered protection fan over the pavement with vehicle access beneath. 2-tonne hoist tower. Internal 2-tonne running beam. Hakki staircase. Temporary roof across the full building footprint. Six coordinated scaffold systems, one load path, one design package — issued to Unison Scaffolding.

Read the full case study → https://www.nodegroup.co.uk/projects/marylebone-high-street.html

#ScaffoldDesign #TemporaryWorks #Marylebone #ProtectionGantry #UKConstruction`
  },

  'wellings-house': {
    ref: 'PRJ-020',
    title: 'Wellings House',
    sector: 'Demolition · High-Rise Residential',
    location: 'Hayes, London UB3',
    date: 'May 2026',
    client: 'MK1 Indigo Group',
    coverImage: '01.webp',

    overview: {
      headline: 'A full temporary works package for a 12-storey demolition.',
      body: 'Full-height access scaffold, 2,000 kg passenger/goods hoist run, 200 kg tool hoist run and external staircase tower for the progressive top-down demolition of a 12-storey 1960s residential tower on the Avondale Drive Estate — part of Hillingdon Council’s Avondale regeneration with Higgins Partnerships.'
    },

    challenge: {
      headline: 'Stability on a structure that is actively being reduced.',
      bullets: [
        'Ties, bracing and load paths resolved against progressive top-down demolition',
        'Load Class 3 general purpose access + Load Class 6+ (10.0 kN/m²) loading platform',
        '2,000 kg passenger/goods hoist plus a separate 200 kg tool hoist run',
        'Monarflex-type sheeting for full-envelope debris and dust containment'
      ]
    },

    delivered: {
      stat: '12',
      statLabel: 'Storeys designed',
      headline: 'Access, hoist, staircase and sheeting — one coordinated package.',
      bullets: [
        'Full-height access scaffold to Load Class 3',
        '2,000 kg passenger/goods hoist + 200 kg tool hoist run',
        'External staircase tower separated from the material hoist',
        '2D drawings, 3D model and structural calculations to SG4:22 / TG20 / STA'
      ],
      image: '02.webp'
    },

    photoSlide: {
      image: '03.webp',
      caption: '3D scaffold model showing the external staircase tower and 2,000 kg hoist run.',
      ref: 'IMG / 03'
    },

    linkedinPost: `A full temporary works package for the demolition of a 12-storey residential tower.

Full-height access, a 2,000 kg passenger/goods hoist tied into the scaffold, a separate 200 kg tool hoist run, external staircase tower and Monarflex sheeting for the full envelope — all designed against a structure that changes floor-by-floor as the top-down demolition progresses. Delivered for MK1 Indigo Group and Northeast Demolition on the Avondale Drive regeneration in Hayes.

Read the full case study → https://www.nodegroup.co.uk/projects/wellings-house.html

#ScaffoldDesign #DemolitionScaffolding #HighRise #TemporaryWorks #UKConstruction`
  },

  'occasio-house': {
    ref: 'PRJ-022',
    title: 'Occasio House',
    sector: 'Commercial · New Build',
    location: 'Harlow, Essex',
    date: 'September 2026',
    client: 'MK1 Indigo Group',
    coverImage: '01.webp',

    overview: {
      headline: 'Full-perimeter access across two blocks of a flagship town-centre regeneration.',
      body: 'Full scaffold design for Occasio House — part of Harlow Council’s £34m Playhouse Cultural Quarter regeneration, delivered for main contractor Hill. Two RC-framed blocks of differing heights, a live tower crane operating between them, and a fully hoarded town-centre perimeter.'
    },

    challenge: {
      headline: 'Keeping pace with a slab-by-slab RC frame.',
      bullets: [
        'Lift-by-lift scaffold erection sequenced against the concrete frame pour',
        'Cantilevered loading bays at height for direct tower crane material handling',
        'Independent external staircase towers separated from the crane exclusion zone',
        'Gable-end debris netting coordinated against ULS wind for the open-frame phase'
      ]
    },

    delivered: {
      stat: '2',
      statLabel: 'Blocks coordinated',
      headline: 'One design package across the multi-block new-build.',
      bullets: [
        'Full-perimeter access scaffold to both blocks',
        'Cantilevered loading bays for direct tower crane material handling',
        'Independent external staircase towers for site access',
        '2D drawings, 3D model and structural calculations to programme'
      ],
      image: '04.webp'
    },

    photoSlide: {
      image: '02.webp',
      caption: 'Debris netting on the gable end with the Playhouse Cultural Quarter hoarding at ground level.',
      ref: 'IMG / 02'
    },

    linkedinPost: `Full-perimeter access scaffold across two RC-frame blocks for a flagship town-centre regeneration.

Occasio House is part of Harlow Council’s £34m Playhouse Cultural Quarter, delivered for main contractor Hill. Lift-by-lift erection sequenced against the slab pour. Cantilevered loading bays for the tower crane. Independent external staircase towers. Gable-end sheeting coordinated against ULS wind for the open-frame phase. Delivered to MK1 Indigo Group.

Read the full case study → https://www.nodegroup.co.uk/projects/occasio-house.html

#ScaffoldDesign #NewBuild #TownCentreRegeneration #Harlow #UKConstruction`
  }
};
