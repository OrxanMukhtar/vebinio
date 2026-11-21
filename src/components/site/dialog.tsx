import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function Dialog({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="scrim fixed inset-0 z-40 grid place-items-center p-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="win-light win-enter max-h-[85vh] w-full max-w-lg overflow-auto"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="win-title-light flex items-center gap-2 px-2">
          <span className="size-2 shrink-0 bg-amber" aria-hidden="true" />
          <h3 id={titleId} className="truncate font-ui text-sm font-bold">
            {title}
          </h3>
          <button ref={closeRef} type="button" className="chrome-btn ml-auto" onClick={onClose} aria-label="Bağla">
            ×
          </button>
        </div>
        <div className="p-4 text-navy">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
