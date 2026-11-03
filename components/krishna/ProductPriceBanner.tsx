import React from "react";
import { ColorPalette } from "@/types/pricing";

interface ProductPriceBannerProps {
  priceText: string;
  palette?: ColorPalette;
}

export const ProductPriceBanner: React.FC<ProductPriceBannerProps> = ({
  priceText,
  palette,
}) => {
  const cleanPrice = (priceText || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();
  const pillBg = palette?.pillBg || "#F3DCC9";
  const pillBorder = palette?.pillBorder || "#E8CBB3";
  const accentPrimary = palette?.accentPrimary || "#B83B20";

  return (
    <div
      className="w-full mt-2 sm:mt-2.5 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full border text-center shadow-xs transition-colors duration-200"
      style={{ backgroundColor: pillBg, borderColor: pillBorder }}
    >
      <span
        className="font-bold text-[11px] sm:text-xs md:text-sm tracking-wide whitespace-nowrap transition-colors duration-200"
        style={{ color: accentPrimary }}
      >
        ₹ {cleanPrice} + NEW TIN
      </span>
    </div>
  );
};
