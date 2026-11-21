import { SectionHeading } from "./section-heading";
import { WindowFrame } from "./window-frame";

export function About() {
  return (
    <section id="haqqimizda">
      <SectionHeading file="HAQQIMIZDA.TXT" title="Biz kimik?" />
      <WindowFrame title="VEBINIO.TXT" tone="light" status="3 sətir  ·  yalnız oxu">
        <div className="space-y-3 p-4 font-sans text-sm leading-relaxed text-pretty text-navy sm:p-5 sm:text-base">
          <p>VEBINIO dizayn və texnologiyanı birləşdirən rəqəmsal kreativ studiyadır.</p>
          <p>
            Biz ideyaları yalnız vizual olaraq gözəl göstərməklə kifayətlənmirik. Onları real istifadə üçün
            nəzərdə tutulmuş, funksional və düşünülmüş rəqəmsal həllərə çeviririk.
          </p>
          <p>Məqsədimiz bizneslərin rəqəmsal dünyada daha güclü görünməsinə və inkişaf etməsinə kömək etməkdir.</p>
        </div>
      </WindowFrame>
    </section>
  );
}
