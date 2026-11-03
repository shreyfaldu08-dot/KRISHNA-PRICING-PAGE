import React from "react";
import { ColorPalette } from "@/types/pricing";

interface PriceBoxProps {
  unit: string;
  price: string;
  palette?: ColorPalette;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ unit, price, palette }) => {
  const cleanPrice = (price || "").replace(/^₹\s*/, "").trim();
  const priceBoxBg = palette?.priceBoxBg || "#F4EADD";
  const priceBoxBorder = palette?.priceBoxBorder || "#DFCBB5";
  const textSupporting = palette?.textSupporting || "#39332F";
  const accentPrimary = palette?.accentPrimary || "#B83B20";
  const accentSecondary = palette?.accentSecondary || "#BD8665";

  return (
    <div
      className="flex-1 border rounded-xl sm:rounded-2xl py-2 sm:py-2.5 px-1.5 sm:px-2 text-center shadow-xs flex flex-col justify-between transition-colors duration-200"
      style={{ backgroundColor: priceBoxBg, borderColor: priceBoxBorder }}
    >
      {/* Product Quantity */}
      <div
        className="text-[8.5px] sm:text-[10px] md:text-[10.5px] font-extrabold tracking-[0.16em] uppercase transition-colors duration-200 leading-none pt-0.5"
        style={{ color: textSupporting }}
      >
        {unit}
      </div>

      {/* Refined Architectural Separator Line with Proper Spacing */}
      <div className="w-full flex items-center justify-center my-1.5 sm:my-2">
        <span
          className="w-3/4 h-[1px] opacity-75 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
      </div>

      {/* High-Contrast Bold Price (Clear clearance from line) */}
      <div
        className="font-black text-base sm:text-xl md:text-[23px] tracking-tight leading-tight pb-0.5 transition-colors duration-200 flex items-center justify-center"
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

