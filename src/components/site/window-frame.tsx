import type { ReactNode } from "react";
import { cn } from "./cn";

function Chrome({ children }: { children: string }) {
  return <span className="chrome-btn">{children}</span>;
}

export function WindowFrame({
  title,
  children,
  tone = "dark",
  className,
  status,
}: {
  title: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  status?: string;
}) {
  const light = tone === "light";
  return (
    <div className={cn("win-enter", light ? "win-light" : "win-dark", className)}>
      <div className={cn("flex items-center gap-2 px-2", light ? "win-title-light" : "win-title-dark")}>
        <span className="size-2 shrink-0 bg-amber" aria-hidden="true" />
        <p className="truncate font-ui text-sm font-bold">{title}</p>
        <span className="ml-auto flex gap-1" aria-hidden="true">
          <Chrome>_</Chrome>
          <Chrome>□</Chrome>
          <Chrome>×</Chrome>
        </span>
      </div>
      <div>{children}</div>
      {status ? (
        <div
          className={cn(
            "border-t-2 border-line px-2 py-1 font-ui text-xs",
            light ? "text-navy" : "text-grey",
          )}
        >
          {status}
        </div>
      ) : null}
    </div>
  );
}

export function winButtonProps(tone: "grey" | "amber" = "grey", active = false) {
  return {
    "data-tone": tone,
    "data-active": active ? "true" : "false",
    className: "win-btn",
  } as const;
}
