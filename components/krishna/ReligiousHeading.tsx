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

  return (
    <div className="text-center pt-0.5">
      {/* Sacred Inscription with Prominent Contrast & Theme Color */}
      <h2
        className="font-devanagari font-bold text-xs sm:text-sm md:text-[15px] tracking-[0.16em] uppercase leading-tight transition-colors duration-200"
        style={{ color: accentPrimary }}
      >
        {heading}
      </h2>
    </div>
  );
};
