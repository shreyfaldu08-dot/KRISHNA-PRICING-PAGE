import React from "react";
import { ColorPalette, ProductItem, getWholesaleRates } from "@/types/pricing";

interface ProductPriceBannerProps {
  priceText?: string;
  price15L?: string;
  price15kg?: string;
  show15L?: boolean;
  show15kg?: boolean;
  product?: ProductItem;
  palette?: ColorPalette;
  isHero?: boolean;
}

interface ParsedPrice {
  isRange: boolean;
  part1: string;
  part2: string;
  separator: string;
}

function parsePriceRange(raw: string): ParsedPrice {
  const clean = (raw || "").replace(/^₹\s*/, "").trim();
  if (!clean) return { isRange: false, part1: "", part2: "", separator: "" };

  // Match separators like hyphen -, en-dash –, em-dash —, slash /, or " to "
  const match = clean.match(/^([^\s–\-\/]+)\s*([–\-\/]|to)\s*([^\s–\-\/]+)$/i);
  if (match) {
    return {
      isRange: true,
      part1: match[1].trim(),
      part2: match[3].trim(),
      separator: match[2].trim().toLowerCase() === "to" ? "–" : match[2].trim(),
    };
  }

  // Also split by common range separators if user omitted spaces: e.g. 2435-2445
  const parts = clean.split(/[–\-\/]/);
  if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
    const sep = clean.includes("–") ? "–" : clean.includes("/") ? "/" : "-";
    return {
      isRange: true,
      part1: parts[0].trim(),
      part2: parts[1].trim(),
      separator: sep,
    };
  }

  return {
    isRange: false,
    part1: clean,
    part2: "",
    separator: "",
  };
}

export const ProductPriceBanner: React.FC<ProductPriceBannerProps> = ({
  priceText,
  price15L,
  price15kg,
  show15L,
  show15kg,
  product,
  palette,
  isHero = false,
}) => {
  // Extract clean 15L and 15kg rates & visibility
  let val15L = price15L;
  let val15kg = price15kg;
  let isShow15L = show15L;
  let isShow15kg = show15kg;

  if (product) {
    const rates = getWholesaleRates(product);
    val15L = val15L !== undefined ? val15L : rates.price15L;
    val15kg = val15kg !== undefined ? val15kg : rates.price15kg;
    if (isShow15L === undefined) isShow15L = rates.show15L;
    if (isShow15kg === undefined) isShow15kg = rates.show15kg;
  } else if (priceText) {
    const clean = priceText
      .replace(/^₹\s*/, "")
      .replace(/\s*\+\s*NEW\s*TIN/i, "")
      .trim();
    const parts = clean.split(/[–\-\/]/);
    val15L = val15L || (parts[0] || "").trim();
    val15kg = val15kg || (parts[1] || parts[0] || "").trim();
  }

  if (isShow15L === undefined) isShow15L = true;
  if (isShow15kg === undefined) isShow15kg = true;

  val15L = (val15L || "").replace(/^₹\s*/, "").trim();
  val15kg = (val15kg || "").replace(/^₹\s*/, "").trim();

  // Elevated styling matching 5L and 1L price cards (Pure white + theme border & shadow)
  const priceColor = palette?.accentPrimary || "#1D4ED8";
  const borderColor = palette?.priceBoxBorder || palette?.borderColor || "#C5D9F2";
  const bgColor = palette?.priceBoxBg || "#FFFFFF";
  const textSupporting = palette?.textSupporting || "#2563EB";
  const accentSecondary = palette?.accentSecondary || "#3B82F6";

  const bothShown = isShow15L && isShow15kg;

  // Single unit calculations
  const singleUnitLabel = isShow15L ? "15 LTR" : "15 KG";
  const activeSingleVal = isShow15L ? val15L : val15kg;
  const singleParsed = parsePriceRange(activeSingleVal);
  const unitParts = singleUnitLabel.split(" ");
  const unitNumber = unitParts[0] || "15";
  const unitSuffix = unitParts[1] || (isShow15L ? "LTR" : "KG");

  // Dual unit calculations
  const parsed15L = parsePriceRange(val15L);
  const parsed15kg = parsePriceRange(val15kg);

  return (
    <div
      className={`w-full ${
        isHero ? "mt-2 py-2 px-3 min-h-[80px]" : "mt-2 py-1.5 px-2 min-h-[76px]"
      } rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-all duration-200`}
      style={{
        backgroundColor: bgColor,
        borderColor,
      }}
    >
      {/* 1. Small Top Header: Only "(new tin)" */}
      <div
        className={`${
          isHero ? "text-[10px]" : "text-[9.5px]"
        } font-bold tracking-[0.15em] text-center leading-none mb-1 opacity-70 transition-colors duration-200`}
        style={{ color: textSupporting }}
      >
        (new tin)
      </div>

      {/* 2. Main Compartments Area - Strictly on a SINGLE horizontal line */}
      {bothShown ? (
        /* Dual Compartments: 15L & 15KG side by side — single line in each compartment */
        <div className="grid grid-cols-2 items-center flex-1">
          {/* Left Compartment: 15L */}
          <div
            className="text-center pr-2 flex flex-col justify-between border-r"
            style={{ borderColor: `${borderColor}99` }}
          >
            {/* Lighter, softer 15 LTR heading */}
            <div
              className={`${
                isHero ? "text-[12.5px]" : "text-[11.5px]"
              } font-extrabold tracking-[0.14em] uppercase leading-none opacity-75 transition-colors duration-200`}
              style={{ color: textSupporting }}
            >
              15 LTR
            </div>

            <div className="w-full flex items-center justify-center my-1">
              <span
                className="w-3/4 h-[1px] opacity-45 transition-colors duration-200"
                style={{ backgroundColor: accentSecondary }}
              />
            </div>

            {/* Single horizontal line for 15L */}
            <div
              className={`font-black ${
                isHero
                  ? parsed15L.isRange || val15L.length > 5
                    ? "text-[18px]"
                    : "text-[24px]"
                  : parsed15L.isRange || val15L.length > 5
                    ? "text-[15px]"
                    : "text-[21px]"
              } tracking-tight leading-none transition-colors duration-200 flex items-center justify-center whitespace-nowrap`}
              style={{ color: priceColor }}
            >
              <span className={`${isHero ? "text-sm" : "text-xs"} font-bold mr-0.5 opacity-90`}>₹</span>
              <span>
                {parsed15L.isRange
                  ? `${parsed15L.part1}–${parsed15L.part2}`
                  : val15L}
              </span>
            </div>
          </div>

          {/* Right Compartment: 15KG */}
          <div className="text-center pl-2 flex flex-col justify-between">
            {/* Lighter, softer 15 KG heading */}
            <div
              className={`${
                isHero ? "text-[12.5px]" : "text-[11.5px]"
              } font-extrabold tracking-[0.14em] uppercase leading-none opacity-75 transition-colors duration-200`}
              style={{ color: textSupporting }}
            >
              15 KG
            </div>

            <div className="w-full flex items-center justify-center my-1">
              <span
                className="w-3/4 h-[1px] opacity-45 transition-colors duration-200"
                style={{ backgroundColor: accentSecondary }}
              />
            </div>

            {/* Single horizontal line for 15KG */}
            <div
              className={`font-black ${
                isHero
                  ? parsed15kg.isRange || val15kg.length > 5
                    ? "text-[18px]"
                    : "text-[24px]"
                  : parsed15kg.isRange || val15kg.length > 5
                    ? "text-[15px]"
                    : "text-[21px]"
              } tracking-tight leading-none transition-colors duration-200 flex items-center justify-center whitespace-nowrap`}
              style={{ color: priceColor }}
            >
              <span className={`${isHero ? "text-sm" : "text-xs"} font-bold mr-0.5 opacity-90`}>₹</span>
              <span>
                {parsed15kg.isRange
                  ? `${parsed15kg.part1}–${parsed15kg.part2}`
                  : val15kg}
              </span>
            </div>
          </div>
        </div>
      ) : (isShow15L || isShow15kg) ? (
        /* Single Price Layout: 15L (or 15KG) + Divider + Price on 100% SINGLE horizontal line */
        <div className="flex items-center justify-center gap-3 sm:gap-3.5 flex-1 w-full my-auto px-1 py-0.5">
          {/* Left: 15 LTR or 15 KG stacked as lighter elegant unit badge */}
          <div className="flex flex-col items-center justify-center leading-none shrink-0 text-center select-none opacity-80 transition-colors duration-200">
            <span
              className={`${
                isHero ? "text-[15px]" : "text-[13.5px]"
              } font-extrabold tracking-wider leading-none`}
              style={{ color: textSupporting }}
            >
              {unitNumber}
            </span>
            <span
              className={`${
                isHero ? "text-[11.5px]" : "text-[10.5px]"
              } font-bold tracking-widest leading-none mt-1 uppercase`}
              style={{ color: textSupporting }}
            >
              {unitSuffix}
            </span>
          </div>

          {/* Elegant Vertical Divider Line */}
          <div
            className={`${
              isHero ? "h-9" : "h-8"
            } w-[2px] rounded-full opacity-55 transition-all duration-200 shrink-0 mx-0.5`}
            style={{ backgroundColor: accentSecondary }}
          />

          {/* Right: The Price — 100% SINGLE horizontal line (NEVER goes into 2 lines) */}
          <div
            className={`font-black ${
              isHero
                ? singleParsed.isRange || activeSingleVal.length > 5
                  ? "text-[25px]"
                  : "text-[28px]"
                : singleParsed.isRange || activeSingleVal.length > 5
                  ? "text-[22px]"
                  : "text-[24px]"
            } tracking-tight leading-none transition-colors duration-200 flex items-center shrink-0 whitespace-nowrap select-none`}
            style={{ color: priceColor }}
          >
            <span className={`${isHero ? "text-lg" : "text-base"} font-bold mr-0.5 opacity-90`}>₹</span>
            <span>
              {singleParsed.isRange
                ? `${singleParsed.part1}–${singleParsed.part2}`
                : activeSingleVal}
            </span>
          </div>
        </div>
      ) : (
        /* Fallback if both hidden: keeps card height stable */
        <div className="flex flex-col items-center justify-center flex-1 w-full text-center py-1">
          <span
            className="text-[11px] font-bold tracking-wider uppercase opacity-70"
            style={{ color: textSupporting }}
          >
            RATE ON REQUEST
          </span>
        </div>
      )}
    </div>
  );
};
