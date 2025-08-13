"use client";

import * as React from "react";
import clsx from "clsx";

type Side = "top" | "right" | "bottom" | "left";

export function LabelWithHelp({
  label,
  help,
  side = "top",
  className,
}: {
  label: React.ReactNode;
  help: React.ReactNode;
  side?: Side;
  className?: string;
}) {
  const id = React.useId();

  const pos = {
    right: "left-full ml-2 top-1/2 -translate-y-1/2 [--origin:left]",
    left: "right-full mr-2 top-1/2 -translate-y-1/2 [--origin:right]",
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2 [--origin:bottom]",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2 [--origin:top]",
  }[side];

  return (
    <span
      className={clsx(
        "group relative inline-flex items-center gap-1 text-[12px] font-medium text-neutral-500",
        className
      )}
    >
      {/* Trigger */}
      <span
        tabIndex={0}
        aria-describedby={id}
        className="inline-flex items-center gap-1 cursor-help focus:outline-none"
      >
        {label}
        <span aria-hidden="true" className="text-neutral-400">
          ⓘ
        </span>
      </span>

      {/* Tooltip */}
      <span
        id={id}
        role="tooltip"
        className={clsx(
          "pointer-events-none absolute z-50 min-w-max rounded-md bg-black px-3 py-2 text-sm font-medium text-white shadow-md",
          "opacity-0 scale-95 transition-all duration-200 origin-[var(--origin)]",
          "group-hover:opacity-100 group-hover:scale-100",
          "group-focus-within:opacity-100 group-focus-within:scale-100",
          pos
          // If you want it only on large screens, add: "hidden lg:block"
        )}
      >
        {help}
      </span>
    </span>
  );
}
