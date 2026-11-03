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

  const priceColor = palette?.pillTextColor || palette?.accentPrimary || "#1D4ED8";
  const borderColor = palette?.pillBorder || palette?.borderColor || "#BFDBFE";
  const bgColor = palette?.pillBg || "#DBEAFE";

  const displayText = cleanPrice ? `₹ ${cleanPrice} + NEW TIN` : "+ NEW TIN";

  return (
    <div
      className="w-full mt-2.5 py-1.5 px-3 rounded-full border text-center shadow-xs transition-all duration-200 flex items-center justify-center"
      style={{
        backgroundColor: bgColor,
        borderColor,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
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
