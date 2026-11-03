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
      className="w-full mt-2.5 py-1.5 px-3 rounded-full border text-center shadow-xs transition-all duration-200 flex items-center justify-center gap-2 bg-white"
      style={{
        borderColor,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* 1. Canonical Theme Price */}
      <span
        className="font-black text-sm tracking-wide whitespace-nowrap transition-colors duration-200"
        style={{ color: priceColor }}
      >
        ₹ {cleanPrice}
      </span>

      {/* 2. Coordinated Theme Pill Badge for '+ NEW TIN' */}
      <span
        className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border whitespace-nowrap transition-colors duration-200 shadow-2xs"
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
