import React from "react";

interface ReligiousHeadingProps {
  heading?: string;
}

export const ReligiousHeading: React.FC<ReligiousHeadingProps> = ({
  heading = "जय श्री कृष्णा",
}) => {
  return (
    <div className="text-center pt-0.5">
      {/* Auspicious Hindi Typography in Deep Navy Blue */}
      <h2 className="font-devanagari text-[#1E3A8A] font-bold text-xl sm:text-2xl md:text-[28px] tracking-wide leading-tight">
        {heading}
      </h2>

      {/* Decorative Floral Ornament in Blue Palette */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-0.5 mb-1">
        {/* Left Thin Divider */}
        <span className="w-8 sm:w-14 h-[1px] bg-[#93C5FD] opacity-80"></span>

        {/* Traditional Floral Motif in Royal Blue */}
        <div className="flex items-center justify-center gap-0.5 text-[#1D4ED8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] rotate-45 transform"></span>
          <span className="w-2 h-2.5 rounded-t-full bg-[#1D4ED8]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] rotate-45 transform"></span>
        </div>

        {/* Right Thin Divider */}
        <span className="w-8 sm:w-14 h-[1px] bg-[#93C5FD] opacity-80"></span>
      </div>
    </div>
  );
};
