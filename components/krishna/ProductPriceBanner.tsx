import React from "react";

interface ProductPriceBannerProps {
  priceText: string;
}

export const ProductPriceBanner: React.FC<ProductPriceBannerProps> = ({ priceText }) => {
  const cleanPrice = (priceText || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();

  return (
    <div className="w-full mt-1.5 sm:mt-2 py-1 px-2 rounded-full bg-[#F5E8D8] border border-[#E5D4C0] text-center shadow-2xs">
      <span className="font-bold text-[10.5px] sm:text-xs md:text-[13px] text-[#9E3B20] tracking-wide whitespace-nowrap">
        ₹ {cleanPrice} + NEW TIN
      </span>
    </div>
  );
};
