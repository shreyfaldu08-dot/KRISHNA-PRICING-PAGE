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
  const textCharcoal = palette?.textCharcoal || "#171717";
  const accentSecondary = palette?.accentSecondary || "#BD8665";

  return (
    <div
      className="flex-1 border rounded-xl sm:rounded-2xl p-1 sm:p-2 text-center shadow-xs flex flex-col justify-between transition-colors duration-200"
      style={{ backgroundColor: priceBoxBg, borderColor: priceBoxBorder }}
    >
      {/* Product Quantity */}
      <div
        className="text-[8px] sm:text-[10px] font-bold tracking-[0.14em] uppercase transition-colors duration-200"
        style={{ color: textCharcoal }}
      >
        {unit}
      </div>

      {/* Thin Horizontal Separator */}
      <div
        className="w-full h-[1px] opacity-60 my-0.5 sm:my-1 transition-colors duration-200"
        style={{ backgroundColor: accentSecondary }}
      ></div>

      {/* Large Price */}
      <div
        className="font-bold text-base sm:text-xl md:text-[23px] tracking-tight leading-none pb-0.5 transition-colors duration-200"
        style={{ color: textCharcoal }}
      >
        ₹{cleanPrice}
      </div>
    </div>
  );
};
