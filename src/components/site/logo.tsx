import { cn } from "./cn";

export function Mark({
  className,
  alt = "",
  size = "sm",
}: {
  className?: string;
  alt?: string;
  size?: "sm" | "lg";
}) {
  const src = size === "lg" ? "/brand/mark.png" : "/brand/mark-sm.png";
  const width = size === "lg" ? 720 : 256;
  const height = size === "lg" ? 519 : 184;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("h-auto w-full", className)}
      decoding="async"
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/wordmark.png"
      alt="VEBINIO — Digital Creative Studio"
      width={1600}
      height={377}
      className={cn("h-auto w-full", className)}
      decoding="async"
    />
  );
}
