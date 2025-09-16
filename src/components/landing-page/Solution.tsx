import React from "react";
import HealthcareBNPLProcess from "./Process";

const Solution = () => {
  return (
    <section id="solution" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={[
              "font-semibold tracking-tight text-slate-800 leading-[1.05]",
              "text-[clamp(28px,8vw,56px)] supports-[text-wrap:balance]:text-balance text-pretty",
              // cap line length on small screens
              "mx-auto max-w-[22ch] sm:max-w-none",
            ].join(" ")}
          >
            <span className="block">0% APR for patients</span>
            <span className="block">
              <svg
                className="inline h-6 w-6 align-[-3px] text-emerald-600 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>{" "}
              Full payout for your clinic.
            </span>
            {/* <span className="block text-slate-700 text-[clamp(14px,3.6vw,18px)] mt-2">
              Here’s how.
            </span> */}
          </h2>
        </div>

        <HealthcareBNPLProcess />
      </div>
    </section>
  );
};

export default Solution;
