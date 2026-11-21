import type { SiteContent } from "@/lib/site/content";
import { SectionHeading } from "./section-heading";
import { WindowFrame } from "./window-frame";

export function About({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="haqqimizda">
      <SectionHeading file={about.file} title={about.title} />
      <WindowFrame title="VEBINIO.TXT" tone="light" status="3 sətir  ·  yalnız oxu">
        <div className="space-y-3 p-4 font-sans text-sm leading-relaxed text-pretty text-navy sm:p-5 sm:text-base">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </WindowFrame>
    </section>
  );
}