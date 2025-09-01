import React from "react";
import HealthcareBNPLProcess from "./Process";

const Solution = () => {
  return (
    <section id="solution" className="py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight  text-balance">
            With 0%–low-interest plans at checkout,{" "}
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-8 h-8 text-emerald-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              everyone wins,
            </span>{" "}
            patients get affordable care and your clinic gets paid in full
            immediately. Here's how it works.
          </h2>
        </div>

        {/* How It Works Steps */}
        <div className="mb-20">
          <HealthcareBNPLProcess />
        </div>

        {/* Key Benefits Bento Grid */}
        {/* <HealthcareBNPLBento /> */}
      </div>
    </section>
  );
};

export default Solution;
