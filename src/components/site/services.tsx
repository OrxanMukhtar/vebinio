import type { SiteContent } from "@/lib/site/content";
import { PixelIcon } from "./pixel-icon";
import { SectionHeading } from "./section-heading";

const ICONS = ["code", "layers", "chip", "app"] as const;

export function Services({ services }: { services: SiteContent["services"] }) {
  return (
    <section id="xidmetler">
      <SectionHeading file={services.file} title={services.title} text={services.text} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {services.items.map((service, index) => (
          <article
            key={service.file}
            className="win-dark flex flex-col transition-transform duration-150 ease-out hover:-translate-y-0.5"
          >
            <div className="win-title-dark flex items-center gap-2 px-2">
              <PixelIcon name={ICONS[index]} className="size-5" />
              <p className="font-ui text-xs font-bold">{service.file}</p>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3">
              <h3 className="font-pixel text-2xl leading-tight text-cream">{service.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-pretty text-grey">{service.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}