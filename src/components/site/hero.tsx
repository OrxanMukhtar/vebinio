import type { SiteContent } from "@/lib/site/content";
import { Mark } from "./logo";
import { PixelIcon } from "./pixel-icon";
import { WindowFrame } from "./window-frame";

export function Hero({ hero, nav }: { hero: SiteContent["hero"]; nav: SiteContent["nav"] }) {
  const shortcuts = [
    { id: "xidmetler", label: nav.xidmetler, icon: "monitor" as const },
    { id: "layiheler", label: nav.layiheler, icon: "folder" as const },
    { id: "elaqe", label: nav.elaqe, icon: "mail" as const },
  ];

  return (
    <section id="ana">
      <WindowFrame title="VEBINIO — Digital Creative Studio" status="Hazır">
        <div className="grid items-center gap-6 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div>
            <p className="font-pixel text-xl tracking-wide text-amber">{hero.kicker}</p>
            <h1 className="mt-2 font-pixel text-5xl leading-tight text-balance text-cream sm:text-6xl">
              {hero.line1}
              <br />
              <span className="text-amber">{hero.highlight}</span>
              <br />
              {hero.line3}
            </h1>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-pretty text-cream">{hero.support}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#xidmetler" data-tone="amber" className="win-btn">
                {hero.primary}
              </a>
              <a href="#elaqe" className="win-btn">
                {hero.secondary}
              </a>
            </div>
          </div>
          <div className="win-in bg-ink p-3 sm:p-4">
            <div className="grid grid-cols-3 gap-2">
              {shortcuts.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex flex-col items-center gap-1 px-1 py-2 text-center"
                >
                  <PixelIcon name={item.icon} className="size-8" />
                  <span className="font-pixel text-lg leading-none text-cream">{item.label}</span>
                </a>
              ))}
            </div>
            <div className="mx-auto mt-2 w-full max-w-xs">
              <Mark size="lg" alt="VEBINIO loqosu" />
            </div>
            <div className="win-light mt-3">
              <div className="win-title-light flex items-center gap-2 px-2">
                <PixelIcon name="note" className="size-4 text-cream" />
                <p className="font-ui text-xs font-bold">QEYD.TXT</p>
              </div>
              <p className="px-3 py-2 font-ui text-sm leading-snug text-navy">
                {hero.note}
              </p>
            </div>
          </div>
        </div>
      </WindowFrame>
    </section>
  );
}
