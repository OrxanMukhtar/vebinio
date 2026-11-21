import { z } from "zod";

const line = (max: number) => z.string().trim().min(1).max(max);
const card = z.object({
  file: line(40),
  title: line(120),
  text: line(600),
});
const project = z.object({
  title: line(120),
  category: line(80),
  summary: line(400),
  detail: line(1200),
});
const step = z.object({
  n: line(8),
  title: line(40),
  text: line(400),
});

export const siteContentSchema = z.object({
  nav: z.object({
    ana: line(40),
    xidmetler: line(40),
    layiheler: line(40),
    haqqimizda: line(40),
    elaqe: line(40),
    cta: line(60),
  }),
  hero: z.object({
    kicker: line(80),
    line1: line(80),
    highlight: line(80),
    line3: line(80),
    support: line(400),
    primary: line(40),
    secondary: line(40),
    note: line(160),
  }),
  services: z.object({
    file: line(40),
    title: line(80),
    text: line(400),
    items: z.tuple([card, card, card, card]),
  }),
  projects: z.object({
    file: line(40),
    title: line(80),
    text: line(400),
    items: z.tuple([project, project, project, project]),
  }),
  about: z.object({
    file: line(40),
    title: line(80),
    paragraphs: z.tuple([line(800), line(800), line(800)]),
  }),
  process: z.object({
    file: line(40),
    title: line(80),
    steps: z.tuple([step, step, step, step]),
  }),
  cta: z.object({
    kicker: line(40),
    title: line(120),
    text: line(400),
    button: line(60),
  }),
  contact: z.object({
    file: line(40),
    title: line(80),
    text: line(400),
    services: z.tuple([line(80), line(80), line(80), line(80), line(80), line(80)]),
  }),
  footer: z.object({
    tagline: line(80),
    copyright: line(160),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultContent: SiteContent = {
  nav: {
    ana: "Ana səhifə",
    xidmetler: "Xidmətlər",
    layiheler: "Layihələr",
    haqqimizda: "Haqqımızda",
    elaqe: "Əlaqə",
    cta: "Layihəni başlayaq",
  },
  hero: {
    kicker: "DIGITAL CREATIVE STUDIO",
    line1: "Rəqəmsal ideyaları",
    highlight: "real nəticələrə",
    line3: "çeviririk.",
    support: "Veb-saytlar, rəqəmsal məhsullar, brendinq və AI həlləri ilə ideyalarınızı həyata keçiririk.",
    primary: "Xidmətlərimiz",
    secondary: "Bizimlə əlaqə",
    note: "İdeyan var. Gəlin onu reallaşdıraq.",
  },
  services: {
    file: "XIDMETLER.EXE",
    title: "Nə edə bilərik?",
    text: "İdeyadan dizayna, dizayndan işlək rəqəmsal məhsula qədər.",
    items: [
      {
        file: "WEB.EXE",
        title: "Veb-saytlar və tətbiqlər",
        text: "Biznesiniz üçün müasir, sürətli, mobil uyğun və funksional veb-saytlar və veb tətbiqlər hazırlayırıq.",
      },
      {
        file: "BREND.EXE",
        title: "Brendinq və dizayn",
        text: "Brendinizin vizual kimliyini, loqosunu, qrafik dizaynını və istifadəçi təcrübəsini formalaşdırırıq.",
      },
      {
        file: "AI.EXE",
        title: "AI və avtomatlaşdırma",
        text: "Süni intellekt və avtomatlaşdırma həlləri ilə gündəlik iş proseslərini daha səmərəli edirik.",
      },
      {
        file: "MEHSUL.EXE",
        title: "Rəqəmsal məhsullar",
        text: "Biznes ideyaları üçün xüsusi platformalar, sistemlər və rəqəmsal məhsullar yaradırıq.",
      },
    ],
  },
  projects: {
    file: "LAYIHELER.EXE",
    title: "Seçilmiş layihələr",
    text: "Hər layihənin arxasında bir ideya, düzgün yanaşma və diqqətli icra dayanır.",
    items: [
      {
        title: "Şəhər vitrini",
        category: "Veb-sayt",
        summary: "Yerli brend üçün sakit vitrin saytının interfeys konsepsiyası.",
        detail:
          "Bu, real müştəri işi deyil. Konsept ekran vitrin saytının strukturunu göstərir: qısa giriş, məhsul sırası və aydın hərəkət. Məqsəd səhifəni bəzək yığınına çevirmədən brendi oxunaqlı saxlamaqdır.",
      },
      {
        title: "Mozaika kimlik",
        category: "Brendinq",
        summary: "Loqo, rəng və tipo fayllarının bir qovluqda yığılmış kimlik konsepsiyası.",
        detail:
          "Konsept layihədir, tamamlanmış brend işi deyil. Fayl siyahısı kimlik sisteminin necə təhvil verilə biləcəyini göstərir: nişan, söz işarəsi, rəng qeydi və tipo. Heç bir real müştəri adı istifadə olunmur.",
      },
      {
        title: "Növbə masası",
        category: "Rəqəmsal məhsul",
        summary: "Qəbul və növbə üçün sadə masaüstü cədvəl konsepsiyası.",
        detail:
          "Demo ekrandır. Növbə sətirləri, vəziyyət və qısa əməliyyat düyməsi bir pəncərədə durur. Məqsəd gündəlik prosesi mürəkkəb panelə çevirmədən izlənilən etməkdir.",
      },
      {
        title: "Katib",
        category: "AI həlli",
        summary: "Uzun mətni qısa iş qeydinə yığan alətin masaüstü konsepsiyası.",
        detail:
          "Konsept layihədir. Sol tərəfdə mənbə mətn, sağda qısa xülasə və irəliləyiş zolağı var. Real model nəticəsi və ya müştəri sənədi kimi təqdim olunmur.",
      },
    ],
  },
  about: {
    file: "HAQQIMIZDA.TXT",
    title: "Biz kimik?",
    paragraphs: [
      "VEBINIO dizayn və texnologiyanı birləşdirən rəqəmsal kreativ studiyadır.",
      "Biz ideyaları yalnız vizual olaraq gözəl göstərməklə kifayətlənmirik. Onları real istifadə üçün nəzərdə tutulmuş, funksional və düşünülmüş rəqəmsal həllərə çeviririk.",
      "Məqsədimiz bizneslərin rəqəmsal dünyada daha güclü görünməsinə və inkişaf etməsinə kömək etməkdir.",
    ],
  },
  process: {
    file: "PROSES.EXE",
    title: "Necə işləyirik?",
    steps: [
      { n: "01", title: "Brief", text: "İdeyanızı və ehtiyaclarınızı öyrənirik." },
      { n: "02", title: "Plan", text: "Layihənin strukturunu və həll yolunu müəyyənləşdiririk." },
      { n: "03", title: "Create", text: "Dizaynı və texniki icranı həyata keçiririk." },
      { n: "04", title: "Launch", text: "Layihəni istifadəyə veririk və lazım olduqda dəstək göstəririk." },
    ],
  },
  cta: {
    kicker: "HAZIR",
    title: "Yeni layihəyə hazırsınız?",
    text: "İdeyanızı bizimlə paylaşın. Gəlin onu birlikdə reallaşdıraq.",
    button: "Layihəni müzakirə edək",
  },
  contact: {
    file: "ELAQE.EXE",
    title: "Əlaqə",
    text: "Ad, e-poçt və qısa təsvir kifayətdir. Forma yoxlanılır, amma ünvan qoşulmayana qədər mesajı göndərilmiş saymırıq.",
    services: [
      "Veb-saytlar və tətbiqlər",
      "Brendinq və dizayn",
      "AI və avtomatlaşdırma",
      "Rəqəmsal məhsullar",
      "Texniki dəstək",
      "Digər",
    ],
  },
  footer: {
    tagline: "DIGITAL CREATIVE STUDIO",
    copyright: "© 2026 VEBINIO. Bütün hüquqlar qorunur.",
  },
};

export function readContent(raw: unknown): SiteContent {
  const parsed = siteContentSchema.safeParse(raw);
  if (parsed.success) return parsed.data;
  if (raw && typeof raw === "object") {
    return siteContentSchema.parse({ ...defaultContent, ...(raw as object) });
  }
  return defaultContent;
}

export const CONTENT_TICK = "vebinio.content.tick";
export const CONTENT_CHANNEL = "vebinio.content";

/** Tell other open tabs the public copy changed. Same-tab navigation reloads it. */
export function pingContent() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONTENT_TICK, String(Date.now()));
  } catch {
    /* private mode */
  }
  try {
    const channel = new BroadcastChannel(CONTENT_CHANNEL);
    channel.postMessage("saved");
    channel.close();
  } catch {
    /* unsupported */
  }
}
