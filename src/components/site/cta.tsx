import type { SiteContent } from "@/lib/site/content";
import { WindowFrame } from "./window-frame";

export function Cta({ cta }: { cta: SiteContent["cta"] }) {
  return (
    <section>
      <WindowFrame title="YENI-LAYIHE.EXE">
        <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-[1.4fr_auto] lg:items-end">
          <div>
            <p className="font-pixel text-xl text-amber">{cta.kicker}</p>
            <h2 className="mt-1 font-pixel text-4xl leading-tight text-balance text-cream sm:text-6xl">{cta.title}</h2>
            <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-pretty text-cream">{cta.text}</p>
          </div>
          <a href="#elaqe" data-tone="amber" className="win-btn">
            {cta.button}
          </a>
        </div>
      </WindowFrame>
    </section>
  );
}