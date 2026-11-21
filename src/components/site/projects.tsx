import { useCallback, useState } from "react";
import type { SiteContent } from "@/lib/site/content";
import { safeImage } from "@/lib/site/image";
import { Dialog } from "./dialog";
import { SectionHeading } from "./section-heading";

const MOCKS = ["vitrin", "mozaika", "novbe", "katib"] as const;

type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
  image: string;
  mock: (typeof MOCKS)[number];
};

function Mock({ kind }: { kind: Project["mock"] }) {
  if (kind === "vitrin") {
    return (
      <div className="win-in bg-cream p-2 text-navy">
        <div className="mb-2 flex items-center justify-between bg-navy px-2 py-1">
          <span className="font-pixel text-lg text-cream">VITRIN</span>
          <span className="size-2 bg-amber" />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["01", "02", "03"].map((item) => (
            <div key={item} className="bg-panel p-2">
              <div className="mb-2 h-8 bg-surface" />
              <p className="font-ui text-xs font-bold">Məhsul {item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "mozaika") {
    const files = ["nisan.v", "soz.png", "reng.txt", "tipo.set"];
    return (
      <div className="win-in bg-panel p-2 text-navy">
        <p className="mb-1 font-ui text-xs font-bold">C:\MOZAIKA</p>
        <ul>
          {files.map((file) => (
            <li key={file} className="flex items-center gap-2 border-b border-line py-1 font-ui text-sm">
              <span className="size-2 bg-amber" />
              {file}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (kind === "novbe") {
    const rows = [
      ["14", "Qəbul", "Gözləyir"],
      ["15", "Ölçü", "Hazırdır"],
      ["16", "Təhvil", "Növbədə"],
    ];
    return (
      <div className="win-in bg-cream text-navy">
        <div className="grid grid-cols-3 bg-surface px-2 py-1 font-ui text-xs font-bold text-cream">
          <span>No</span>
          <span>İş</span>
          <span>Vəziyyət</span>
        </div>
        {rows.map((row) => (
          <div key={row[0]} className="grid grid-cols-3 border-t border-line px-2 py-1 font-ui text-xs">
            {row.map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="win-in grid gap-2 bg-ink p-2 sm:grid-cols-2">
      <div className="bg-surface p-2">
        <p className="font-ui text-xs text-grey">Mənbə</p>
        <p className="mt-1 font-ui text-xs leading-relaxed text-cream">Uzun qeyd buraya düşür və sətir-sətir oxunur.</p>
      </div>
      <div className="bg-surface p-2">
        <p className="font-ui text-xs text-grey">Xülasə</p>
        <p className="mt-1 font-ui text-xs leading-relaxed text-amber">Qısa iş qeydi.</p>
        <div className="mt-2 h-2 bg-navy">
          <div className="h-2 w-2/3 bg-amber" />
        </div>
      </div>
    </div>
  );
}

export function Projects({ projects }: { projects: SiteContent["projects"] }) {
  const items: Project[] = projects.items.map((item, index) => ({
    id: String(index),
    title: item.title,
    category: item.category,
    summary: item.summary,
    detail: item.detail,
    image: safeImage(item.image) ?? "",
    mock: MOCKS[index % MOCKS.length],
  }));
  const [openId, setOpenId] = useState<string | null>(null);
  const project = items.find((item) => item.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  return (
    <section id="layiheler">
      <SectionHeading file={projects.file} title={projects.title} text={projects.text} />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="win-dark flex flex-col">
            <div className="win-title-dark flex items-center gap-2 px-2">
              <p className="font-pixel text-lg text-amber">KONSEPT</p>
              <p className="ml-auto font-ui text-xs">{item.category}</p>
            </div>
            <div className="p-3">
              {item.image ? (
                <img src={item.image} alt="" className="win-in max-h-52 w-full object-cover" />
              ) : (
                <Mock kind={item.mock} />
              )}
              <h3 className="mt-3 font-pixel text-3xl leading-tight text-cream">{item.title}</h3>
              <p className="mt-1 font-sans text-sm leading-relaxed text-pretty text-grey">{item.summary}</p>
              <button type="button" className="win-btn mt-3" onClick={() => setOpenId(item.id)}>
                Layihəyə bax
              </button>
            </div>
          </article>
        ))}
      </div>
      <Dialog open={Boolean(project)} title={project ? `${project.title} — Konsept layihə` : "Konsept"} onClose={close}>
        {project ? (
          <div className="space-y-3">
            <p className="font-pixel text-2xl text-amber">{project.category}</p>
            {project.image ? (
              <img src={project.image} alt="" className="win-in max-h-64 w-full object-cover" />
            ) : (
              <Mock kind={project.mock} />
            )}
            <p className="font-sans text-sm leading-relaxed text-pretty">{project.detail}</p>
            <p className="font-ui text-xs">Demo layihə · real müştəri işi deyil</p>
          </div>
        ) : null}
      </Dialog>
    </section>
  );
}
