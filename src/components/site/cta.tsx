import { WindowFrame } from "./window-frame";

export function Cta() {
  return (
    <section>
      <WindowFrame title="YENI-LAYIHE.EXE">
        <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-[1.4fr_auto] lg:items-end">
          <div>
            <p className="font-pixel text-xl text-amber">HAZIR</p>
            <h2 className="mt-1 font-pixel text-4xl leading-tight text-balance text-cream sm:text-6xl">
              Yeni layihəyə hazırsınız?
            </h2>
            <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-pretty text-cream">
              İdeyanızı bizimlə paylaşın. Gəlin onu birlikdə reallaşdıraq.
            </p>
          </div>
          <a href="#elaqe" data-tone="amber" className="win-btn">
            Layihəni müzakirə edək
          </a>
        </div>
      </WindowFrame>
    </section>
  );
}
