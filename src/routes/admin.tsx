import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { WindowFrame } from "@/components/site/window-frame";
import { getAdminSession, saveSiteContent } from "@/lib/site/api";
import { blankProject, blankService, MAX_CARDS, pingContent, type SiteContent } from "@/lib/site/content";
import { fileToImage, safeImage } from "@/lib/site/image";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "VEBINIO — İdarə" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Field = { path: string; label: string; long?: boolean };

const GROUPS: Array<{ title: string; fields: Field[] }> = [
  {
    title: "Naviqasiya",
    fields: [
      { path: "nav.ana", label: "Ana səhifə" },
      { path: "nav.xidmetler", label: "Xidmətlər" },
      { path: "nav.layiheler", label: "Layihələr" },
      { path: "nav.haqqimizda", label: "Haqqımızda" },
      { path: "nav.elaqe", label: "Əlaqə" },
      { path: "nav.cta", label: "Əsas düymə" },
    ],
  },
  {
    title: "Hero",
    fields: [
      { path: "hero.kicker", label: "Üst sətir" },
      { path: "hero.line1", label: "Başlıq 1" },
      { path: "hero.highlight", label: "Vurğulanan sözlər" },
      { path: "hero.line3", label: "Başlıq 3" },
      { path: "hero.support", label: "Açıqlama", long: true },
      { path: "hero.primary", label: "Əsas düymə" },
      { path: "hero.secondary", label: "İkinci düymə" },
      { path: "hero.note", label: "Qeyd pəncərəsi" },
    ],
  },
  {
    title: "Xidmətlər",
    fields: [
      { path: "services.file", label: "Fayl adı" },
      { path: "services.title", label: "Başlıq" },
      { path: "services.text", label: "Açıqlama", long: true },
    ],
  },
  {
    title: "Layihələr",
    fields: [
      { path: "projects.file", label: "Fayl adı" },
      { path: "projects.title", label: "Başlıq" },
      { path: "projects.text", label: "Açıqlama", long: true },
    ],
  },
  {
    title: "Haqqımızda",
    fields: [
      { path: "about.file", label: "Fayl adı" },
      { path: "about.title", label: "Başlıq" },
      { path: "about.paragraphs.0", label: "Abzas 1", long: true },
      { path: "about.paragraphs.1", label: "Abzas 2", long: true },
      { path: "about.paragraphs.2", label: "Abzas 3", long: true },
    ],
  },
  {
    title: "Proses",
    fields: [
      { path: "process.file", label: "Fayl adı" },
      { path: "process.title", label: "Başlıq" },
      ...[0, 1, 2, 3].flatMap((index) => [
        { path: `process.steps.${index}.n`, label: `Addım ${index + 1} nömrə` },
        { path: `process.steps.${index}.title`, label: `Addım ${index + 1} ad` },
        { path: `process.steps.${index}.text`, label: `Addım ${index + 1} mətn`, long: true },
      ]),
    ],
  },
  {
    title: "Çağırış və əlaqə",
    fields: [
      { path: "cta.kicker", label: "Çağırış üst sətir" },
      { path: "cta.title", label: "Çağırış başlıq" },
      { path: "cta.text", label: "Çağırış mətn", long: true },
      { path: "cta.button", label: "Çağırış düyməsi" },
      { path: "contact.file", label: "Əlaqə fayl adı" },
      { path: "contact.title", label: "Əlaqə başlıq" },
      { path: "contact.text", label: "Əlaqə açıqlama", long: true },
      ...[0, 1, 2, 3, 4, 5].map((index) => ({
        path: `contact.services.${index}`,
        label: `Xidmət siyahısı ${index + 1}`,
      })),
      { path: "footer.tagline", label: "Alt sətir" },
      { path: "footer.copyright", label: "Müəllif hüququ" },
    ],
  },
];

function readPath(source: SiteContent, path: string): string {
  const value = path.split(".").reduce<unknown>((node, key) => {
    if (node && typeof node === "object") return (node as Record<string, unknown>)[key];
    return undefined;
  }, source);
  return typeof value === "string" ? value : "";
}

function writePath(source: SiteContent, path: string, value: string): SiteContent {
  const next = structuredClone(source);
  const keys = path.split(".");
  let node = next as unknown as Record<string, unknown>;
  for (let index = 0; index < keys.length - 1; index += 1) {
    node = node[keys[index]] as Record<string, unknown>;
  }
  node[keys[keys.length - 1]] = value;
  return next;
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const preview = safeImage(value);
  return (
    <div className="grid gap-2">
      <span className="font-ui text-xs font-bold text-cream">{label}</span>
      {preview ? <img src={preview} alt="" className="win-in max-h-44 w-full object-cover" /> : null}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="win-btn" onClick={() => inputRef.current?.click()}>
          Şəkil seç
        </button>
        {preview ? (
          <button type="button" className="win-btn" onClick={() => onChange("")}>
            Şəkli sil
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          setError("");
          void fileToImage(file)
            .then(onChange)
            .catch(() => setError("Şəkil açılmadı və ya çox böyükdür. JPG, PNG və ya WEBP seçin."));
        }}
      />
      {error ? <p className="font-sans text-sm text-amber">{error}</p> : null}
    </div>
  );
}

function ServiceList({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const items = draft.services.items;
  function update(index: number, key: "file" | "title" | "text", value: string) {
    setDraft({
      ...draft,
      services: {
        ...draft.services,
        items: items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)),
      },
    });
  }
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={index} className="win-in grid gap-2 p-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs font-bold text-cream">Kart {index + 1}</p>
            <button
              type="button"
              className="win-btn disabled:opacity-40"
              disabled={items.length <= 1}
              onClick={() =>
                setDraft({
                  ...draft,
                  services: { ...draft.services, items: items.filter((_, itemIndex) => itemIndex !== index) },
                })
              }
            >
              Sil
            </button>
          </div>
          <label className="grid gap-1 font-ui text-xs font-bold text-cream">
            Fayl
            <input className="win-field font-sans text-sm font-normal" value={item.file} onChange={(event) => update(index, "file", event.target.value)} />
          </label>
          <label className="grid gap-1 font-ui text-xs font-bold text-cream">
            Başlıq
            <input className="win-field font-sans text-sm font-normal" value={item.title} onChange={(event) => update(index, "title", event.target.value)} />
          </label>
          <label className="grid gap-1 font-ui text-xs font-bold text-cream">
            Mətn
            <textarea className="win-field min-h-20 font-sans text-sm font-normal" value={item.text} onChange={(event) => update(index, "text", event.target.value)} />
          </label>
        </div>
      ))}
      <button
        type="button"
        data-tone="amber"
        className="win-btn disabled:opacity-40"
        disabled={items.length >= MAX_CARDS}
        onClick={() => setDraft({ ...draft, services: { ...draft.services, items: [...items, blankService()] } })}
      >
        Kart əlavə et
      </button>
    </div>
  );
}

function ProjectList({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (next: SiteContent) => void;
}) {
  const items = draft.projects.items;
  function update(index: number, key: "title" | "category" | "summary" | "detail" | "image", value: string) {
    setDraft({
      ...draft,
      projects: {
        ...draft.projects,
        items: items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)),
      },
    });
  }
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={index} className="win-in grid gap-2 p-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui text-xs font-bold text-cream">Layihə {index + 1}</p>
            <button
              type="button"
              className="win-btn disabled:opacity-40"
              disabled={items.length <= 1}
              onClick={() =>
                setDraft({
                  ...draft,
                  projects: { ...draft.projects, items: items.filter((_, itemIndex) => itemIndex !== index) },
                })
              }
            >
              Sil
            </button>
          </div>
          <label className="grid gap-1 font-ui text-xs font-bold text-cream">
            Ad
            <input className="win-field font-sans text-sm font-normal" value={item.title} onChange={(event) => update(index, "title", event.target.value)} />
          </label>
          <label className="grid gap-1 font-ui text-xs font-bold text-cream">
            Kateqoriya
            <input className="win-field font-sans text-sm font-normal" value={item.category} onChange={(event) => update(index, "category", event.target.value)} />
          </label>
          <label className="grid gap-1 font-ui text-xs font-bold text-cream">
            Qısa
            <textarea className="win-field min-h-20 font-sans text-sm font-normal" value={item.summary} onChange={(event) => update(index, "summary", event.target.value)} />
          </label>
          <label className="grid gap-1 font-ui text-xs font-bold text-cream">
            Ətraflı
            <textarea className="win-field min-h-20 font-sans text-sm font-normal" value={item.detail} onChange={(event) => update(index, "detail", event.target.value)} />
          </label>
          <ImageField label="Şəkil" value={item.image} onChange={(image) => update(index, "image", image)} />
        </div>
      ))}
      <button
        type="button"
        data-tone="amber"
        className="win-btn disabled:opacity-40"
        disabled={items.length >= MAX_CARDS}
        onClick={() => setDraft({ ...draft, projects: { ...draft.projects, items: [...items, blankProject()] } })}
      >
        Layihə əlavə et
      </button>
    </div>
  );
}

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <p className="p-8 font-ui text-sm text-cream">Yoxlanılır…</p>;
  }
  if (!user) return <RedirectToSignIn />;
  return <Editor />;
}

function Editor() {
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [locked, setLocked] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let stop = false;
    (async () => {
      const session = await getAdminSession();
      if (stop) return;
      if (!session.hasOwner) {
        setNeedsPassword(true);
        return;
      }
      if (!session.isOwner || !session.content) {
        setLocked(true);
        return;
      }
      setDraft(session.content);
    })().catch(() => setStatus("Məlumat açılmadı."));
    return () => {
      stop = true;
    };
  }, []);

  async function save() {
    if (!draft) return;
    setBusy(true);
    setStatus("");
    try {
      await saveSiteContent({ data: draft });
      pingContent();
      setStatus("Saxlanıldı. Əsas sayt bunu özü götürür.");
    } catch {
      setStatus("Saxlanılmadı. Boş sahə və ya çox uzun mətn ola bilər.");
    } finally {
      setBusy(false);
    }
  }

  if (needsPassword) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="win-light p-4">
          <h1 className="font-pixel text-3xl text-navy">Giriş lazımdır</h1>
          <p className="mt-2 font-sans text-sm leading-relaxed text-navy">
            Redaktə yalnız sizin e-poçt və şifrənizlə açılır. Eyni hesab telefon və başqa kompüterdə də işləyir.
          </p>
          <Link to="/login" data-tone="amber" className="win-btn mt-4">
            Hesabı yarat
          </Link>
        </div>
      </main>
    );
  }

  if (locked) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="win-light p-4">
          <h1 className="font-pixel text-3xl text-navy">Bağlıdır</h1>
          <p className="mt-2 font-sans text-sm leading-relaxed text-navy">
            Bu sessiya sahibi deyil. Redaktə üçün öz e-poçt və şifrənizlə daxil olun — telefon və ya başqa kompüterdən də.
          </p>
          <Link to="/login" data-tone="amber" className="win-btn mt-4">
            E-poçt ilə daxil ol
          </Link>
        </div>
      </main>
    );
  }

  if (!draft) {
    return <p className="p-8 font-ui text-sm text-cream">Panel açılır…</p>;
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-30 px-3 pt-3">
        <div className="win-light mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-2 py-2">
          <p className="mr-auto font-ui text-sm font-bold text-navy">VEBINIO · İdarə</p>
          <Link to="/" className="win-btn">
            Sayta bax
          </Link>
          <button type="button" data-tone="amber" className="win-btn" disabled={busy} onClick={() => void save()}>
            {busy ? "Saxlanır…" : "Saxla"}
          </button>
          <UserButton />
        </div>
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-3 py-4">
        <p className="font-sans text-sm leading-relaxed text-grey">
          Saxladıqdan sonra mətn əsas saytda özü görünür. Bu e-poçt və şifrə ilə istənilən kompüter və telefondan yenidən daxil ola bilərsiniz.
        </p>
        {status ? (
          <p className="win-light px-3 py-2 font-ui text-sm text-navy" role="status">
            {status}
          </p>
        ) : null}
        {GROUPS.map((group) => (
          <WindowFrame key={group.title} title={group.title} status="redaktə">
            <div className="grid gap-3 p-3">
              {group.fields.map((field) => (
                <label key={field.path} className="grid gap-1 font-ui text-xs font-bold text-cream">
                  {field.label}
                  {field.long ? (
                    <textarea
                      className="win-field min-h-20 font-sans text-sm font-normal"
                      value={readPath(draft, field.path)}
                      onChange={(event) => setDraft(writePath(draft, field.path, event.target.value))}
                    />
                  ) : (
                    <input
                      className="win-field font-sans text-sm font-normal"
                      value={readPath(draft, field.path)}
                      onChange={(event) => setDraft(writePath(draft, field.path, event.target.value))}
                    />
                  )}
                </label>
              ))}
              {group.title === "Hero" ? (
                <ImageField
                  label="Hero şəkli"
                  value={draft.hero.image}
                  onChange={(image) => setDraft({ ...draft, hero: { ...draft.hero, image } })}
                />
              ) : null}
              {group.title === "Xidmətlər" ? <ServiceList draft={draft} setDraft={setDraft} /> : null}
              {group.title === "Layihələr" ? <ProjectList draft={draft} setDraft={setDraft} /> : null}
            </div>
          </WindowFrame>
        ))}
      </main>
    </div>
  );
}
