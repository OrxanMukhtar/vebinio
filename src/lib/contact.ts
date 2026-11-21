/**
 * Contact integration point.
 *
 * The public site does not invent an inbox and does not pretend a message
 * was delivered. Set public env vars (they are not secrets) before expecting
 * a handoff:
 *
 *   VITE_CONTACT_EMAIL      visitor's mail app opens with the brief
 *   VITE_CONTACT_WHATSAPP   digits, with or without +, opens WhatsApp
 *
 * Optional footer links. Only https URLs are accepted:
 *
 *   VITE_SOCIAL_INSTAGRAM
 *   VITE_SOCIAL_LINKEDIN
 *   VITE_SOCIAL_BEHANCE
 *
 * When neither contact channel is set, a valid brief stays on this device
 * under localStorage key `vebinio.brief`. Wire a real endpoint later by
 * replacing `handoffBrief` — do not show a success state until something
 * actually accepts the message.
 */

export type Brief = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export type ContactChannel =
  | { kind: "email"; address: string }
  | { kind: "whatsapp"; phone: string };

export type SocialLink = { label: string; href: string };

const BRIEF_KEY = "vebinio.brief";

function readEnv(name: string): string {
  const value = import.meta.env[name] as unknown;
  return typeof value === "string" ? value.trim() : "";
}

function safeEmail(value: string): string | null {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;
  return null;
}

function safePhone(value: string): string | null {
  const digits = value.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

function safeHttps(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function getContactChannel(): ContactChannel | null {
  const email = safeEmail(readEnv("VITE_CONTACT_EMAIL"));
  if (email) return { kind: "email", address: email };
  const phone = safePhone(readEnv("VITE_CONTACT_WHATSAPP"));
  if (phone) return { kind: "whatsapp", phone };
  return null;
}

export function getSocialLinks(): SocialLink[] {
  const specs: Array<[string, string]> = [
    ["VITE_SOCIAL_INSTAGRAM", "Instagram"],
    ["VITE_SOCIAL_LINKEDIN", "LinkedIn"],
    ["VITE_SOCIAL_BEHANCE", "Behance"],
  ];
  const links: SocialLink[] = [];
  for (const [key, label] of specs) {
    const href = safeHttps(readEnv(key));
    if (href) links.push({ label, href });
  }
  return links;
}

export function briefText(brief: Brief): string {
  return `Ad: ${brief.name}\nE-poçt: ${brief.email}\nXidmət: ${brief.service}\n\n${brief.message}`;
}

export function handoffBrief(brief: Brief, channel: ContactChannel): void {
  const text = briefText(brief);
  if (channel.kind === "email") {
    const subject = encodeURIComponent(`VEBINIO — ${brief.service}`);
    const body = encodeURIComponent(text);
    window.location.href = `mailto:${channel.address}?subject=${subject}&body=${body}`;
    return;
  }
  const url = `https://wa.me/${channel.phone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function saveBriefLocally(brief: Brief): void {
  try {
    localStorage.setItem(BRIEF_KEY, JSON.stringify(brief));
  } catch {
    /* private mode or a full disk — the form still holds the text */
  }
}

export function loadBriefLocally(): Brief | null {
  try {
    const raw = localStorage.getItem(BRIEF_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Brief>;
    if (
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      typeof parsed.service !== "string" ||
      typeof parsed.message !== "string"
    ) {
      return null;
    }
    return {
      name: parsed.name,
      email: parsed.email,
      service: parsed.service,
      message: parsed.message,
    };
  } catch {
    return null;
  }
}
