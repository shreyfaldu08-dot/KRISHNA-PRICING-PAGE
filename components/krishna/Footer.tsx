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
  const accentSecondary = palette?.accentSecondary || "#3B82F6";
  const textCharcoal = palette?.textCharcoal || "#0F172A";
  const textSupporting = palette?.textSupporting || "#2563EB";

  return (
      <div className="mt-4 pt-2 text-center px-6">
        {/* Horizontal Divider with Centered Notice */}
          <div className="flex items-center justify-center gap-2.5 mb-1">
            <span
              className="w-1.5 h-1.5 rotate-45 opacity-75 shrink-0 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
        />
            <span
              className="flex-1 h-[1px] opacity-75 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
        />
            <span
              className="font-extrabold text-[12.5px] tracking-[0.18em] uppercase whitespace-nowrap px-1 transition-colors duration-200"
              style={{ color: textCharcoal }}
            >
              {notice}
            </span>
            <span
              className="flex-1 h-[1px] opacity-75 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
        />
            <span
              className="w-1.5 h-1.5 rotate-45 opacity-75 shrink-0 transition-colors duration-200"
              style={{ backgroundColor: accentSecondary }}
        />
          </div>

          {/* Location / Terms */}
          <div
            className="font-extrabold text-[10.5px] tracking-[0.24em] uppercase mt-0.5 transition-colors duration-200"
            style={{ color: textSupporting }}
          >
            {location}
          </div>
        </div>
        );
};
