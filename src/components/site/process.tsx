import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/site/content";
import { SectionHeading } from "./section-heading";
import { WindowFrame } from "./window-frame";

export function Process({ process }: { process: SiteContent["process"] }) {
  const [step, setStep] = useState(1);
  const rootRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    if (reduce) {
      setStep(4);
      played.current = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || played.current) return;
        played.current = true;
        let current = 1;
        setStep(1);
        timer = window.setInterval(() => {
          current += 1;
          setStep(current);
          if (current >= 4) window.clearInterval(timer);
        }, 420);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const filled = step * 4;

  return (
    <section id="proses" ref={rootRef}>
      <SectionHeading file={process.file} title={process.title} />
      <WindowFrame title="SETUP.EXE" status={`${step} / 4 addım`}>
        <div className="space-y-4 p-4">
          <div className="progress-seg" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
              <span key={index} className={index < filled ? "bg-amber" : "bg-surface"} />
            ))}
          </div>
          <ol className="grid gap-2 sm:grid-cols-2">
            {process.steps.map((item, index) => {
              const active = index < step;
              return (
                <li key={item.n}>
                  <button
                    type="button"
                    data-active={active ? "true" : "false"}
                    data-tone={active ? "amber" : "grey"}
                    className="win-btn is-block h-auto"
                    onClick={() => setStep(index + 1)}
                  >
                    <span className="block w-full">
                      <span className="font-pixel text-2xl leading-none">{item.n}</span>
                      <span className="mt-1 block font-ui text-sm font-bold">{item.title}</span>
                      <span className="mt-1 block font-sans text-xs font-normal leading-relaxed">{item.text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </WindowFrame>
    </section>
  );
}
