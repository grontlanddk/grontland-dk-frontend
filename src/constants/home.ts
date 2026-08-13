/**
 * Home-page copy — Danish, verbatim from the Figma "Главная2" (#1018:77) design
 * and the PDF spec. Images point at /public/images placeholders until the real
 * assets are exported. Section ORDER (per Структура главной страницы.md):
 *   Hero → Services → Audiences → OneTeam → Process → Projects
 */

export const NAV_MENU = [
  { label: "Forside", href: "/" },
  { label: "Private kunder", href: "/private" },
  { label: "Entreprenører", href: "/entreprenorer" },
  { label: "Projekter", href: "/projekter" },
  { label: "Galleri", href: "/galleri" },
  { label: "Om os", href: "/om-os" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

// Client taxonomy (2026-07): facade work is grouped under murerarbejde
// (masonry/brick), and cleaning work (rengøring) is added for private homes.
export const SERVICES_MENU = [
  { label: "Havearbejde", href: "/ydelser/havearbejde" },
  { label: "Belægningsarbejde", href: "/ydelser/belaegningsarbejde" },
  { label: "Murerarbejde", href: "/ydelser/murerarbejde" },
  { label: "Malerservice", href: "/ydelser/malerservice" },
  { label: "Tømrerarbejde", href: "/ydelser/tomrerarbejde" },
  { label: "Totalentreprise", href: "/ydelser/totalentreprise" },
  { label: "Demonteringsarbejde", href: "/ydelser/demonteringsarbejde" },
  { label: "Rengøringsarbejde", href: "/ydelser/rengoringsarbejde" },
] as const;

/* Footer — Figma #3032:171. Services list is footer-only (Facadearbejde → murer). */
export const FOOTER = {
  blurb: "Renovering og byggeopgaver i København",
  menuTitle: "Menu",
  servicesTitle: "Ydelser",
  contactTitle: "Kontakt",
  contact: ["København og Storkøbenhavn", "CVR 45514374"] as const,
  copyright: "© Grønt Land DK",
  credit: {
    by: "Created by",
    name: "Code-site.art",
    href: "https://code-site.art",
  },
  menu: [
    { label: "Forside", href: "/" },
    { label: "Ydelser", href: "/ydelser" },
    { label: "Private kunder", href: "/private" },
    { label: "Entreprenører", href: "/entreprenorer" },
    { label: "Projekter", href: "/projekter" },
    { label: "Galleri", href: "/galleri" },
    { label: "Om os", href: "/om-os" },
    { label: "Kontakt", href: "/kontakt" },
  ] as const,
  // Mirrors SERVICES_MENU (facade folded under murer, so no separate row).
  services: [
    { label: "Havearbejde", href: "/ydelser/havearbejde" },
    { label: "Belægningsarbejde", href: "/ydelser/belaegningsarbejde" },
    { label: "Murerarbejde", href: "/ydelser/murerarbejde" },
    { label: "Malerservice", href: "/ydelser/malerservice" },
    { label: "Tømrerarbejde", href: "/ydelser/tomrerarbejde" },
    { label: "Totalentreprise", href: "/ydelser/totalentreprise" },
    { label: "Demonteringsarbejde", href: "/ydelser/demonteringsarbejde" },
    { label: "Rengøringsarbejde", href: "/ydelser/rengoringsarbejde" },
  ] as const,
} as const;

export const HERO = {
  h1: "Renoverings- og byggefirma i København",
  sub: "Grønt Land DK hjælper private boligejere og entreprenører med renovering, facadearbejde, belægning, tømrerarbejde, murerarbejde, malerarbejde og havearbejde i København og Storkøbenhavn.",
  ctaPrimary: { label: "Få et tilbud", href: "/kontakt" },
  ctaSecondary: { label: "Se ydelser", href: "/ydelser" },
  // Large full-bleed image on the right side of the hero.
  image: { src: "/images/hero/hero-main.png", alt: "Anlagt have med stenbed og beplantning" },
  // Bottom-left auto image slider (3 overlapping landscape photos).
  slider: [
    { src: "/images/hero/hero-photo-1.png", alt: "Klippede hække og beplantning i anlagt have" },
    { src: "/images/hero/hero-photo-2.png", alt: "Belægning og haveanlæg ved bolig" },
    { src: "/images/hero/hero-photo-3.png", alt: "Haveområde med beplantning og sten" },
  ],
} as const;

export const AUDIENCES = {
  h2: "Hvem hjælper vi?",
  cards: [
    {
      title: "For private kunder",
      text: "Til boligejere, der har brug for renovering, terrasse, facade, belægning, havearbejde eller andre opgaver omkring boligen.",
      cta: { label: "Se løsninger for private kunder", href: "/private" },
      image: "/images/cases/havearbejde-private.png",
      imageAlt: "Plejet have med græsplæne og beplantning",
      dark: false,
    },
    {
      title: "For entreprenører",
      text: "Til entreprenører og projektledere, der har brug for et stabilt team til delopgaver, ekstra kapacitet eller praktisk udførelse på byggeprojekter.",
      cta: { label: "Se samarbejde for entreprenører", href: "/entreprenorer" },
      image: "/images/cases/fundament-b2b.png",
      imageAlt: "Armeret fundament klargjort til støbning på byggeplads",
      dark: true,
    },
  ],
} as const;

export const ONETEAM = {
  h2: "Flere fag samlet i én plan",
  intro:
    "Når murerarbejde, tømrerarbejde, maling, belægning og udearealer planlægges samlet, bliver processen lettere for kunden. Du får færre kontaktpersoner, mindre koordinering og en tydeligere vej fra start til aflevering.",
  background: {
    src: "/images/cases/oneteam-bg.jpg",
    alt: "Anlagt græsplæne med stenbelægning og beplantning",
  },
  cards: [
    { title: "Én kontaktperson", desc: "Du ved, hvem der har ansvar for projektet." },
    { title: "Mindre koordinering", desc: "Du slipper for at styre flere håndværkere separat." },
    { title: "Samlet tidsplan", desc: "Arbejdet planlægges på tværs af fag fra starten." },
    { title: "Bedre aflevering", desc: "Fagene arbejder efter samme standard og samme mål." },
  ],
} as const;

// Full service set. Facade work is folded into Murerarbejde, and
// Rengøringsarbejde (cleaning, private homes) is added — per client.
// Some card images are reused where a dedicated Figma asset doesn't exist.
export const SERVICES = {
  h2: "Vores ydelser",
  sub: "Vi udfører både indvendige og udvendige opgaver - fra havearbejde og belægning til facade, maling, tømrerarbejde, murerarbejde og totalentreprise.",
  cta: { label: "Se alle ydelser", href: "/ydelser" },
  // Card items come from CMS service docs (getServiceCards).
} as const;

/* Project cases live in constants/projects.ts (listing + detail + home cards). */

export const PROCESS = {
  h2: "Sådan foregår arbejdet",
  cta: { label: "Start med en kort besked", href: "/kontakt" },
  steps: [
    {
      title: "Du sender en forespørgsel",
      desc: "Du beskriver opgaven, lokationen og kan sende billeder, hvis det er relevant.",
    },
    {
      title: "Vi vurderer opgaven",
      desc: "Vi afklarer omfang, materialer, adgang, tidsramme og nødvendige fag.",
    },
    {
      title: "Du får et tilbud",
      desc: "Du får et tydeligt tilbud med pris, omfang, proces og næste skridt.",
    },
    {
      title: "Vi udfører arbejdet",
      desc: "Teamet arbejder efter den aftalte plan med løbende kommunikation.",
    },
    {
      title: "Vi afleverer projektet",
      desc: "Vi gennemgår det færdige arbejde sammen inden aflevering.",
    },
  ],
} as const;

export const MARQUEE_WORDS = [
  "GRØNT LAND DK",
  "RENOVERING",
  "BYGGEARBEJDE",
  "KØBENHAVN",
] as const;

// Photo archive → links to the standalone /galleri page. Photos + filter
// taxonomy come from CMS galleryCategory docs (see lib/sanity/queries).
export const GALLERY = {
  h2: "Galleri fra udførte opgaver",
  sub: "Se billeder fra facade, belægning, renovering, havearbejde, tømrerarbejde og andre opgaver.",
  cta: { label: "Åbn galleri", href: "/galleri" },
} as const;

export const ABOUT = {
  h2: "Om Grønt Land DK",
  text: "Grønt Land DK arbejder med renovering, byggeopgaver og udearealer i København og Storkøbenhavn. Teamet samler flere fag under én plan, så kunden får en mere enkel proces, tydeligere ansvar og bedre sammenhæng fra start til aflevering.",
  facts: [
    { label: "Arbejdsområde", value: "København og Storkøbenhavn" },
    { label: "Kundetyper", value: "private kunder og entreprenører" },
    { label: "Fokus", value: "renovering, facade, belægning, havearbejde og totalentreprise" },
    { label: "Princip", value: "klare aftaler og ordentlig aflevering" },
  ],
  team: {
    h3: "Et team med ansvar på pladsen",
    text: "Hos Grønt Land DK møder du fagpersoner, der forstår både planlægning og praktisk udførelse. Teamet dækker flere fagområder og arbejder efter en samlet plan.",
    trades: ["Murerarbejde", "Tømrerarbejde", "Malerarbejde", "Belægning", "Havearbejde"],
  },
  cta: { label: "Læs mere om os", href: "/om-os" },
  image: "/images/cases/projekt-terrasse.png",
  imageAlt: "Bærende konstruktion til træterrasse under opbygning",
} as const;

// Short, natural SEO block placed just before the FAQ (per PDF spec: ~120-180
// words, not a separate SEO wall).
export const SEOTEXT = {
  h2: "Renovering for boligejere og entreprenører",
  text: "Grønt Land DK er en entreprenørvirksomhed, der udfører renovering og byggeopgaver i København og Storkøbenhavn — for både private boligejere og entreprenører. Vi arbejder med havearbejde, belægningsarbejde, facadearbejde, malerservice, tømrerarbejde, murerarbejde, demonteringsarbejde, rengøringsarbejde og totalentreprise, hvor flere fag samles i én plan med én ansvarlig kontakt. Uanset om opgaven er en ny terrasse, en renoveret facade, ny belægning i indkørslen eller en samlet renovering af boligen, planlægger vi arbejdet fra start til aflevering med en tydelig tidsramme og en klar aftale. Entreprenører bruger os som et stabilt team til delopgaver og ekstra kapacitet på byggeprojekter. Send en kort beskrivelse af din opgave — så vurderer vi den og vender tilbage med næste skridt.",
  image: "/images/cases/havearbejde-private.png",
  imageAlt: "Plejet have med græsplæne og beplantning",
} as const;

export const FAQ = {
  h2: "Ofte stillede spørgsmål",
  items: [
    {
      q: "Arbejder I både for private og entreprenører?",
      a: "Ja, Grønt Land DK hjælper både private boligejere og entreprenører med renovering, byggeopgaver og udearealer.",
    },
    { q: "Hvilke områder dækker I?", a: "Vi arbejder i København og Storkøbenhavn." },
    {
      q: "Hvilke typer arbejde udfører I?",
      a: "Vi udfører blandt andet havearbejde, belægningsarbejde, facadearbejde, malerservice, tømrerarbejde, murerarbejde, demonteringsarbejde, rengøringsarbejde og totalentreprise.",
    },
    {
      q: "Kan I håndtere flere fag i samme projekt?",
      a: "Ja, flere fag kan samles i én plan, så processen bliver lettere at styre for kunden.",
    },
    {
      q: "Hvordan får jeg et tilbud?",
      a: "Send en kort beskrivelse af opgaven. Hvis det er relevant, kan du også sende billeder. Herefter vurderer vi opgaven og vender tilbage med næste skridt.",
    },
    {
      q: "Kan I hjælpe som samarbejdspartner for entreprenører?",
      a: "Ja, Grønt Land DK kan hjælpe entreprenører med delopgaver, ekstra kapacitet og praktisk udførelse på byggeprojekter.",
    },
  ],
} as const;

// Final lead form. View-only shell (no submit handling yet), same as the other
// SHELL sections; fields match the PDF spec.
export const QUOTE_FORM = {
  h2: "Få et tilbud på dit projekt",
  h2Lines: ["Få et tilbud på dit", "projekt"] as const,
  sub: "Send en kort beskrivelse af opgaven, så vender vi tilbage med næste skridt.",
  fields: { name: "Navn", phone: "Telefon", email: "E-mail" },
  whoLabel: "Jeg er:",
  whoOptions: ["Privatkunde", "Entreprenør / virksomhed"],
  taskLabel: "Hvilken type opgave?",
  taskPlaceholder: "Vælg opgavetype",
  taskOptions: [
    "Havearbejde",
    "Belægningsarbejde",
    "Facadearbejde",
    "Malerservice",
    "Tømrerarbejde",
    "Murerarbejde",
    "Demonteringsarbejde",
    "Rengøringsarbejde",
    "Totalentreprise",
    "Andet",
  ],
  message: "Besked",
  upload: "Upload billeder",
  uploadHint: "Træk billeder hertil, eller klik for at vælge",
  uploadTooMany: "Højst 5 billeder.",
  uploadTooLarge: "Hvert billede skal være under 2 MB.",
  uploadTotalTooLarge: "Billederne er for store samlet (maks. 4 MB).",
  uploadBadType: "Kun JPEG, PNG og WebP — ikke HEIC eller PDF.",
  button: "Send forespørgsel",
  sending: "Sender…",
  successTitle: "Tak — vi har modtaget din forespørgsel",
  successBody: "Vi vender tilbage med en klar næste handling inden 24 timer.",
  errorGeneric:
    "Noget gik galt. Prøv igen, eller ring 91 70 01 03 / skriv til grontlanddk@gmail.com.",
  errorUnavailable:
    "Forespørgslen kan ikke sendes lige nu. Ring 91 70 01 03, eller skriv til grontlanddk@gmail.com.",
  micro: "Vi vender tilbage med en klar næste handling.",
  cta: { label: "Kontakt os" },
  image: "/images/cases/quote-cta-band.jpg",
  imageAlt: "Nybelagte betontrin foran bolig med hvid balustrade",
  reassurance: [
    { label: "Svartid", value: "Inden 24 timer" },
    { label: "Område", value: "København og Storkøbenhavn" },
    { label: "CVR", value: "45514374" },
  ],
} as const;
