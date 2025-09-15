import React from "react";
import { Body, Surface, TileAsset, Title } from "../SoftCard";

const FeaturesSectionMini = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-2 md:py-20">
       <div className="mx-auto max-w-4xl px-4 text-center">
  <h2
    className="
      font-semibold tracking-tight text-slate-800
      text-pretty text-balance leading-[1.07]
      text-[clamp(28px,7.8vw,40px)] sm:text-5xl lg:text-6xl
      max-w-[22ch] mx-auto
    "
  >
    <span className="block">Patient-preferred plans</span>

    {/* star + line: centered, then nudged left on mobile */}
    <span className="mt-1 block">
      <span
        className="
          inline-grid grid-flow-col auto-cols-max items-center gap-2 w-fit mx-auto
          -translate-x-[0.6ch] sm:translate-x-0
        "
      >
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600"
          viewBox="0 0 24 24" fill="currentColor" aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>clinic-trusted payouts</span>
      </span>
    </span>
  </h2>
</div>




        {/* Key Stats Highlight */}
        <div
          className="
            mt-12 grid gap-6
            sm:grid-cols-3
            [--row:300px]
            md:[--row:400px]
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
                w-[90%] sm:w-[210%] lg:w-[280%]
                translate-x-[10%] translate-y-[18%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            {/* <Footnote href="#">Breeze</Footnote> */}
          </Surface>

          <Surface ariaLabel="Real-time approvals">
            <Title tall>Real-time approvals</Title>
            <Body tall>
              Apply at checkout. Decisions in real time keep schedules moving.
            </Body>
            <TileAsset
              src="/assets/realtime-approvals.png"
              alt="Real-time approvals"
              className="
                w-[90%] sm:w-[210%] lg:w-[280%]
              translate-x-[14%] translate-y-[20%]
                lg:translate-x-[16%] lg:translate-y-[19%]
              "
            />
            {/* <Footnote href="#">Breeze</Footnote> */}
          </Surface>

          <Surface ariaLabel="Next-day funding">
            <Title tall>Next-day funding</Title>
            <Body tall>T+1 payouts. Cash flow stays smooth.</Body>
            <TileAsset
              src="/assets/funding.png"
              alt="Next-day funding"
              className="
                w-[90%] sm:w-[210%] lg:w-[280%]
                translate-x-[17%] translate-y-[18%]
                lg:translate-x-[15%] lg:translate-y-[20%]
              "
            />
            {/* <Footnote href="#">Breeze</Footnote> */}
          </Surface>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSectionMini;
