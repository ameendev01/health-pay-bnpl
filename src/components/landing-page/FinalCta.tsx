// components/FinalCta.tsx
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

export function FinalCta({
  title = "No collections hassle. No AR drag",
  ctaText = "Get a demo",
}: {
  title?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section aria-labelledby="cta-final" className="relative isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* The grid centers the whole stack vertically + horizontally */}
        <div className="min-h-[50vh] py-24 sm:py-32 lg:py-40 grid place-items-center">
          {/* The stack: heading + button; centered and width-limited for perfect line length */}
          <div className="flex flex-col items-center text-center ">
            <h2
              id="cta-final"
              className="max-w-5xl text-balance font-semibold tracking-tighter leading-tight text-neutral-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span>{title}</span>
              {/* Decorative blinking block cursor */}
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[-0.05em] align-baseline bg-neutral-900 animate-cta-caret"
              />
            </h2>

            <div className="mt-10">
              <InteractiveHoverButton>
				{ctaText}
			  </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </div>

      {/* Local CSS for the cursor blink (works in Next.js via styled-jsx) */}
      <style jsx>{`
        @keyframes cta-caret {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-cta-caret { animation: cta-caret 1.1s steps(1, end) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-cta-caret { animation: none; }
        }
      `}</style>
    </section>
  );
}
