import { getSocialLinks } from "@/lib/contact";
import { Wordmark } from "./logo";

const LINKS = [
  { id: "ana", label: "Ana səhifə" },
  { id: "xidmetler", label: "Xidmətlər" },
  { id: "layiheler", label: "Layihələr" },
  { id: "haqqimizda", label: "Haqqımızda" },
  { id: "elaqe", label: "Əlaqə" },
];

export function Footer() {
  const socials = getSocialLinks();
  return (
    <footer className="mx-auto mt-14 w-full max-w-6xl px-4 pb-8 sm:px-6">
      <div className="win-dark">
        <div className="win-title-dark flex items-center gap-2 px-2">
          <p className="font-ui text-xs font-bold">VEBINIO</p>
        </div>
        <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-[minmax(0,16rem)_1fr] lg:items-center">
          <Wordmark className="max-w-xs" />
          <div>
            <p className="font-pixel text-2xl text-amber">DIGITAL CREATIVE STUDIO</p>
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label="Alt">
              {LINKS.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="font-ui text-sm text-cream underline-offset-2 hover:text-amber hover:underline">
                  {link.label}
                </a>
              ))}
            </nav>
            {socials.length > 0 ? (
              <nav className="mt-3 flex flex-wrap gap-3" aria-label="Sosial">
                {socials.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-ui text-sm text-amber underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            ) : null}
            <p className="mt-4 font-ui text-xs text-grey">© 2026 VEBINIO. Bütün hüquqlar qorunur.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
