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

  // Same elevated color combination as 5L and 1L price cards (Pure white + accent text + matching border & shadow)
  const priceColor = palette?.accentPrimary || "#1D4ED8";
  const borderColor = palette?.priceBoxBorder || palette?.borderColor || "#C5D9F2";
  const bgColor = palette?.priceBoxBg || "#FFFFFF";

  const displayText = cleanPrice ? `₹ ${cleanPrice} + NEW TIN` : "+ NEW TIN";

  return (
    <div
      className="w-full mt-2.5 py-1.5 px-3 rounded-full border text-center transition-all duration-200 flex items-center justify-center bg-white"
      style={{
        backgroundColor: bgColor,
        borderColor,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Combined Single Line Text: Price + NEW TIN (No inner capsule) */}
      <span
        className="font-bold text-[13.5px] tracking-wide whitespace-nowrap transition-colors duration-200 leading-normal"
        style={{ color: priceColor }}
      >
        {displayText}
      </span>
    </div>
  );
};
