import React from "react";

interface PriceBoxProps {
  unit: string;
  price: string;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ unit, price }) => {
  const cleanPrice = (price || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="bg-white border border-[#BFDBFE] rounded-xl p-1 sm:p-1.5 text-center shadow-2xs flex flex-col justify-between">
      {/* Product Quantity in Slate Blue */}
      <div className="text-[8px] sm:text-[9.5px] font-bold text-[#475569] tracking-[0.14em] uppercase">
        {unit}
      </div>

      {/* Thin Horizontal Separator */}
      <div className="w-full h-[1px] bg-[#E2E8F0] my-0.5 sm:my-1"></div>

      {/* Large Dark Navy Price in Bahnschrift */}
      <div className="font-bold text-sm sm:text-lg md:text-[20px] text-[#0F172A] tracking-tight leading-none pb-0.5">
        ₹{cleanPrice}
      </div>
    </div>
  );
};
