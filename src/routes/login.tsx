import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient, signOut } from "@/lib/auth/client";
import { claimOwner, getOwnerGate } from "@/lib/site/api";
import { Mark } from "@/components/site/logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "VEBINIO — İdarə girişi" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [hasOwner, setHasOwner] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const note = sessionStorage.getItem("vebinio.login.note");
    if (note) {
      sessionStorage.removeItem("vebinio.login.note");
      setError(note);
    }
    getOwnerGate()
      .then((gate) => setHasOwner(gate.hasOwner))
      .catch(() => setHasOwner(false));
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Düzgün e-poçt yazın.");
      return;
    }
    if (password.length < 8) {
      setError("Şifrə ən azı 8 simvol olmalıdır.");
      return;
    }
    setBusy(true);
    try {
      if (!hasOwner) {
        const created = await authClient.signUp.email({ email, password, name: "VEBINIO" });
        if (created.error) {
          const signed = await authClient.signIn.email({ email, password });
          if (signed.error) {
            setError("Hesab yaradılmadı. E-poçt artıq varsa, şifrəni yoxlayın.");
            return;
          }
        }
      } else {
        const signed = await authClient.signIn.email({ email, password });
        if (signed.error) {
          setError("E-poçt və ya şifrə səhvdir.");
          return;
        }
      }
      const claimed = await claimOwner();
      if (!claimed.isOwner) {
        sessionStorage.setItem("vebinio.login.note", "Bu panel artıq başqa hesaba bağlıdır.");
        await signOut("/login");
        return;
      }
      await navigate({ to: "/admin" });
    } catch {
      setError("Giriş alınmadı. Bir az sonra yenidən yoxlayın.");
    } finally {
      setBusy(false);
    }
  }

  const creating = hasOwner === false;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <form className="win-light w-full max-w-md" onSubmit={onSubmit}>
        <div className="win-title-light flex items-center gap-2 px-2">
          <span className="size-2 bg-amber" aria-hidden="true" />
          <p className="font-ui text-sm font-bold">ADMIN.EXE</p>
        </div>
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <span className="win-in grid size-12 place-items-center bg-navy p-1">
              <Mark className="max-h-8" />
            </span>
            <div>
              <h1 className="font-pixel text-3xl leading-none text-navy">VEBINIO</h1>
              <p className="font-ui text-xs text-ink">Yalnız sahib girişi</p>
            </div>
          </div>
          <p className="font-sans text-sm leading-relaxed text-navy">
            {hasOwner === null
              ? "Yoxlanılır…"
              : creating
                ? "İlk hesab panelin sahibi olur. Sonra başqa hesab redaktə edə bilməz."
                : "Mətnləri dəyişmək üçün öz hesabınızla daxil olun."}
          </p>
          <label className="grid gap-1 font-ui text-sm font-bold text-navy">
            E-poçt
            <input
              className="win-field font-sans font-normal"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-1 font-ui text-sm font-bold text-navy">
            Şifrə
            <input
              className="win-field font-sans font-normal"
              type="password"
              autoComplete={creating ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="font-sans text-sm text-ink">{error}</p> : null}
          <button type="submit" data-tone="amber" className="win-btn" disabled={busy || hasOwner === null}>
            {busy ? "Gözləyin…" : creating ? "Hesabı yarat" : "Daxil ol"}
          </button>
        </div>
      </form>
    </main>
  );
}
