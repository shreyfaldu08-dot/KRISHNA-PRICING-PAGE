import React from "react";

interface PriceBoxProps {
  unit: string;
  price: string;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ unit, price }) => {
  const cleanPrice = (price || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="text-center flex-1 px-1 py-0.5">
      {/* Product Unit Label in Slate Blue */}
      <span className="text-[7.5px] sm:text-[9px] font-bold text-[#475569] tracking-widest uppercase block">
        {unit}
      </span>

      {/* Large Dark Navy Price in Bahnschrift */}
      <span className="font-bold text-sm sm:text-lg md:text-[21px] text-[#0F294A] tracking-tight leading-tight block mt-0.5">
        ₹{cleanPrice}
      </span>
    </div>
  );
};
