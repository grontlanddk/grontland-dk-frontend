import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";

import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/sanity/queries";
import { localBusiness } from "@/lib/seo/jsonld";
import { OG_IMAGE, SITE_META, SITE_URL } from "@/lib/seo/meta";

// Manrope — body + display headings (300–800 covers Light…Bold used in the design).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

// Montserrat — stat / label / chip typography.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const m = SITE_META.da;
  // No alternates here: canonical/hreflang are per-page (home sets its own;
  // subpage hreflang comes from sitemap.ts — a layout-wide set would wrongly
  // point every subpage at "/" and conflict with the sitemap's pairs).
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    openGraph: {
      type: "website",
      siteName: "Grønt Land DK",
      title: m.title,
      description: m.description,
      locale: "da_DK",
      images: [{ ...OG_IMAGE, alt: m.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="da"
      className={`${manrope.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-pine">
        <JsonLd data={localBusiness(settings)} />
        {children}
      </body>
    </html>
  );
}
