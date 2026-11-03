import React from "react";

interface HeaderProps {
  leftCompanyName?: string;
  rightCompanyName?: string;
  brandName?: string;
  subtitle?: string;
  date?: string;
}

export const Header: React.FC<HeaderProps> = ({
  leftCompanyName = "KRISHNA EXPORT. INDUSTRIES",
  rightCompanyName = "SHREE KRISHNA OIL MILL",
  brandName,
  subtitle = "PRODUCT COLLECTION & WHOLESALE PRICE LIST",
  date = "30-10-2026",
}) => {
  const leftName = leftCompanyName || brandName || "KRISHNA EXPORT. INDUSTRIES";
  const rightName = rightCompanyName || "SHREE KRISHNA OIL MILL";

  return (
    <div className="px-2 sm:px-4">
      {/* SECOND LINE — Date with Thin Horizontal Copper Lines */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-1 sm:my-1.5">
        <span className="w-10 sm:w-16 md:w-20 h-[1px] bg-[#BD8665] opacity-80"></span>
        <span className="text-xs sm:text-sm md:text-base font-bold text-[#B83B20] tracking-[0.14em] whitespace-nowrap">
          {date}
        </span>
        <span className="w-10 sm:w-16 md:w-20 h-[1px] bg-[#BD8665] opacity-80"></span>
      </div>

      {/* THIRD LINE — Two Horizontally Aligned Company Names */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 items-baseline text-center mt-1">
        <div className="font-bold text-[13px] sm:text-lg md:text-[21px] tracking-[0.12em] uppercase text-[#171717] leading-tight">
          {leftName}
        </div>
        <div className="font-bold text-[13px] sm:text-lg md:text-[21px] tracking-[0.12em] uppercase text-[#171717] leading-tight">
          {rightName}
        </div>
      </div>

      {/* Product Collection Subtitle */}
      {subtitle && (
        <p className="text-center text-[8.5px] sm:text-[10.5px] md:text-[11.5px] tracking-[0.16em] uppercase text-[#39332F] font-semibold mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
