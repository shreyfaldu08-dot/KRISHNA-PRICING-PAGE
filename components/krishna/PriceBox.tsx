import React from "react";

interface PriceBoxProps {
  unit: string;
  price: string;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ unit, price }) => {
  const cleanPrice = (price || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="flex-1 bg-[#FDF9F3] border border-[#E5D5C2] rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 text-center shadow-xs flex flex-col justify-between">
      {/* Product Quantity */}
      <div className="font-serif-title text-[9px] sm:text-[11px] font-bold text-[#57534E] tracking-[0.14em] uppercase">
        {unit}
      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-[#E8DAC8] my-1 sm:my-1.5"></div>

      {/* Large Dark Charcoal Price */}
      <div className="font-serif-title font-bold text-lg sm:text-2xl md:text-[26px] text-[#292725] tracking-tight leading-none pb-0.5">
        ₹{cleanPrice}
      </div>
    </div>
  );
};
