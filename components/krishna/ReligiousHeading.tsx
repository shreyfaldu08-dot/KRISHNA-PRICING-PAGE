import React from "react";
import { ColorPalette } from "@/types/pricing";

interface ReligiousHeadingProps {
  heading?: string;
  palette?: ColorPalette;
}

export const ReligiousHeading: React.FC<ReligiousHeadingProps> = ({
  heading = "जय श्री कृष्णा",
  palette,
}) => {
  const accentPrimary = palette?.accentPrimary || "#B83B20";
  const accentSecondary = palette?.accentSecondary || "#BD8665";

  return (
    <div className="text-center">
      {/* Auspicious Hindi Typography */}
      <h2
        className="font-devanagari font-semibold text-lg sm:text-2xl md:text-[26px] tracking-wide leading-tight transition-colors duration-200"
        style={{ color: accentPrimary }}
      >
        {heading}
      </h2>

      {/* Decorative Floral Ornament with Minimal Fine Lines */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 mb-1">
        <span
          className="w-1 h-1 rotate-45 opacity-60 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="w-8 sm:w-14 md:w-16 h-[1px] opacity-60 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>

        {/* Traditional Symmetrical Floral Motif (Pure Vector SVG) */}
        <svg
          viewBox="0 0 40 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-2.5 sm:h-3 w-auto select-none shrink-0"
          aria-hidden="true"
        >
          {/* Central Flame/Lotus Petal */}
          <path
            d="M 20,2 C 17,7 18,13 20,16 C 22,13 23,7 20,2 Z"
            fill={accentPrimary}
          />
          {/* Left Curving Petal */}
          <path
            d="M 19,8 C 14,7 10,10 8,14 C 12,15 16,13 19,10 Z"
            fill={accentPrimary}
          />
          {/* Right Curving Petal */}
          <path
            d="M 21,8 C 26,7 30,10 32,14 C 28,15 24,13 21,10 Z"
            fill={accentPrimary}
          />
          {/* Outer Accents */}
          <circle cx="4" cy="13" r="1.4" fill={accentPrimary} />
          <circle cx="36" cy="13" r="1.4" fill={accentPrimary} />
        </svg>

        <span
          className="w-8 sm:w-14 md:w-16 h-[1px] opacity-60 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="w-1 h-1 rotate-45 opacity-60 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
      </div>
    </div>
  );
};
