import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import Image from "next/image";

export const Surface = ({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}) =>{
  return (
    <Card
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        "relative overflow-hidden",
        "h-full rounded-[28px] bg-white",
        "shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_40px_-20px_rgba(15,23,42,0.15)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        "transition-transform duration-200 will-change-transform",
        "motion-safe:hover:translate-y-[-1px] motion-safe:hover:shadow-[0_2px_0_0_rgba(15,23,42,0.03),0_26px_50px_-26px_rgba(15,23,42,0.18)]",
        "motion-reduce:transform-none motion-reduce:shadow-none",
        "p-6 md:p-7 flex flex-col gap-2",
        className
      )}
    >
      {children}
    </Card>
  );
}

export function Title({
  children,
  tall = false,
}: {
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
	<h3
	  className={cn(
		"relative z-[2] font-semibold tracking-tight text-slate-900",
		tall ? "text-[clamp(18px,1.7vw,22px)]" : "text-[clamp(16px,1.5vw,20px)]"
	  )}
	>
	  {children}
	</h3>
  );
}

export function Body({
  children,
  tall = false,
}: {
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
	<p
	  className={cn(
		"relative z-[2] text-slate-600",
		tall
		  ? "text-[13.5px] md:text-sm leading-relaxed"
		  : "text-[13px] md:text-sm leading-6"
	  )}
	>
	  {children}
	</p>
  );
}

/** Full-bleed text variant for short cards */
export function FullText({ children }: { children: React.ReactNode }) {
  return (
	<p
	  className={cn(
		"relative z-[2] text-slate-800 font-medium",
		"text-[clamp(14px,1.6vw,18px)] leading-[1.35] select-text"
	  )}
	  style={{ hyphens: "auto" as any }}
	>
	  {children}
	</p>
  );
}

/** --- FOOTNOTE LINKS --- */
export function Footnote({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
	<a
	  href={href}
	  target="_blank"
	  rel="noopener noreferrer"
	  className={cn(
		"relative z-[2] mt-auto inline-flex items-center gap-1 text-[11px] tracking-wide",
		"text-slate-400 hover:text-slate-600 transition-colors underline decoration-slate-200/60 hover:decoration-slate-400"
	  )}
	>
	  {children}
	  <ExternalIcon />
	</a>
  );
}

export function ExternalIcon() {
  return (
	<svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
	  <path
		d="M11 3h6v6h-2V6.41l-6.3 6.3-1.4-1.42 6.3-6.3H11V3Z"
		fill="currentColor"
	  />
	  <path d="M5 5h4v2H7v6h6v-2h2v4H5V5Z" fill="currentColor" />
	</svg>
  );
}

/** --- DECORATIVE ASSET --- */
export function TileAsset({
  src,
  alt,
  className, // use for width + translate only
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
	<div
	  aria-hidden="true"
	  className="pointer-events-none select-none absolute inset-0 z-[1] flex items-end justify-end overflow-hidden"
	>
	  <Image
		src={src}
		alt={alt}
		width={1600}
		height={1600}
		sizes={sizes ?? "(min-width:1024px) 24vw, (min-width:640px) 42vw, 70vw"}
		className={cn(
		  // allow overscale + shifting to crop PNG’s empty edges
		  "block h-auto max-w-none will-change-transform drop-shadow-[0_12px_28px_rgba(0,0,0,0.10)]",
		  className
		)}
		priority={false}
	  />
	</div>
  );
}