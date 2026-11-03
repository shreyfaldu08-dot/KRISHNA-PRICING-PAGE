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
    <div className="px-2 sm:px-4">
      {/* SECOND LINE — Date with Thin Horizontal Copper Lines */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-1 sm:my-1.5">
        <span
          className="w-1 h-1 rotate-45 opacity-70 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="w-10 sm:w-16 md:w-20 h-[1px] opacity-80 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="text-xs sm:text-sm md:text-base font-bold tracking-[0.14em] whitespace-nowrap transition-colors duration-200"
          style={{ color: accentPrimary }}
        >
          {date}
        </span>
        <span
          className="w-10 sm:w-16 md:w-20 h-[1px] opacity-80 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="w-1 h-1 rotate-45 opacity-70 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
      </div>

      {/* THIRD LINE — Two Horizontally Aligned Company Names (Single Line Guaranteed) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 items-baseline text-center mt-1.5">
        <div
          className="font-bold text-[9.5px] sm:text-[13px] md:text-[14.5px] tracking-[0.04em] sm:tracking-[0.06em] uppercase leading-none whitespace-nowrap overflow-hidden text-ellipsis px-1 transition-colors duration-200"
          style={{ color: textCharcoal }}
        >
          {leftName}
        </div>
        <div
          className="font-bold text-[9.5px] sm:text-[13px] md:text-[14.5px] tracking-[0.04em] sm:tracking-[0.06em] uppercase leading-none whitespace-nowrap overflow-hidden text-ellipsis px-1 transition-colors duration-200"
          style={{ color: textCharcoal }}
        >
          {rightName}
        </div>
      </div>
    </div>
  );
};
