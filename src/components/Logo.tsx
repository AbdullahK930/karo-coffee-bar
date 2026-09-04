import clsx from "clsx";

export function LogoMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-mark.png"
      alt="Káro Coffee Bar"
      decoding="async"
      className={clsx("aspect-square shrink-0 rounded-full object-contain", className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={clsx("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-text">
          káro
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted">
          COFFEE BAR
        </span>
      </div>
    </div>
  );
}
