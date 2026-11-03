import React from "react";
import { ColorPalette } from "@/types/pricing";

interface PriceBoxProps {
  unit: string;
  price: string;
  palette?: ColorPalette;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ unit, price, palette }) => {
  const cleanPrice = (price || "").replace(/^₹\s*/, "").trim();
  const priceBoxBg = palette?.priceBoxBg || "#FFFFFF";
  const priceBoxBorder = palette?.priceBoxBorder || "#E2D6C7";
  const textSupporting = palette?.textSupporting || "#5A4A42";
  const accentPrimary = palette?.accentPrimary || "#B83B20";
  const accentSecondary = palette?.accentSecondary || "#BD8665";

  return (
    <div
      className="flex-1 rounded-xl sm:rounded-2xl py-2 sm:py-2.5 px-1.5 sm:px-2 text-center border shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-colors duration-200"
      style={{ backgroundColor: priceBoxBg, borderColor: priceBoxBorder }}
    >
      {/* Product Quantity */}
      <div
        className="text-[9px] sm:text-[10px] md:text-[10.5px] font-bold tracking-[0.16em] uppercase transition-colors duration-200 leading-none pt-0.5"
        style={{ color: textSupporting }}
      >
        {unit}
      </div>

      {/* Refined Architectural Separator Line with Proper Clearance */}
      <div className="w-full flex items-center justify-center my-1.5 sm:my-2">
        <span
          className="w-4/5 h-[1px] opacity-65 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
      </div>

      {/* High-Contrast Bold Price with Clear Separation from Line */}
      <div
        className="font-black text-base sm:text-xl md:text-[23px] tracking-tight leading-none pt-0.5 pb-0.5 transition-colors duration-200 flex items-center justify-center"
        style={{ color: accentPrimary }}
      >
        <span className="text-xs sm:text-base md:text-lg font-bold mr-0.5 opacity-90">
          ₹
        </span>
        <span>{cleanPrice}</span>
      </div>
    </div>
  );
};
