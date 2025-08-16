"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string
  indicatorStyle?: React.CSSProperties
}

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n))

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>, // ✅ ElementRef is deprecated
  ProgressProps
>(({ className, value, max = 100, indicatorClassName, indicatorStyle, ...props }, ref) => {
  // Normalize to a number for the visual fill.
  const v = clamp(value ?? 0, 0, max)
  const pct = (v / max) * 100

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      value={value ?? undefined} // ✅ preserve determinate/indeterminate semantics for a11y
      max={max}
      className={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "bg-progress-diluted h-full w-full flex-1 transition-all",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - pct}%)`, ...indicatorStyle }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = "Progress"

export { Progress }
export type { ProgressProps }
