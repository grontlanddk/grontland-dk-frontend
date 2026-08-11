/** /private — audience landing for homeowners. Restructured per
 *  docs/private-page-restructure-mapping.md (9 sections). Copy da+en. */

export const PRIVATE_META = {
  title: "Renovering for private boligejere i Storkøbenhavn — Grønt Land DK",
  description:
    "Boligrenovering, facade, terrasse, belægning og havearbejde med ét team, én plan og én ansvarlig kontakt. Få en projektvurdering — vi svarer inden 24 timer.",
} as const;

// § 1 — Hero
export const PRIVATE_HERO = {
  h1: "Renovering og udendørsprojekter for boligejere i Storkøbenhavn",
  sub: "Fra boligrenovering og facader til terrasser, belægning og havearbejde — ét team, én plan og én ansvarlig kontakt fra start til aflevering.",
  ctas: [
    { label: "Få en projektvurdering", modal: true },
    { label: "Se private projekter", href: "/projekter" },
  ],
  trustChips: [
    "Storkøbenhavn",
    "Svar inden 24 timer",
    "Én kontakt for alle fag",
    "CVR 45514374",
  ],
  image: {
    src: "/images/cases/havearbejde-private.png",
    alt: "Plejet have med græsplæne og beplantning",
  },
} as const;

// § 2 — Services (cards come from CMS service docs; only heading/sub here)
export const PRIVATE_SERVICES = {
  h2: "Hvad kan vi hjælpe dig med?",
  sub: "Fra enkeltopgaver til komplet renovering med flere fag — Grønt Land DK klarer både indvendige og udvendige projekter i København og Storkøbenhavn.",
} as const;

// § 3 — Completed projects (data from CMS by slug)
export const PRIVATE_PROJECTS = {
  h2: "Se, hvad vi har udført for andre boligejere",
  // Selection is dynamic (latest 4 private via getProjectsNewestFirst).
  // Slugs kept as a migrate/seed hint of the intended set.
  slugs: [
    "totalrenovering-skodsborg",
    "belaegning-ved-bolig",
    "betontrappe-hellerup",
    "facadeopgave",
  ],
  ctas: [
    { label: "Se alle projekter", href: "/projekter" },
    { label: "Åbn galleriet", href: "/galleri" },
  ],
} as const;

// § 4 — Why one contractor (problem + solution bullets)
export const PRIVATE_ONE_TEAM = {
  h2: "Ét team i stedet for flere separate håndværkere",
  problem:
    "Renovering kræver ofte murer, tømrer, maler og en specialist i udearbejde. Hyrer du dem hver for sig, står du selv med tidsplanen, kommunikationen og med at finde den skyldige, når noget bliver forsinket.",
  intro: "Med Grønt Land DK får du i stedet:",
  // Figma 3067:319 background — byte-identical to the existing om-cta photo.
  background: {
    src: "/images/om/om-cta.jpg",
    alt: "Havesti med fliser mellem stedsegrønne buske og beplantning",
  },
  items: [
    { title: "Én ansvarlig kontakt", desc: "Én person holder styr på hele projektet." },
    { title: "Fælles plan for alle fag", desc: "Alle specialister arbejder efter samme plan." },
    { title: "Koordineret tidsplan", desc: "Faserne planlægges, så de passer sammen." },
    { title: "Færre pauser mellem faser", desc: "Mindre spildtid mellem etaperne." },
    { title: "Samlet kvalitetskontrol", desc: "Én standard for hele arbejdet." },
    { title: "Fælles gennemgang", desc: "Vi tjekker resultatet sammen ved aflevering." },
  ],
} as const;

// § 6 — Process (private variant of the shared Process block)
export const PRIVATE_PROCESS = {
  h2: "En klar proces fra første besked til aflevering",
  steps: [
    { title: "Du beskriver projektet", desc: "Du sender en beskrivelse, adresse og fotos." },
    {
      title: "Vi vurderer omfanget",
      desc: "Vi fastlægger de nødvendige arbejder, materialer og fag.",
    },
    { title: "Du får plan og tilbud", desc: "Du modtager pris, omfang og en foreløbig tidsplan." },
    {
      title: "Teamet udfører arbejdet",
      desc: "Én kontakt holder dig opdateret og koordinerer fagene.",
    },
    {
      title: "Gennemgang og aflevering",
      desc: "Vi tjekker resultatet sammen med dig og afleverer projektet.",
    },
  ],
  cta: { label: "Få en projektvurdering", href: "/kontakt" },
} as const;

// § 7 — Reviews. PLACEHOLDER data seeded from the old grontland.dk
// "Det siger kunderne" quotes (anonymized: no real names/links).
// TODO(client): replace with real, verifiable reviews (name + link).
export const PRIVATE_REVIEWS = {
  h2: "Hvad boligejere siger om at arbejde med os",
  placeholder: true,
  items: [
    {
      quote: "God kommunikation hele vejen, og arbejdet blev afleveret som aftalt.",
      name: "Kunde (placeholder)",
      city: "Tårnby",
      service: "Terrasseprojekt",
      href: null,
    },
    {
      quote: "Vi fik en klar plan og kunne stole på tidsplanen.",
      name: "Kunde (placeholder)",
      city: "Kastrup",
      service: "Renovering",
      href: null,
    },
    {
      quote: "Professionelt forløb uden unødvendige overraskelser.",
      name: "Kunde (placeholder)",
      city: "København",
      service: "Projekt",
      href: null,
    },
  ],
} as const;

// § 8 — FAQ (9 questions)
export const PRIVATE_FAQ = {
  h2: "Spørgsmål før du går i gang med renoveringen",
  items: [
    {
      q: "Er den første vurdering gratis?",
      a: "Ja. Du sender en kort beskrivelse, og vi vurderer opgaven uforpligtende og gratis.",
    },
    { q: "Hvilke områder dækker I?", a: "København og Storkøbenhavn." },
    {
      q: "Hvordan beregnes den endelige pris?",
      a: "Ud fra opgavens omfang, materialer og adgangsforhold. Du får en fast ramme, før arbejdet går i gang.",
    },
    {
      q: "Kan I klare flere fag i ét projekt?",
      a: "Ja. Vi samler fagene i én plan med én ansvarlig kontakt.",
    },
    {
      q: "Hvem køber og leverer materialerne?",
      a: "Det gør vi som udgangspunkt, medmindre du selv ønsker at levere bestemte materialer.",
    },
    {
      q: "Hvor hurtigt kan I gå i gang?",
      a: "Det afhænger af omfang og sæson. Vi giver en realistisk opstartsdato sammen med tilbuddet.",
    },
    {
      q: "Rydder I op og fjerner byggeaffald?",
      a: "Ja. Oprydning og bortskaffelse er en del af planen.",
    },
    {
      q: "Hvordan godkendes ændringer undervejs?",
      a: "Ændringer aftales med dig — både omfang og pris — før de udføres.",
    },
    {
      q: "Hvad sker der, hvis der findes fejl efter aflevering?",
      a: "Kontakt os, så udbedrer vi fejl, der skyldes udførelsen.",
    },
  ],
} as const;

// § 9 — Final CTA (phone comes from CMS siteSettings via CtaBand)
export const PRIVATE_CTA = {
  h2: "Fortæl os om dit projekt",
  text: "Send en kort beskrivelse og et par billeder. Vi vurderer projektet og kontakter dig inden 24 timer.",
  primary: { label: "Få en projektvurdering", href: "/kontakt" },
  crosslinks: [],
  // Figma 3067:369
  image: {
    src: "/images/cases/cta-private.jpg",
    alt: "Anlægsgartner i færd med havearbejde ved plæne og staudebed",
  },
} as const;
