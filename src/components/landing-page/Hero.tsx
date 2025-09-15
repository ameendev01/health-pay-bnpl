import Image from "next/image";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { ArrowRight } from "lucide-react";
import { RainbowButton } from "../magicui/rainbow-button";

export const Hero = () => {
  return (
    <section className=" text-slate-900 py-12 sm:py-24 md:py-28 px-4 overflow-hidden pb-0 max-sm:pb-22">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 pt-0 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge */}
          <RainbowButton variant={"outline"} size={'sm'} className="rounded-full">
            <span className="text-slate-700 font-medium">
              BNPL for Healthcare Providers
            </span>
            <a
              href="#problem"
              className="flex items-center gap-1 text-slate-900 font-semibold"
            >
              Learn more
              <ArrowRight className="h-3 w-3" />
            </a>
          </RainbowButton>

          {/* Title */}
          <div className="space-y-4">
            <h1
              className="
    relative z-10 font-semibold tracking-tight leading-tight text-slate-900
    text-4xl sm:text-5xl md:text-6xl
    mx-auto text-center
    max-w-[16ch] sm:max-w-[20ch] md:max-w-[19ch]
    text-balance
  "
            >
              Offer flexible patient payments without adding risk
            </h1>

            {/* Description */}
            <p
              className="
    relative z-10 mx-auto text-center text-slate-700
    text-base md:text-lg font-normal
    max-w-[60ch] md:max-w-[55ch]
    text-balance leading-relaxed
  "
            >
              Breeze pays your clinic in full up front and handles patient
              installments. Patients see 0% APR; you pay a simple per-plan fee.
              No new AR. No collections work.
            </p>
          </div>

          {/* Actions */}
          <div className="relative z-10 flex justify-center gap-4">
            <InteractiveHoverButton className="border-2">
              Book a Demo
            </InteractiveHoverButton>
          </div>

          {/* Image */}
          <div className="relative pt-1">
            <Image
              src="/assets/image.png"
              alt="Breeze healthcare payment platform interface"
              width={9000}
              height={4000}
              className="border-18 border-[#d5f9fb] rounded-2xl shadow-2xl"
            />

            {/* Glow Effect */}
            {/* <div className="absolute top-90 w-full">
              <div className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-gradient-radial from-orange-200/50 to-transparent sm:h-[512px]" />
              <div className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-gradient-radial from-orange-300/30 to-transparent sm:h-[256px]" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
