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

  return (
    <div
      className="w-full mt-2.5 py-1.5 px-3 rounded-full border text-center shadow-xs transition-all duration-200 flex items-center justify-center gap-1.5 bg-white"
      style={{
        borderColor,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Bold Canonical Theme Price */}
      <span
        className="font-black text-sm tracking-wide whitespace-nowrap transition-colors duration-200"
        style={{ color: priceColor }}
      >
        ₹ {cleanPrice}
      </span>

      {/* Clean Direct Text for '+ NEW TIN' without any inner capsule */}
      <span
        className="font-bold text-[11px] tracking-wider uppercase whitespace-nowrap transition-colors duration-200"
        style={{ color: priceColor }}
      >
        + NEW TIN
      </span>
    </div>
  );
};
