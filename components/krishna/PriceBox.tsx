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
  const priceBoxBorder = palette?.priceBoxBorder || "#C5D9F2";
  const textSupporting = palette?.textSupporting || "#2563EB";
  const accentPrimary = palette?.accentPrimary || "#1D4ED8";
  const accentSecondary = palette?.accentSecondary || "#3B82F6";

  return (
    <div
      className="flex-1 rounded-2xl py-2 px-2 text-center border shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-colors duration-200"
      style={{ backgroundColor: priceBoxBg, borderColor: priceBoxBorder }}
    >
      {/* Product Quantity (Light version of theme color with gentle opacity) */}
      <div
        className="text-[12px] font-extrabold tracking-[0.14em] uppercase opacity-75 transition-colors duration-200 leading-none pt-0.5"
        style={{ color: textSupporting }}
      >
        {unit}
      </div>

      {/* Refined Architectural Separator Line */}
      <div className="w-full flex items-center justify-center my-1">
        <span
          className="w-4/5 h-[1.5px] opacity-65 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        />
      </div>

      {/* High-Contrast Bold Canonical Price */}
      <div
        className="font-black text-[23px] tracking-tight leading-none pt-0.5 pb-0.5 transition-colors duration-200 flex items-center justify-center"
        style={{ color: accentPrimary }}
      >
        <span className="text-base font-bold mr-0.5 opacity-90">
          ₹
        </span>
        <span>{cleanPrice}</span>
      </div>
    </div>
  );
};
