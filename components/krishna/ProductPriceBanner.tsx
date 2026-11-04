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
    val15L = val15L || rates.price15L;
    val15kg = val15kg || rates.price15kg;
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
  const neitherShown = !isShow15L && !isShow15kg;

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
        } font-bold tracking-[0.15em] text-center leading-none mb-1.5 opacity-80 transition-colors duration-200`}
        style={{ color: textSupporting }}
      >
        (new tin)
      </div>

      {/* 2. Main Compartments Area - Maintains identical overall card size */}
      {bothShown ? (
        /* Dual Compartments: 15L & 15KG side by side */
        <div className="grid grid-cols-2 items-center flex-1">
          {/* Left Compartment: 15L */}
          <div
            className="text-center pr-2 flex flex-col justify-between border-r"
            style={{ borderColor: `${borderColor}99` }}
          >
            <div
              className={`${
                isHero ? "text-[11px]" : "text-[10px]"
              } font-extrabold tracking-[0.14em] uppercase leading-none opacity-85 transition-colors duration-200`}
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

            <div
              className={`font-black ${
                isHero ? "text-[24px]" : "text-[21px]"
              } tracking-tight leading-none transition-colors duration-200 flex items-center justify-center`}
              style={{ color: priceColor }}
            >
              <span className={`${isHero ? "text-base" : "text-sm"} font-bold mr-0.5 opacity-90`}>₹</span>
              <span>{val15L}</span>
            </div>
          </div>

          {/* Right Compartment: 15KG */}
          <div className="text-center pl-2 flex flex-col justify-between">
            <div
              className={`${
                isHero ? "text-[11px]" : "text-[10px]"
              } font-extrabold tracking-[0.14em] uppercase leading-none opacity-85 transition-colors duration-200`}
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

            <div
              className={`font-black ${
                isHero ? "text-[24px]" : "text-[21px]"
              } tracking-tight leading-none transition-colors duration-200 flex items-center justify-center`}
              style={{ color: priceColor }}
            >
              <span className={`${isHero ? "text-base" : "text-sm"} font-bold mr-0.5 opacity-90`}>₹</span>
              <span>{val15kg}</span>
            </div>
          </div>
        </div>
      ) : (isShow15L || isShow15kg) ? (
        /* Single Price Layout: 15L (or 15KG) then big vertical line then price, placed slightly to the left */
        <div className={`flex items-center justify-center gap-3 flex-1 w-full my-auto py-1 ${isHero ? "-translate-x-3" : "-translate-x-2"}`}>
          {/* Left: 15 LTR or 15 KG */}
          <span
            className={`${
              isHero ? "text-[14.5px]" : "text-[13px]"
            } font-black tracking-[0.12em] uppercase leading-none opacity-90 transition-colors duration-200 shrink-0`}
            style={{ color: textSupporting }}
          >
            {isShow15L ? "15 LTR" : "15 KG"}
          </span>

          {/* Big Vertical Line */}
          <div
            className={`${
              isHero ? "h-9" : "h-7.5"
            } w-[2px] rounded-full opacity-65 transition-colors duration-200 shrink-0`}
            style={{ backgroundColor: accentSecondary }}
          />

          {/* Right: The Price */}
          <span
            className={`font-black ${
              isHero ? "text-[28px]" : "text-[24px]"
            } tracking-tight leading-none transition-colors duration-200 flex items-center shrink-0`}
            style={{ color: priceColor }}
          >
            <span className={`${isHero ? "text-lg" : "text-base"} font-bold mr-0.5 opacity-90`}>₹</span>
            <span>{isShow15L ? val15L : val15kg}</span>
          </span>
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
