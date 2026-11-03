import React from "react";

interface ReligiousHeadingProps {
  heading?: string;
}

export const ReligiousHeading: React.FC<ReligiousHeadingProps> = ({
  heading = "जय श्री कृष्णा",
}) => {
  return (
    <div className="text-center pt-1 sm:pt-1.5">
      {/* Exact Hindi Typography in Burnt Terracotta */}
      <h2 className="font-devanagari text-[#B83B20] font-medium text-2xl sm:text-3xl md:text-[32px] tracking-wide leading-tight">
        {heading}
      </h2>

      {/* Decorative Floral Ornament with Copper Lines & Diamond Accents */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1 mb-1.5">
        <span className="w-1 h-1 rotate-45 bg-[#BD8665] opacity-70 shrink-0"></span>
        <span className="w-10 sm:w-16 md:w-20 h-[1px] bg-[#BD8665] opacity-80"></span>

        {/* Traditional Symmetrical Floral Motif (Pure Vector SVG) */}
        <svg
          viewBox="0 0 40 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 sm:h-3.5 md:h-4 w-auto select-none shrink-0"
          aria-hidden="true"
        >
          {/* Central Flame/Lotus Petal */}
          <path
            d="M 20,2 C 17,7 18,13 20,16 C 22,13 23,7 20,2 Z"
            fill="#B83B20"
          />
          {/* Left Curving Petal */}
          <path
            d="M 19,8 C 14,7 10,10 8,14 C 12,15 16,13 19,10 Z"
            fill="#B83B20"
          />
          {/* Right Curving Petal */}
          <path
            d="M 21,8 C 26,7 30,10 32,14 C 28,15 24,13 21,10 Z"
            fill="#B83B20"
          />
          {/* Outer Accents */}
          <circle cx="4" cy="13" r="1.4" fill="#B83B20" />
          <circle cx="36" cy="13" r="1.4" fill="#B83B20" />
        </svg>

        <span className="w-10 sm:w-16 md:w-20 h-[1px] bg-[#BD8665] opacity-80"></span>
        <span className="w-1 h-1 rotate-45 bg-[#BD8665] opacity-70 shrink-0"></span>
      </div>
    </div>
  );
};
