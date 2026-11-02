import React from "react";

interface ProductPriceBannerProps {
  priceText: string;
}

export const ProductPriceBanner: React.FC<ProductPriceBannerProps> = ({ priceText }) => {
  const cleanPrice = (priceText || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();
  return (
    <div className="w-full mt-2.5 sm:mt-3 py-1.5 sm:py-2 px-2 sm:px-3 rounded-full bg-[#F3E6D6] text-center shadow-xs">
      <span className="font-serif-title font-bold text-xs sm:text-sm md:text-[15px] text-[#A1462B] tracking-wide whitespace-nowrap">
        ₹ {cleanPrice} + NEW TIN
      </span>
    </div>
  );
};
