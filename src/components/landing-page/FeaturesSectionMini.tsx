import React from "react";
import { Body, Footnote, Surface, TileAsset, Title } from "../SoftCard";

const FeaturesSectionMini = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight">
            Purpose-built features that{" "}
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
              address the unique challenges,
            </span>{" "}
            healthcare providers face with patient financing.
          </h2>
        </div>

        {/* Key Stats Highlight */}
        <div
          className="
    mt-12 grid gap-6
    sm:grid-cols-3
    [--row:400px]               /* tune this */
    [grid-auto-rows:var(--row)] /* crucial: creates tall tracks */
  "
        >
          <Surface className="" ariaLabel="Increase in treatment acceptance">
            <Title tall>Increase in treatment acceptance</Title>
            <Body tall>More approved procedures equals higher revenue.</Body>
            <TileAsset
              src="/assets/treatment-acceptance.png"
              alt="Increase in treatment stack"
              className="
                w-[180%] sm:w-[210%] lg:w-[280%]
                translate-x-[6%] translate-y-[6%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            <Footnote href="https://withcherry.com/">WithCherry</Footnote>
          </Surface>

          <Surface className="" ariaLabel="Average approval time">
            <Title tall>Average approval time</Title>
            <Body tall>Keep patients engaged and schedules moving.</Body>
            <TileAsset
              src="/assets/cost-cut.png"
              alt="Increase in treatment stack"
              className="
                w-[180%] sm:w-[210%] lg:w-[280%]
                translate-x-[6%] translate-y-[6%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            <Footnote href="https://withcherry.com/">WithCherry</Footnote>
          </Surface>

          <Surface className="" ariaLabel="T+1">
            <Title tall>T+1</Title>
            <Body tall>Guaranteed funding timeline</Body>
            <TileAsset
              src="/assets/cost-cut.png"
              alt="Guaranteed funding timeline stack"
              className="
                w-[180%] sm:w-[210%] lg:w-[280%]
                translate-x-[6%] translate-y-[6%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            <Footnote href="https://withcherry.com/">WithCherry</Footnote>
          </Surface>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSectionMini;
