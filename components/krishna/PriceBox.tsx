import React from "react";

interface PriceBoxProps {
  unit: string;
  price: string;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ unit, price }) => {
  const cleanPrice = (price || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="bg-[#FFFDF9] border border-[#E5D6C4] rounded-xl p-1 sm:p-1.5 text-center shadow-2xs flex flex-col justify-between">
      {/* Product Quantity */}
      <div className="text-[8px] sm:text-[9.5px] font-bold text-[#574F46] tracking-[0.14em] uppercase">
        {unit}
      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-[#E8DAC8] my-0.5 sm:my-1"></div>

      {/* Large Dark Charcoal Price in Bahnschrift */}
      <div className="font-bold text-sm sm:text-lg md:text-[20px] text-[#1E1B18] tracking-tight leading-none pb-0.5">
        ₹{cleanPrice}
      </div>
    </div>
  );
};
