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
    <div className="text-center px-4">
      {/* SECTION 03 — Main Brand Heading */}
      <h1 className="font-serif-title font-bold text-2xl sm:text-3xl md:text-[34px] tracking-[0.14em] uppercase text-[#292725] leading-tight">
        {brandName}
      </h1>

      {/* Subtitle */}
      <p className="font-serif-title text-[10px] sm:text-[11.5px] md:text-[13px] tracking-[0.16em] uppercase text-[#4A4540] font-semibold mt-1">
        {subtitle}
      </p>

      {/* SECTION 04 — Date with Horizontal Lines */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3">
        <span className="w-12 sm:w-16 md:w-20 h-[1px] bg-[#B88B6B] opacity-80"></span>
        <span className="font-serif-title text-sm sm:text-base md:text-[17px] font-bold text-[#A1462B] tracking-[0.12em] whitespace-nowrap">
          {date}
        </span>
        <span className="w-12 sm:w-16 md:w-20 h-[1px] bg-[#B88B6B] opacity-80"></span>
      </div>
    </div>
  );
};

