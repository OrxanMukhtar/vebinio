import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { WindowFrame } from "@/components/site/window-frame";
import { claimOwner, getAdminSession, saveSiteContent } from "@/lib/site/api";
import { defaultContent, pingContent, type SiteContent } from "@/lib/site/content";

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
      ...[0, 1, 2, 3].flatMap((index) => [
        { path: `services.items.${index}.file`, label: `Kart ${index + 1} fayl` },
        { path: `services.items.${index}.title`, label: `Kart ${index + 1} başlıq` },
        { path: `services.items.${index}.text`, label: `Kart ${index + 1} mətn`, long: true },
      ]),
    ],
  },
  {
    title: "Layihələr",
    fields: [
      { path: "projects.file", label: "Fayl adı" },
      { path: "projects.title", label: "Başlıq" },
      { path: "projects.text", label: "Açıqlama", long: true },
      ...[0, 1, 2, 3].flatMap((index) => [
        { path: `projects.items.${index}.title`, label: `Layihə ${index + 1} ad` },
        { path: `projects.items.${index}.category`, label: `Layihə ${index + 1} kateqoriya` },
        { path: `projects.items.${index}.summary`, label: `Layihə ${index + 1} qısa`, long: true },
        { path: `projects.items.${index}.detail`, label: `Layihə ${index + 1} ətraflı`, long: true },
      ]),
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
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let stop = false;
    (async () => {
      const session = await getAdminSession();
      if (stop) return;
      if (!session.hasOwner) {
        const claimed = await claimOwner();
        if (!claimed.isOwner) {
          setLocked(true);
          return;
        }
        const again = await getAdminSession();
        if (!stop) setDraft(again.content ?? defaultContent);
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

  if (locked) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="win-light p-4">
          <h1 className="font-pixel text-3xl text-navy">Bağlıdır</h1>
          <p className="mt-2 font-sans text-sm text-navy">
            Bu panel yalnız sahibi üçün açıqdır. Bu hesab redaktə edə bilməz.
          </p>
          <div className="mt-4">
            <UserButton />
          </div>
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
          Buradakı mətnlər əsas saytın mətnləridir. Saxladıqdan sonra VEBINIO səhifəsi onları avtomatik göstərir.
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
            </div>
          </WindowFrame>
        ))}
      </main>
    </div>
  );
}
