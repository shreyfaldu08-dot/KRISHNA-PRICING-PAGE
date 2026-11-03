import React from "react";

interface PriceBoxProps {
  unit: string;
  price: string;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ unit, price }) => {
  const cleanPrice = (price || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="flex-1 bg-[#F4EADD] border border-[#DFCBB5] rounded-xl sm:rounded-2xl p-1 sm:p-2 text-center shadow-xs flex flex-col justify-between">
      {/* Product Quantity */}
      <div className="text-[8px] sm:text-[10px] font-bold text-[#171717] tracking-[0.14em] uppercase">
        {unit}
      </div>

      {/* Thin Horizontal Copper Separator */}
      <div className="w-full h-[1px] bg-[#BD8665] opacity-60 my-0.5 sm:my-1"></div>

      {/* Large Deep Charcoal Price */}
      <div className="font-bold text-base sm:text-xl md:text-[23px] text-[#171717] tracking-tight leading-none pb-0.5">
        ₹{cleanPrice}
      </div>
    </div>
  );
};
