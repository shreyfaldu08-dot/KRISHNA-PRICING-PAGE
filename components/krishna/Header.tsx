import React from "react";
import { ColorPalette } from "@/types/pricing";

interface HeaderProps {
  leftCompanyName?: string;
  rightCompanyName?: string;
  brandName?: string;
  subtitle?: string;
  date?: string;
  palette?: ColorPalette;
}

export const Header: React.FC<HeaderProps> = ({
  leftCompanyName = "KRISHNA EXPORT. INDUSTRIES",
  rightCompanyName = "SHREE KRISHNA OIL MILL",
  brandName,
  subtitle = "PRODUCT COLLECTION & WHOLESALE PRICE LIST",
  date = "30-10-2026",
  palette,
}) => {
  const leftName = leftCompanyName || brandName || "KRISHNA EXPORT. INDUSTRIES";
  const rightName = rightCompanyName || "SHREE KRISHNA OIL MILL";
  const accentPrimary = palette?.accentPrimary || "#B83B20";
  const accentSecondary = palette?.accentSecondary || "#BD8665";
  const textCharcoal = palette?.textCharcoal || "#171717";

  return (
    <div className="px-0.5 sm:px-1">
      {/* SECOND LINE — Prominent Date with Flanking Architectural Lines */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 my-1.5 sm:my-2.5">
        <span
          className="w-1 h-1 rotate-45 opacity-60 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="w-8 sm:w-14 md:w-18 h-[1px] opacity-70 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="text-sm sm:text-lg md:text-[22px] font-extrabold tracking-[0.14em] whitespace-nowrap transition-colors duration-200"
          style={{ color: accentPrimary }}
        >
          {date}
        </span>
        <span
          className="w-8 sm:w-14 md:w-18 h-[1px] opacity-70 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="w-1 h-1 rotate-45 opacity-60 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
      </div>

      {/* THIRD LINE — Two Horizontally Aligned Company Names (Single Line Guaranteed, Fully Visible) */}
      <div className="grid grid-cols-2 gap-1 sm:gap-2 items-baseline text-center mt-1 sm:mt-1.5 px-0.5">
        <div
          className="font-bold text-[8.5px] sm:text-[10px] md:text-[11.5px] tracking-[0.01em] uppercase leading-tight whitespace-nowrap overflow-visible transition-colors duration-200"
          style={{ color: textCharcoal }}
        >
          {leftName}
        </div>
        <div
          className="font-bold text-[8.5px] sm:text-[10px] md:text-[11.5px] tracking-[0.01em] uppercase leading-tight whitespace-nowrap overflow-visible transition-colors duration-200"
          style={{ color: textCharcoal }}
        >
          {rightName}
        </div>
      </div>
    </div>
  );
};
