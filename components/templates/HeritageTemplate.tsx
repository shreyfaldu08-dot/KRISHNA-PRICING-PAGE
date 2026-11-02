"use client";

import React from "react";
import { CatalogueData } from "@/types/pricing";

interface TemplateProps {
  data: CatalogueData;
}

export const HeritageTemplate: React.FC<TemplateProps> = ({ data }) => {
  const cleanTinPrice = (val: string) =>
    (val || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();
  const cleanPrice = (val: string) => (val || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="relative w-full h-full bg-[#FAF5E8] text-[#29231E] p-3 sm:p-4 flex flex-col justify-between select-text overflow-hidden">
      {/* Ornate Double Border Framing */}
      <div className="absolute inset-2 border-2 border-[#C5A059] rounded-2xl pointer-events-none z-0"></div>
      <div className="absolute inset-3 border border-[#9C4127]/30 rounded-xl pointer-events-none z-0"></div>

      {/* HEADER */}
      <div className="relative z-10 text-center pt-2 px-3">
        {/* Religious Auspicious Blessing */}
        <h2 className="font-devanagari text-[#9C4127] font-bold text-xl sm:text-2xl md:text-[28px] tracking-wide leading-tight">
          {data.religiousHeading || "जय श्री कृष्णा"}
        </h2>

        {/* Traditional Floral Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-0.5 mb-1">
          <span className="w-8 sm:w-16 h-[1.5px] bg-[#C5A059]"></span>
          <img
            src="/assets/ornament.png"
            alt=""
            aria-hidden="true"
            className="h-3 sm:h-3.5 w-auto object-contain mix-blend-multiply select-none"
          />
          <span className="w-8 sm:w-16 h-[1.5px] bg-[#C5A059]"></span>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif-title font-black text-lg sm:text-2xl md:text-[26px] tracking-[0.14em] uppercase text-[#29231E] leading-none">
          {data.brandName || "KRISHNA EXPORT. INDUSTRIES"}
        </h1>

        {/* Subtitle */}
        <div className="font-serif-title text-[8.5px] sm:text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[#735A42] font-bold mt-1">
          {data.subtitle || "PRODUCT COLLECTION & WHOLESALE PRICE LIST"}
        </div>

        {/* Date Plaque */}
        <div className="inline-flex items-center justify-center gap-2 my-1 px-3 py-0.5 rounded-full bg-[#F2E5CC] border border-[#D9C4A2] text-xs font-bold text-[#9C4127] shadow-2xs">
          <span>📅</span>
          <span className="tracking-widest font-serif-title">{data.date}</span>
        </div>
      </div>

      {/* PRODUCT SHOWCASE */}
      <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 my-auto px-2 items-stretch">
        {/* TRUPTI CARD */}
        <div className="flex flex-col justify-between bg-[#FDF9F0] border border-[#DFCBB0] rounded-2xl p-2 sm:p-2.5 shadow-2xs">
          <div className="w-full aspect-[1/1] rounded-xl overflow-hidden bg-[#EFE4D2] border border-[#DFCBB0]/60 shadow-2xs">
            <img
              src={data.trupti.imageSrc}
              alt={data.trupti.brandName}
              className="w-full h-full object-cover object-center select-none block"
            />
          </div>

          <div className="text-center mt-1.5">
            <h3 className="font-serif-title font-black text-base sm:text-xl text-[#29231E] tracking-wider uppercase leading-none">
              {data.trupti.brandName}
            </h3>
            <span className="font-serif-title text-[8px] sm:text-[9.5px] font-bold text-[#8C5D35] tracking-widest uppercase block mt-0.5">
              {data.trupti.subtitle}
            </span>
          </div>

          {/* Wholesale Pill */}
          <div className="w-full mt-1.5 py-1 px-1 rounded-lg bg-[#EFE0C7] border border-[#D9BE9B] text-center shadow-2xs">
            <span className="font-serif-title font-bold text-[10px] sm:text-xs text-[#9C4127] tracking-wider whitespace-nowrap">
              ₹ {cleanTinPrice(data.trupti.tinPrice)} + NEW TIN
            </span>
          </div>

          {/* Dual Price Boxes */}
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <div className="bg-[#FAF2E1] border border-[#D9C4A2] rounded-lg p-1 text-center shadow-2xs">
              <span className="font-serif-title text-[7.5px] sm:text-[9px] font-bold text-[#735A42] uppercase block tracking-wider">
                5 LTR
              </span>
              <div className="w-full h-[1px] bg-[#DFCBB0] my-0.5"></div>
              <span className="font-serif-title font-bold text-sm sm:text-lg text-[#29231E] leading-none block">
                ₹{cleanPrice(data.trupti.canPrice)}
              </span>
            </div>

            <div className="bg-[#FAF2E1] border border-[#D9C4A2] rounded-lg p-1 text-center shadow-2xs">
              <span className="font-serif-title text-[7.5px] sm:text-[9px] font-bold text-[#735A42] uppercase block tracking-wider">
                1 LTR
              </span>
              <div className="w-full h-[1px] bg-[#DFCBB0] my-0.5"></div>
              <span className="font-serif-title font-bold text-sm sm:text-lg text-[#29231E] leading-none block">
                ₹{cleanPrice(data.trupti.bottlePrice)}
              </span>
            </div>
          </div>
        </div>

        {/* KRISHNA CARD */}
        <div className="flex flex-col justify-between bg-[#FDF9F0] border border-[#DFCBB0] rounded-2xl p-2 sm:p-2.5 shadow-2xs">
          <div className="w-full aspect-[1/1] rounded-xl overflow-hidden bg-[#EFE4D2] border border-[#DFCBB0]/60 shadow-2xs">
            <img
              src={data.krishna.imageSrc}
              alt={data.krishna.brandName}
              className="w-full h-full object-cover object-center select-none block"
            />
          </div>

          <div className="text-center mt-1.5">
            <h3 className="font-serif-title font-black text-base sm:text-xl text-[#29231E] tracking-wider uppercase leading-none">
              {data.krishna.brandName}
            </h3>
            <span className="font-serif-title text-[8px] sm:text-[9.5px] font-bold text-[#8C5D35] tracking-widest uppercase block mt-0.5">
              {data.krishna.subtitle}
            </span>
          </div>

          {/* Wholesale Pill */}
          <div className="w-full mt-1.5 py-1 px-1 rounded-lg bg-[#EFE0C7] border border-[#D9BE9B] text-center shadow-2xs">
            <span className="font-serif-title font-bold text-[10px] sm:text-xs text-[#9C4127] tracking-wider whitespace-nowrap">
              ₹ {cleanTinPrice(data.krishna.tinPrice)} + NEW TIN
            </span>
          </div>

          {/* Dual Price Boxes */}
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <div className="bg-[#FAF2E1] border border-[#D9C4A2] rounded-lg p-1 text-center shadow-2xs">
              <span className="font-serif-title text-[7.5px] sm:text-[9px] font-bold text-[#735A42] uppercase block tracking-wider">
                5 LTR
              </span>
              <div className="w-full h-[1px] bg-[#DFCBB0] my-0.5"></div>
              <span className="font-serif-title font-bold text-sm sm:text-lg text-[#29231E] leading-none block">
                ₹{cleanPrice(data.krishna.canPrice)}
              </span>
            </div>

            <div className="bg-[#FAF2E1] border border-[#D9C4A2] rounded-lg p-1 text-center shadow-2xs">
              <span className="font-serif-title text-[7.5px] sm:text-[9px] font-bold text-[#735A42] uppercase block tracking-wider">
                1 LTR
              </span>
              <div className="w-full h-[1px] bg-[#DFCBB0] my-0.5"></div>
              <span className="font-serif-title font-bold text-sm sm:text-lg text-[#29231E] leading-none block">
                ₹{cleanPrice(data.krishna.bottlePrice)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center pb-2 px-3">
        <div className="flex items-center justify-center gap-2 mb-0.5">
          <span className="flex-1 h-[1px] bg-[#C5A059]/60"></span>
          <span className="font-serif-title font-bold text-[8.5px] sm:text-[10px] text-[#29231E] tracking-widest uppercase whitespace-nowrap">
            {data.footerNotice || "ALL RATES PLUS GST"}
          </span>
          <span className="flex-1 h-[1px] bg-[#C5A059]/60"></span>
        </div>
        <div className="font-serif-title font-bold text-[7.5px] sm:text-[9px] text-[#735A42] tracking-[0.22em] uppercase">
          {data.footerLocation || "EX-FACTORY  |  JUNAGADH"}
        </div>
      </div>
    </div>
  );
};
