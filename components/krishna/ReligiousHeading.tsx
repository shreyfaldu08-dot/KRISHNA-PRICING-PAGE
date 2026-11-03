import React from "react";

interface ReligiousHeadingProps {
  heading?: string;
}

export const ReligiousHeading: React.FC<ReligiousHeadingProps> = ({
  heading = "जय श्री कृष्णा",
}) => {
  return (
    <div className="text-center pt-1 sm:pt-2">
      {/* Exact Hindi Typography in Terracotta */}
      <h2 className="font-devanagari text-[#A1462B] font-bold text-2xl sm:text-3xl md:text-[34px] tracking-wide leading-tight">
        {heading}
      </h2>

      {/* Decorative Floral Ornament with Terracotta Accent */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1 mb-2">
        {/* Left Thin Divider */}
        <span className="w-10 sm:w-16 h-[1px] bg-[#B88B6B] opacity-75"></span>

        {/* Traditional Floral Motif from Reference */}
        <img
          src="/assets/ornament.png"
          alt=""
          aria-hidden="true"
          className="h-3 sm:h-3.5 md:h-4 w-auto object-contain select-none opacity-90"
        />

        {/* Right Thin Divider */}
        <span className="w-10 sm:w-16 h-[1px] bg-[#B88B6B] opacity-75"></span>
      </div>
    </div>
  );
};
