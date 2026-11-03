import React from "react";

interface HeaderProps {
  brandName?: string;
  subtitle?: string;
  date?: string;
}

export const Header: React.FC<HeaderProps> = ({
  brandName = "KRISHNA EXPORT. INDUSTRIES",
  subtitle = "PRODUCT COLLECTION & WHOLESALE PRICE LIST",
  date = "30-10-2026",
}) => {
  return (
    <div className="text-center px-2">
      {/* SECTION 03 — Main Brand Heading */}
      <h1 className="font-bold text-lg sm:text-2xl md:text-[26px] tracking-[0.16em] uppercase text-[#1E1B18] leading-tight">
        {brandName}
      </h1>

      {/* Subtitle */}
      <p className="text-[8.5px] sm:text-[10.5px] md:text-[11.5px] tracking-[0.2em] uppercase text-[#5C544B] font-semibold mt-0.5">
        {subtitle}
      </p>

      {/* SECTION 04 — Date with Horizontal Lines */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 my-1 sm:my-1.5">
        <span className="w-8 sm:w-14 h-[1px] bg-[#B88B6B] opacity-70"></span>
        <span className="text-xs sm:text-sm font-bold text-[#A1462B] tracking-[0.14em] whitespace-nowrap">
          {date}
        </span>
        <span className="w-8 sm:w-14 h-[1px] bg-[#B88B6B] opacity-70"></span>
      </div>
    </div>
  );
};
