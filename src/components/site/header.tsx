import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site/content";
import { Mark } from "./logo";

const NAV_IDS = ["ana", "xidmetler", "layiheler", "haqqimizda", "elaqe"] as const;

export function Header({ nav }: { nav: SiteContent["nav"] }) {
  const links = NAV_IDS.map((id) => ({ id, label: nav[id] }));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("ana");

  useEffect(() => {
    const onScroll = () => {
      const line = 104;
      let current: (typeof NAV_IDS)[number] = "ana";
      for (const id of NAV_IDS) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-4">
      <a className="skip win-btn" href="#ana">
        Məzmuna keç
      </a>
      <div className="header-bar win-light relative mx-auto max-w-6xl">
        <div className="flex flex-nowrap items-center gap-1 px-2 py-1.5">
          <a href="#ana" className="mr-auto flex min-w-0 items-center gap-2">
            <span className="win-in grid size-11 shrink-0 place-items-center bg-navy p-1">
              <Mark className="max-h-8" />
            </span>
            <span className="leading-none">
              <span className="block font-ui text-base font-bold tracking-tight text-navy">VEBINIO</span>
              <span className="block font-pixel text-lg leading-none text-ink">VEBINIO.EXE</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Əsas">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-active={active === link.id ? "true" : "false"}
                data-tone={active === link.id ? "amber" : "grey"}
                className="win-btn"
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a href="#elaqe" data-tone="amber" className="win-btn shrink-0">
            {nav.cta}
          </a>
          <button
            type="button"
            className="win-btn shrink-0 lg:hidden"
            aria-expanded={open}
            aria-controls="mobil-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Bağla" : "Menyu"}
          </button>
        </div>
        {open ? (
          <nav
            id="mobil-menu"
            className="win-light absolute inset-x-0 top-full z-20 mt-1 flex flex-col gap-1 p-2 lg:hidden"
            aria-label="Mobil"
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-active={active === link.id ? "true" : "false"}
                data-tone={active === link.id ? "amber" : "grey"}
                className="win-btn"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
