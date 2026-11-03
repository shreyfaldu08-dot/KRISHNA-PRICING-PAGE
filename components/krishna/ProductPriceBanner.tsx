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
  const cleanPrice = (priceText || "")
    .replace(/^₹\s*/, "")
    .replace(/\s*\+\s*NEW\s*TIN/i, "")
    .trim();

  const priceColor = palette?.accentPrimary || "#1D4ED8";
  const borderColor = palette?.priceBoxBorder || palette?.borderColor || "#C5D9F2";
  const badgeBg = palette?.bgCanvas || "#EBF3FC";
  const badgeBorder = palette?.borderColor || "#C5D9F2";
  const badgeText = palette?.accentPrimary || "#1D4ED8";

  return (
    <div
      className="w-full mt-1.5 sm:mt-2.5 py-0.5 sm:py-1.5 px-1.5 sm:px-2.5 rounded-full border text-center shadow-xs transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 bg-white"
      style={{
        borderColor,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* 1. High-Contrast Bold Theme Price — Mobile Scaled & Crisp */}
      <span
        className="font-black text-[9.5px] sm:text-xs md:text-sm tracking-tight sm:tracking-wide whitespace-nowrap transition-colors duration-200 shrink-0"
        style={{ color: priceColor }}
      >
        ₹ {cleanPrice}
      </span>

      {/* 2. Coordinated Theme Pill Badge for '+ NEW TIN' — Mobile Proportional */}
      <span
        className="text-[7.5px] sm:text-[9.5px] md:text-[10px] font-extrabold tracking-tight sm:tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full border whitespace-nowrap transition-colors duration-200 shadow-2xs shrink-0"
        style={{
          backgroundColor: badgeBg,
          borderColor: badgeBorder,
          color: badgeText,
        }}
      >
        + NEW TIN
      </span>
    </div>
  );
};
