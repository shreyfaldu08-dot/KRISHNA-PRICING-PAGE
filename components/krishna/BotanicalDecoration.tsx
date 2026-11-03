import React from "react";
import { ColorPalette, ProductSelectionMode } from "@/types/pricing";
import { CottonSketchSvg } from "./CottonSketchSvg";
import { PeanutSketchSvg } from "./PeanutSketchSvg";

interface BotanicalDecorationProps {
  palette?: ColorPalette;
  productMode?: ProductSelectionMode;
}

export const BotanicalDecoration: React.FC<BotanicalDecorationProps> = ({
  palette,
  productMode = "both",
}) => {
  const strokeColor = palette?.accentSecondary || "#3B82F6";

  if (productMode === "cotton") {
    return (
      <>
        {/* UPPER-LEFT CORNER: COTTON SKETCH */}
        <CottonSketchSvg
          color={strokeColor}
          className="absolute -top-1 -left-1 w-52 pointer-events-none select-none z-0 opacity-16 transition-opacity duration-200"
        />
        {/* UPPER-RIGHT CORNER: COTTON SKETCH (FLIPPED) */}
        <CottonSketchSvg
          color={strokeColor}
          className="absolute -top-1 -right-1 w-52 pointer-events-none select-none z-0 opacity-16 transition-opacity duration-200 -scale-x-100"
        />
        {/* LOWER CORNERS: SUBTLE COTTON ACCENTS */}
        <CottonSketchSvg
          color={strokeColor}
          className="absolute -bottom-3 -left-3 w-28 pointer-events-none select-none z-0 opacity-12 transition-opacity duration-200"
        />
        <CottonSketchSvg
          color={strokeColor}
          className="absolute -bottom-3 -right-3 w-28 pointer-events-none select-none z-0 opacity-12 transition-opacity duration-200 -scale-x-100"
        />
      </>
    );
  }

  if (productMode === "groundnut") {
    return (
      <>
        {/* UPPER-LEFT CORNER: PEANUT SKETCH (FLIPPED) */}
        <PeanutSketchSvg
          color={strokeColor}
          className="absolute -top-1 -left-1 w-52 pointer-events-none select-none z-0 opacity-16 transition-opacity duration-200 -scale-x-100"
        />
        {/* UPPER-RIGHT CORNER: PEANUT SKETCH */}
        <PeanutSketchSvg
          color={strokeColor}
          className="absolute -top-1 -right-1 w-52 pointer-events-none select-none z-0 opacity-16 transition-opacity duration-200"
        />
        {/* LOWER CORNERS: SUBTLE PEANUT ACCENTS */}
        <PeanutSketchSvg
          color={strokeColor}
          className="absolute -bottom-3 -left-3 w-28 pointer-events-none select-none z-0 opacity-12 transition-opacity duration-200 -scale-x-100"
        />
        <PeanutSketchSvg
          color={strokeColor}
          className="absolute -bottom-3 -right-3 w-28 pointer-events-none select-none z-0 opacity-12 transition-opacity duration-200"
        />
      </>
    );
  }

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
