import { Fragment } from "react";

import { Heading, Star, SafeImage } from "@/components/ui";
import { OpenQuoteButton } from "@/components/quote";
import { homeCopy } from "@/lib/i18n/copy";

/* Quote CTA band — Figma #3023:1045 (1920×737 at x=-261 on 1280 artboard).
   Desktop coords use artboard crop: viewportX = sectionLocalX - 261.
   Copy #3023:1070, photo #3023:1069, ring decor #3023:1046. */
export async function QuoteCta() {
  const QUOTE_FORM = homeCopy().QUOTE_FORM;
  return (
    <section className="relative overflow-hidden bg-black text-white xl:min-h-[737px]">
      {/* Ring decor #3023:1046 — 1920 MCP inset mapped to 1280 crop (offset 261) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[343px] top-[238px] z-0 hidden h-[465px] w-[495px] xl:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/svg/decor-rings-quote.svg"
          alt=""
          className="size-full max-w-none origin-center rotate-[117.04deg] opacity-90"
        />
      </div>

      {/* Photo #3023:1069 — section x=846 → artboard left 585; bleeds to right edge */}
      <div className="absolute left-[585px] right-0 top-0 z-10 hidden min-h-[737px] overflow-hidden xl:block">
        <SafeImage
          src={QUOTE_FORM.image}
          alt={QUOTE_FORM.imageAlt}
          fill
          sizes="55vw"
          className="object-cover"
        />
      </div>

      {/* Copy #3023:1070 — section x=320 → artboard left 59; top 96; width 448 */}
      <div className="relative z-20 px-6 py-14 xl:absolute xl:left-[59px] xl:top-[96px] xl:w-[448px] xl:p-0">
        <div className="flex flex-col gap-11">
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-[19px]">
              <Heading
                as="h2"
                size="card"
                className="text-[28px] leading-none text-white xl:text-[44px] xl:leading-[44px]"
              >
                {/* The joining " " keeps the accessible name / textContent
                    readable ("…for your project", not "…foryour project");
                    it collapses visually between the block spans. */}
                {QUOTE_FORM.h2Lines.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && " "}
                    <span className="block">{line}</span>
                  </Fragment>
                ))}
              </Heading>
              <p className="max-w-[358px] font-light leading-[22.95px] text-white/75 xl:text-[17px]">
                {QUOTE_FORM.sub}
              </p>
            </div>
            <OpenQuoteButton variant="white" size="md" className="w-full sm:w-[250px]">
              {QUOTE_FORM.cta.label}
            </OpenQuoteButton>
          </div>

          <ul className="flex flex-col gap-3">
            {QUOTE_FORM.reassurance.map((item) => (
              <li key={item.label}>
                <div className="relative flex items-center gap-5 overflow-hidden rounded-xl px-[18px] py-6 backdrop-blur-[13px]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl bg-white/25 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)]"
                  />
                  <Star variant="leaf" className="relative z-10 size-10" />
                  <p className="relative z-10 text-xs font-semibold uppercase leading-[15px] text-white">
                    {item.label}: {item.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-6 mb-6 h-[280px] overflow-hidden rounded-xl xl:hidden">
        <SafeImage
          src={QUOTE_FORM.image}
          alt={QUOTE_FORM.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
