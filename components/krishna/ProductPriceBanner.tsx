import React from "react";

interface ProductPriceBannerProps {
  priceText: string;
}

export const ProductPriceBanner: React.FC<ProductPriceBannerProps> = ({ priceText }) => {
  const cleanPrice = (priceText || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();

  return (
    <div className="w-full mt-2 sm:mt-2.5 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full bg-[#F3DCC9] border border-[#E8CBB3] text-center shadow-xs">
      <span className="font-bold text-[11px] sm:text-xs md:text-sm text-[#B83B20] tracking-wide whitespace-nowrap">
        ₹ {cleanPrice} + NEW TIN
      </span>
    </div>
  );
};
