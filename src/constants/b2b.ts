/** /entreprenorer — copy per Contractors.md (DA). B2B landing.
 *  Order: hero → formats → services → capabilities → projects → process → CTA.
 *  No testimonials by design — the authentic ARC Amager case carries the proof. */

export const B2B_META = {
  title: "Underentreprenør for entreprenører — stabilt team i København",
  description:
    "Grønt Land DK indgår som underentreprenør eller holdforstærkning på byggeprojekter i Storkøbenhavn. Fast kontaktperson, løbende status og dokumenteret aflevering.",
} as const;

export const B2B_HERO = {
  label: "For entreprenører",
  h1: "Underentreprenør for entreprenører i København",
  sub: "Grønt Land DK støtter entreprenører og projektledere med ekstra byggehold, afgrænsede arbejdspakker og koordinerede løsninger på tværs af fag i København og Storkøbenhavn.",
  ctas: [
    { label: "Tjek holdets tilgængelighed", modal: true },
    { label: "Se underentreprise-projekter", href: "#projekter", variant: "leaf" },
  ],
  trustChips: [
    "Svar inden for 24 timer",
    "København og Storkøbenhavn",
    "Én operationel kontakt",
    "Ugentlige statusopdateringer",
  ],
  image: { src: "/images/cases/fundament-b2b.png", alt: "Armeret fundament klargjort til støbning på byggeplads" },
} as const;

export const B2B_SCENARIOS = {
  h2: "Fleksibel underentreprise og holdforstærkning",
  intro:
    "Vi kan forstærke jeres eksisterende hold, tage ansvar for en afgrænset underentreprise-pakke eller koordinere flere fag under én operationel kontakt.",
  items: [
    {
      title: "Holdforstærkning",
      desc: "Ekstra faglærte hold i spidsbelastning eller i en kritisk fase af projektet — uden at I skal rekruttere.",
    },
    {
      title: "Afgrænset underentreprise-pakke",
      desc: "Et aftalt arbejdsomfang med tydelige ansvarsgrænser og klare krav til aflevering.",
    },
    {
      title: "Underentreprise på tværs af fag",
      desc: "Flere fagområder samlet under én fælles plan og én ansvarlig kontakt.",
    },
  ],
} as const;

export const B2B_SERVICES = {
  h2: "Byggefag og underentreprise-ydelser",
  sub: "Brug Grønt Land DK til et enkelt byggefag — eller kombinér flere fag i én koordineret underentreprise-pakke.",
} as const;

export const B2B_WHY = {
  h2: "Pålidelig kapacitet og koordinering",
  intro:
    "Holdets størrelse tilpasses projektets fase og planlagte milepæle. Arbejdet styres med ugentlige produktionsmål, løbende statusopdateringer og dokumenteret kvalitetssikring.",
  items: [
    { title: "Skalerbare byggehold", desc: "Bemandingen tilpasses projektets fase og milepæle." },
    { title: "Kontakt med beslutningskraft", desc: "Én ansvarlig, der kan træffe beslutninger i driften." },
    { title: "Ugentlige status- og risikoopdateringer", desc: "Fremdrift og risici meldes i fast rytme." },
    { title: "Dokumenteret kvalitetssikring", desc: "KS og fotodokumentation som en del af udførelsen." },
    { title: "Hurtig håndtering af afvigelser", desc: "Afvigelser meldes og håndteres hurtigt." },
    { title: "Stabilt hold hele vejen", desc: "Et stabilt hold gennem hele projektet." },
  ],
  image: {
    src: "/images/cases/kapacitet-b2b.jpg",
    alt: "Anlagt bed med stauder og buske langs en flisebelagt gangsti",
  },
} as const;

export const B2B_PROJECTS = {
  h2: "Underentreprise-projekter i København",
  sub: "Se, hvordan Grønt Land DK støtter entreprenører med belægning, dræn, bundopbygning, ekstra byggekapacitet og koordinerede arbejdspakker.",
  // Selection is dynamic (b2b first, then newest others → 4). Slugs are a seed hint.
  slugs: [
    "belaegning-arc-amager",
    "totalrenovering-skodsborg",
    "belaegning-ved-bolig",
    "betontrappe-hellerup",
  ],
  ctas: [
    { label: "Se ARC-projektet", href: "/projekter/belaegning-arc-amager" },
    { label: "Se alle projekter", href: "/projekter" },
  ],
} as const;

export const B2B_MODEL = {
  h2: "Sådan foregår vores underentreprise-samarbejde",
  steps: [
    { title: "Afklaring af omfang", desc: "Vi modtager arbejdsomfang, tegninger, kvalitetskrav og nødvendige tidsfrister." },
    { title: "Hold- og produktionsplan", desc: "Vi fastlægger holdets sammensætning, ansvarsområder og en ugentlig plan." },
    {
      title: "Udførelse og statusrapportering",
      desc: "Vi udfører arbejdet, kontrollerer kvaliteten og rapporterer løbende om fremdrift og risici.",
    },
    { title: "Gennemgang og aflevering", desc: "Vi gennemgår resultatet, udbedrer mangler og overdrager den nødvendige dokumentation." },
  ],
} as const;

export const B2B_CTA = {
  h2: "Tjek holdets tilgængelighed i København",
  text: "Send os projektets placering, de nødvendige fag, omfanget og den ønskede startdato. Vi gennemgår oplysningerne og svarer inden for 24 timer.",
  primary: { label: "Tjek tilgængelighed" },
  image: {
    src: "/images/cases/belaegning-kyst.jpg",
    alt: "Belægning og afvanding under udførelse ved et kystnært byggeprojekt",
  },
  crosslinks: [{ label: "Privat boligejer? Se løsninger for private", href: "/private" }],
} as const;
