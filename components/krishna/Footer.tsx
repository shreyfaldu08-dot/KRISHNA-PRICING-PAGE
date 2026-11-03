import React from "react";
import { ColorPalette } from "@/types/pricing";

interface FooterProps {
  notice?: string;
  location?: string;
  palette?: ColorPalette;
}

export const Footer: React.FC<FooterProps> = ({
  notice = "ALL RATES PLUS GST",
  location = "EX-FACTORY  |  JUNAGADH",
  palette,
}) => {
  const accentSecondary = palette?.accentSecondary || "#BD8665";
  const textCharcoal = palette?.textCharcoal || "#171717";
  const textSupporting = palette?.textSupporting || "#39332F";

  return (
    <div className="mt-2 sm:mt-4 pt-1 sm:pt-2 text-center px-4 sm:px-6">
      {/* Horizontal Divider with Centered Notice */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-0.5 sm:mb-1">
        <span
          className="w-1 h-1 rotate-45 opacity-70 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="flex-1 h-[1px] opacity-75 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="font-bold text-[9px] sm:text-xs md:text-[13px] tracking-[0.18em] uppercase whitespace-nowrap px-1 transition-colors duration-200"
          style={{ color: textCharcoal }}
        >
          {notice}
        </span>
        <span
          className="flex-1 h-[1px] opacity-75 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
        <span
          className="w-1 h-1 rotate-45 opacity-70 shrink-0 transition-colors duration-200"
          style={{ backgroundColor: accentSecondary }}
        ></span>
      </div>

      {/* Location / Terms */}
      <div
        className="font-bold text-[8px] sm:text-[9.5px] md:text-[11px] tracking-[0.24em] uppercase mt-0.5 transition-colors duration-200"
        style={{ color: textSupporting }}
      >
        {location}
      </div>
    </div>
  );
};
