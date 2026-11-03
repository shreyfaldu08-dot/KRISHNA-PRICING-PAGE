import React from "react";

interface ReligiousHeadingProps {
  heading?: string;
}

export const ReligiousHeading: React.FC<ReligiousHeadingProps> = ({
  heading = "जय श्री कृष्णा",
}) => {
  return (
    <div className="text-center pt-0.5">
      {/* Exact Hindi Typography */}
      <h2 className="font-devanagari text-[#A1462B] font-bold text-xl sm:text-2xl md:text-[28px] tracking-wide leading-tight">
        {heading}
      </h2>

      {/* Decorative Floral Ornament with Terracotta Accent */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-0.5 mb-1">
        {/* Left Thin Divider */}
        <span className="w-8 sm:w-14 h-[1px] bg-[#B88B6B] opacity-70"></span>

        {/* Traditional Floral Motif from Reference */}
        <img
          src="/assets/ornament.png"
          alt=""
          aria-hidden="true"
          className="h-2.5 sm:h-3.5 w-auto object-contain mix-blend-multiply select-none"
        />

        {/* Right Thin Divider */}
        <span className="w-8 sm:w-14 h-[1px] bg-[#B88B6B] opacity-70"></span>
      </div>
    </div>
  );
};
