import React from "react";
import { ColorPalette, ProductSelectionMode } from "@/types/pricing";

interface HeaderProps {
  leftCompanyName?: string;
  rightCompanyName?: string;
  brandName?: string;
  subtitle?: string;
  date?: string;
  palette?: ColorPalette;
  productMode?: ProductSelectionMode;
}

export const Header: React.FC<HeaderProps> = ({
  leftCompanyName = "KRISHNA EXPORT. INDUSTRIES",
  rightCompanyName = "SHREE KRISHNA OIL MILL",
  brandName,
  date = "03-11-2026",
  palette,
  productMode = "both",
}) => {
  const leftName = leftCompanyName || brandName || "KRISHNA EXPORT. INDUSTRIES";
  const rightName = rightCompanyName || "SHREE KRISHNA OIL MILL";
  const accentPrimary = palette?.accentPrimary || "#1D4ED8";
  const accentSecondary = palette?.accentSecondary || "#3B82F6";
  const brandNameColor = palette?.brandNameColor || palette?.textCharcoal || "#111827";

  return (
    <div className="px-1">
          {/* SECOND LINE — Prominent Date with Flanking Architectural Lines */}
          <div className="flex items-center justify-center gap-3 my-2">
            <span
              className="w-1.5 h-1.5 rotate-45 opacity-75 shrink-0 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
            />
        <span
              className="w-16 h-[1px] opacity-75 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
            />
        <span
              className="text-[22px] font-extrabold tracking-[0.14em] whitespace-nowrap transition-colors duration-200"
              style={{ color: accentPrimary }}
            >
              {date}
            </span>
            <span
              className="w-16 h-[1px] opacity-75 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
            />
        <span
              className="w-1.5 h-1.5 rotate-45 opacity-75 shrink-0 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
            />
        </div>

        {/* THIRD LINE — Company Name(s): Styled in exact same color as big brand names (TRUPTI & KRISHNA) */}
        {productMode === "cotton" ? (
          <div
            className="font-extrabold text-[12.5px] tracking-[0.05em] uppercase leading-tight text-center mt-1 whitespace-nowrap overflow-visible transition-colors duration-200"
            style={{ color: brandNameColor }}
          >
            {leftName}
          </div>
        ) : productMode === "groundnut" ? (
          <div
            className="font-extrabold text-[12.5px] tracking-[0.05em] uppercase leading-tight text-center mt-1 whitespace-nowrap overflow-visible transition-colors duration-200"
            style={{ color: brandNameColor }}
          >
            {rightName}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 items-baseline text-center mt-1 px-0.5">
            <div
              className="font-extrabold text-[11px] tracking-[0.01em] uppercase leading-tight whitespace-nowrap overflow-visible transition-colors duration-200"
              style={{ color: brandNameColor }}
            >
              {leftName}
            </div>
            <div
              className="font-extrabold text-[11px] tracking-[0.01em] uppercase leading-tight whitespace-nowrap overflow-visible transition-colors duration-200"
              style={{ color: brandNameColor }}
            >
              {rightName}
            </div>
          </div>
        )}
      </div>
      );
};
