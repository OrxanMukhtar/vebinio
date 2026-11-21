import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  getContactChannel,
  handoffBrief,
  loadBriefLocally,
  saveBriefLocally,
  type Brief,
} from "@/lib/contact";
import type { SiteContent } from "@/lib/site/content";
import { SectionHeading } from "./section-heading";
import { WindowFrame } from "./window-frame";

const schema = z.object({
  name: z.string().trim().min(2, "Ad ən azı 2 simvol olmalıdır."),
  email: z.string().trim().email("Düzgün e-poçt ünvanı yazın."),
  service: z.string().min(1, "Xidmət seçin."),
  message: z.string().trim().min(20, "Layihəni bir neçə cümlə ilə təsvir edin."),
});

const EMPTY: Brief = { name: "", email: "", service: "", message: "" };

type Status =
  | { kind: "idle" }
  | { kind: "handoff"; text: string }
  | { kind: "local"; text: string };

export function ContactForm({ contact }: { contact: SiteContent["contact"] }) {
  const [values, setValues] = useState<Brief>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Brief, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const saved = loadBriefLocally();
    if (saved) setValues(saved);
  }, []);

  function update<K extends keyof Brief>(key: K, value: Brief[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Brief, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !next[key as keyof Brief]) {
          next[key as keyof Brief] = issue.message;
        }
      }
      setErrors(next);
      setStatus({ kind: "idle" });
      return;
    }
    setErrors({});
    const brief = parsed.data;
    const channel = getContactChannel();
    if (!channel) {
      saveBriefLocally(brief);
      setStatus({
        kind: "local",
        text: "Göndərilmədi. Əlaqə ünvanı hələ qoşulmayıb, ona görə mətn bu cihazda saxlanıldı. Ünvan əlavə olunanda yenidən göndərə bilərsiniz.",
      });
      return;
    }
    handoffBrief(brief, channel);
    saveBriefLocally(brief);
    setStatus({
      kind: "handoff",
      text:
        channel.kind === "email"
          ? "E-poçt proqramınız açıldı. Mesaj yalnız siz göndərdikdən sonra studiya çatır."
          : "WhatsApp açıldı. Mesajı orada özünüz göndərin — bu forma onu avtomatik çatdırmır.",
    });
  }

  return (
    <section id="elaqe">
      <SectionHeading file={contact.file} title={contact.title} text={contact.text} />
      <WindowFrame title="YENI-MESAJ.EXE" status={status.kind === "idle" ? "Gözləyir" : "Qeyd olundu"}>
        <form className="grid gap-3 p-4 sm:p-5" onSubmit={onSubmit} noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              id="ad"
              label="Ad"
              error={errors.name}
              value={values.name}
              onChange={(value) => update("name", value)}
              autoComplete="name"
            />
            <Field
              id="epoct"
              label="E-poçt"
              type="email"
              error={errors.email}
              value={values.email}
              onChange={(value) => update("email", value)}
              autoComplete="email"
            />
          </div>
          <label className="grid gap-1 font-ui text-sm font-bold text-cream" htmlFor="xidmet">
            Xidmət
            <select
              id="xidmet"
              className="win-field font-sans font-normal"
              value={values.service}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "xidmet-xeta" : undefined}
              onChange={(event) => update("service", event.target.value)}
            >
              <option value="">Xidmət seçin</option>
              {contact.services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service ? (
              <span id="xidmet-xeta" className="font-sans text-sm font-normal text-amber">
                {errors.service}
              </span>
            ) : null}
          </label>
          <label className="grid gap-1 font-ui text-sm font-bold text-cream" htmlFor="tesvir">
            Layihənin təsviri
            <textarea
              id="tesvir"
              className="win-field font-sans font-normal"
              value={values.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "tesvir-xeta" : undefined}
              onChange={(event) => update("message", event.target.value)}
            />
            {errors.message ? (
              <span id="tesvir-xeta" className="font-sans text-sm font-normal text-amber">
                {errors.message}
              </span>
            ) : null}
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" data-tone="amber" className="win-btn">
              Göndər
            </button>
            <p className="max-w-md font-sans text-xs leading-relaxed text-grey">
              Serverə yazılmır. Qoşulmuş ünvan varsa, e-poçt və ya WhatsApp açılır.
            </p>
          </div>
          {status.kind !== "idle" ? (
            <div className="win-light p-3" role="status">
              <p className="font-ui text-sm font-bold text-navy">VEBINIO</p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-navy">{status.text}</p>
            </div>
          ) : null}
        </form>
      </WindowFrame>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-xeta`;
  return (
    <label className="grid gap-1 font-ui text-sm font-bold text-cream" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        className="win-field font-sans font-normal"
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <span id={errorId} className="font-sans text-sm font-normal text-amber">
          {error}
        </span>
      ) : null}
    </label>
  );
}
