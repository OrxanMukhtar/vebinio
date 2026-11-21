import { PixelIcon } from "./pixel-icon";
import { SectionHeading } from "./section-heading";

const SERVICES = [
  {
    file: "WEB.EXE",
    title: "Veb-saytlar və tətbiqlər",
    text: "Biznesiniz üçün müasir, sürətli, mobil uyğun və funksional veb-saytlar və veb tətbiqlər hazırlayırıq.",
    icon: "code" as const,
  },
  {
    file: "BREND.EXE",
    title: "Brendinq və dizayn",
    text: "Brendinizin vizual kimliyini, loqosunu, qrafik dizaynını və istifadəçi təcrübəsini formalaşdırırıq.",
    icon: "layers" as const,
  },
  {
    file: "AI.EXE",
    title: "AI və avtomatlaşdırma",
    text: "Süni intellekt və avtomatlaşdırma həlləri ilə gündəlik iş proseslərini daha səmərəli edirik.",
    icon: "chip" as const,
  },
  {
    file: "MEHSUL.EXE",
    title: "Rəqəmsal məhsullar",
    text: "Biznes ideyaları üçün xüsusi platformalar, sistemlər və rəqəmsal məhsullar yaradırıq.",
    icon: "app" as const,
  },
];

export function Services() {
  return (
    <section id="xidmetler">
      <SectionHeading
        file="XIDMETLER.EXE"
        title="Nə edə bilərik?"
        text="İdeyadan dizayna, dizayndan işlək rəqəmsal məhsula qədər."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {SERVICES.map((service) => (
          <article
            key={service.file}
            className="win-dark flex flex-col transition-transform duration-150 ease-out hover:-translate-y-0.5"
          >
            <div className="win-title-dark flex items-center gap-2 px-2">
              <PixelIcon name={service.icon} className="size-5" />
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
