import React from "react";
import { Body, Footnote, Surface, TileAsset, Title } from "../SoftCard";

const FeaturesSectionMini = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-2 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight">
            Patient-preferred plans{" "}
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-7 h-7 text-emerald-600 translate-y-[2px]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              clinic-trusted payouts.
            </span>
          </h2>
        </div>

        {/* Key Stats Highlight */}
        <div
          className="
            mt-12 grid gap-6
            sm:grid-cols-3
            [--row:400px]
            [grid-auto-rows:var(--row)]
          "
        >
          <Surface ariaLabel="More patients say yes">
            <Title tall>More patients say yes</Title>
            <Body tall>
              Flexible plans remove friction. More approvals. More revenue.
            </Body>
            <TileAsset
              src="/assets/treatment-acceptance.png"
              alt="Treatment acceptance"
              className="
                w-[180%] sm:w-[210%] lg:w-[280%]
                translate-x-[6%] translate-y-[6%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            <Footnote href="#">Breeze</Footnote>
          </Surface>

          <Surface ariaLabel="Real-time approvals">
            <Title tall>Real-time approvals</Title>
            <Body tall>
              Apply at checkout. Decisions in real time keep schedules moving.
            </Body>
            <TileAsset
              src="/assets/cost-cut.png"
              alt="Real-time approvals"
              className="
                w-[180%] sm:w-[210%] lg:w-[280%]
                translate-x-[6%] translate-y-[6%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            <Footnote href="#">Breeze</Footnote>
          </Surface>

          <Surface ariaLabel="Next-day funding">
            <Title tall>Next-day funding</Title>
            <Body tall>T+1 payouts. Cash flow stays smooth.</Body>
            <TileAsset
              src="/assets/cost-cut.png"
              alt="Next-day funding"
              className="
                w-[180%] sm:w-[210%] lg:w-[280%]
                translate-x-[6%] translate-y-[6%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            <Footnote href="#">Breeze</Footnote>
          </Surface>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSectionMini;
