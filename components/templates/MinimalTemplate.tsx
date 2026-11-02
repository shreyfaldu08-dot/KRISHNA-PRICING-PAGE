"use client";

import React from "react";
import { CatalogueData } from "@/types/pricing";

interface TemplateProps {
  data: CatalogueData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const cleanTinPrice = (val: string) =>
    (val || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();
  const cleanPrice = (val: string) => (val || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="relative w-full h-full bg-[#FAF6EE] text-[#24211E] p-3.5 sm:p-5 flex flex-col justify-between select-text overflow-hidden">
      {/* Corner Botanical Illustrations */}
      <img
        src="/assets/botanical-cotton-top.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-1 -left-1 w-20 sm:w-28 pointer-events-none select-none mix-blend-multiply opacity-65 z-0"
      />
      <img
        src="/assets/botanical-peanut-top.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-1 -right-1 w-20 sm:w-28 pointer-events-none select-none mix-blend-multiply opacity-65 z-0"
      />
      <img
        src="/assets/botanical-cotton-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-1 -left-1 w-16 sm:w-24 pointer-events-none select-none mix-blend-multiply opacity-55 z-0"
      />
      <img
        src="/assets/botanical-peanut-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-1 -right-1 w-16 sm:w-24 pointer-events-none select-none mix-blend-multiply opacity-55 z-0"
      />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-center">
        {/* Religious Auspicious Blessing */}
        <h2 className="font-devanagari text-[#A1462B] font-bold text-xl sm:text-2xl md:text-[28px] tracking-wide leading-tight">
          {data.religiousHeading || "जय श्री कृष्णा"}
        </h2>

        {/* Terracotta Floral Ornament with Lines */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-0.5 mb-1.5">
          <span className="w-8 sm:w-14 h-[1px] bg-[#B88B6B] opacity-70"></span>
          <img
            src="/assets/ornament.png"
            alt=""
            aria-hidden="true"
            className="h-2.5 sm:h-3.5 w-auto object-contain mix-blend-multiply select-none"
          />
          <span className="w-8 sm:w-14 h-[1px] bg-[#B88B6B] opacity-70"></span>
        </div>

        {/* Firm / Brand Name */}
        <h1 className="font-serif-title font-bold text-lg sm:text-2xl md:text-[26px] tracking-[0.14em] uppercase text-[#24211E] leading-tight">
          {data.brandName || "KRISHNA EXPORT. INDUSTRIES"}
        </h1>

        {/* Subtitle */}
        <p className="font-serif-title text-[9px] sm:text-[11px] md:text-[12px] tracking-[0.16em] uppercase text-[#57534E] font-semibold mt-0.5">
          {data.subtitle || "PRODUCT COLLECTION & WHOLESALE PRICE LIST"}
        </p>

        {/* Date Line */}
        <div className="flex items-center justify-center gap-3 my-1.5 sm:my-2">
          <span className="w-10 sm:w-16 h-[1px] bg-[#B88B6B] opacity-70"></span>
          <span className="font-serif-title text-xs sm:text-sm font-bold text-[#A1462B] tracking-[0.12em] whitespace-nowrap">
            {data.date}
          </span>
          <span className="w-10 sm:w-16 h-[1px] bg-[#B88B6B] opacity-70"></span>
        </div>
      </div>

      {/* PRODUCT SHOWCASE (2 Symmetrical Columns) */}
      <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-5 my-auto items-stretch">
        {/* PRODUCT 1: TRUPTI (Cotton Seed Refined Oil) */}
        <div className="flex flex-col justify-between">
          {/* Can Studio Photo */}
          <div className="w-full aspect-[1/1] rounded-2xl overflow-hidden bg-[#F2EAE0] shadow-2xs">
            <img
              src={data.trupti.imageSrc}
              alt={data.trupti.brandName}
              className="w-full h-full object-cover object-center select-none block"
            />
          </div>

          {/* Titles */}
          <div className="text-center mt-2 sm:mt-2.5">
            <h3 className="font-serif-title font-bold text-base sm:text-xl md:text-[22px] text-[#24211E] tracking-[0.08em] uppercase leading-none">
              {data.trupti.brandName}
            </h3>
            <p className="font-serif-title text-[8px] sm:text-[9.5px] md:text-[10.5px] font-bold text-[#57534E] tracking-[0.14em] uppercase mt-0.5">
              {data.trupti.subtitle}
            </p>
          </div>

          {/* Wholesale Pill */}
          <div className="w-full mt-1.5 sm:mt-2 py-1 px-1.5 rounded-full bg-[#F3E6D6] text-center shadow-2xs">
            <span className="font-serif-title font-bold text-[10px] sm:text-xs md:text-[13px] text-[#A1462B] tracking-wide whitespace-nowrap">
              ₹ {cleanTinPrice(data.trupti.tinPrice)} + NEW TIN
            </span>
          </div>

          {/* Dual Price Boxes */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
            <div className="bg-[#FDFBF7] border border-[#E5DACD] rounded-xl p-1 sm:p-1.5 text-center shadow-2xs">
              <div className="font-serif-title text-[8px] sm:text-[9.5px] font-bold text-[#57534E] tracking-wider uppercase">
                5 LTR
              </div>
              <div className="w-full h-[1px] bg-[#E8DAC8] my-0.5"></div>
              <div className="font-serif-title font-bold text-sm sm:text-lg md:text-[20px] text-[#24211E] tracking-tight leading-none">
                ₹{cleanPrice(data.trupti.canPrice)}
              </div>
            </div>

            <div className="bg-[#FDFBF7] border border-[#E5DACD] rounded-xl p-1 sm:p-1.5 text-center shadow-2xs">
              <div className="font-serif-title text-[8px] sm:text-[9.5px] font-bold text-[#57534E] tracking-wider uppercase">
                1 LTR
              </div>
              <div className="w-full h-[1px] bg-[#E8DAC8] my-0.5"></div>
              <div className="font-serif-title font-bold text-sm sm:text-lg md:text-[20px] text-[#24211E] tracking-tight leading-none">
                ₹{cleanPrice(data.trupti.bottlePrice)}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT 2: KRISHNA (Groundnut Oil) */}
        <div className="flex flex-col justify-between">
          {/* Can Studio Photo */}
          <div className="w-full aspect-[1/1] rounded-2xl overflow-hidden bg-[#F2EAE0] shadow-2xs">
            <img
              src={data.krishna.imageSrc}
              alt={data.krishna.brandName}
              className="w-full h-full object-cover object-center select-none block"
            />
          </div>

          {/* Titles */}
          <div className="text-center mt-2 sm:mt-2.5">
            <h3 className="font-serif-title font-bold text-base sm:text-xl md:text-[22px] text-[#24211E] tracking-[0.08em] uppercase leading-none">
              {data.krishna.brandName}
            </h3>
            <p className="font-serif-title text-[8px] sm:text-[9.5px] md:text-[10.5px] font-bold text-[#57534E] tracking-[0.14em] uppercase mt-0.5">
              {data.krishna.subtitle}
            </p>
          </div>

          {/* Wholesale Pill */}
          <div className="w-full mt-1.5 sm:mt-2 py-1 px-1.5 rounded-full bg-[#F3E6D6] text-center shadow-2xs">
            <span className="font-serif-title font-bold text-[10px] sm:text-xs md:text-[13px] text-[#A1462B] tracking-wide whitespace-nowrap">
              ₹ {cleanTinPrice(data.krishna.tinPrice)} + NEW TIN
            </span>
          </div>

          {/* Dual Price Boxes */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
            <div className="bg-[#FDFBF7] border border-[#E5DACD] rounded-xl p-1 sm:p-1.5 text-center shadow-2xs">
              <div className="font-serif-title text-[8px] sm:text-[9.5px] font-bold text-[#57534E] tracking-wider uppercase">
                5 LTR
              </div>
              <div className="w-full h-[1px] bg-[#E8DAC8] my-0.5"></div>
              <div className="font-serif-title font-bold text-sm sm:text-lg md:text-[20px] text-[#24211E] tracking-tight leading-none">
                ₹{cleanPrice(data.krishna.canPrice)}
              </div>
            </div>

            <div className="bg-[#FDFBF7] border border-[#E5DACD] rounded-xl p-1 sm:p-1.5 text-center shadow-2xs">
              <div className="font-serif-title text-[8px] sm:text-[9.5px] font-bold text-[#57534E] tracking-wider uppercase">
                1 LTR
              </div>
              <div className="w-full h-[1px] bg-[#E8DAC8] my-0.5"></div>
              <div className="font-serif-title font-bold text-sm sm:text-lg md:text-[20px] text-[#24211E] tracking-tight leading-none">
                ₹{cleanPrice(data.krishna.bottlePrice)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="relative z-10 pt-1 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-0.5">
          <span className="flex-1 h-[1px] bg-[#C4A482] opacity-50"></span>
          <span className="font-serif-title font-bold text-[8.5px] sm:text-[10px] md:text-[11px] text-[#24211E] tracking-[0.16em] uppercase whitespace-nowrap">
            {data.footerNotice || "ALL RATES PLUS GST"}
          </span>
          <span className="flex-1 h-[1px] bg-[#C4A482] opacity-50"></span>
        </div>
        <div className="font-serif-title font-bold text-[8px] sm:text-[9px] md:text-[10px] text-[#57534E] tracking-[0.2em] uppercase">
          {data.footerLocation || "EX-FACTORY  |  JUNAGADH"}
        </div>
      </div>
    </div>
  );
};
