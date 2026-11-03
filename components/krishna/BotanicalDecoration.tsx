import React from "react";
import { ColorPalette } from "@/types/pricing";
import { CottonSketchSvg } from "./CottonSketchSvg";
import { PeanutSketchSvg } from "./PeanutSketchSvg";

interface BotanicalDecorationProps {
  palette?: ColorPalette;
}

export const BotanicalDecoration: React.FC<BotanicalDecorationProps> = ({ palette }) => {
  const strokeColor = palette?.accentSecondary || "#3B82F6";

  return (
    <>
      {/* 1. UPPER-LEFT CORNER: AUTHENTIC VINTAGE BOTANICAL COTTON PLANT SKETCH */}
      <CottonSketchSvg
        color={strokeColor}
        className="absolute -top-1 -left-1 w-52 pointer-events-none select-none z-0 opacity-16 transition-opacity duration-200"
      />

      {/* 2. UPPER-RIGHT CORNER: AUTHENTIC VINTAGE BOTANICAL GROUNDNUT (PEANUT) SKETCH */}
      <PeanutSketchSvg
        color={strokeColor}
        className="absolute -top-1 -right-1 w-52 pointer-events-none select-none z-0 opacity-16 transition-opacity duration-200"
      />

      {/* 3. LOWER-LEFT CORNER: MINI COTTON SKETCH ACCENT */}
      <CottonSketchSvg
        color={strokeColor}
        className="absolute -bottom-3 -left-3 w-28 pointer-events-none select-none z-0 opacity-12 transition-opacity duration-200"
      />

      {/* 4. LOWER-RIGHT CORNER: MINI GROUNDNUT (PEANUT) SKETCH ACCENT */}
      <PeanutSketchSvg
        color={strokeColor}
        className="absolute -bottom-3 -right-3 w-28 pointer-events-none select-none z-0 opacity-12 transition-opacity duration-200"
      />
    </>
  );
};
