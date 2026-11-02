"use client";

import React, { forwardRef } from "react";
import { PricingData } from "@/types/pricing";

interface PriceCardPreviewProps {
  data: PricingData;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data }, ref) => {
    // Format date as DD-MM-YYYY
    const formatDisplayDate = (dateStr: string) => {
      if (!dateStr) return "";
      try {
        const parts = dateStr.split("-");
        if (parts.length === 3) {
          if (parts[0].length === 4) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
          return dateStr;
        }
      } catch {
        return dateStr;
      }
      return dateStr;
    };

    return (
      <div
        ref={ref}
        id="price-card-canvas"
        className="relative w-full max-w-[540px] mx-auto rounded-3xl bg-[#faf6f0] border border-[#e5dcce] shadow-2xl text-slate-900 overflow-hidden font-serif select-none p-5 sm:p-7 transition-none"
        style={{
          boxShadow: "0 20px 40px -15px rgba(120, 80, 40, 0.12)",
        }}
      >
        {/* Subtle Decorative Botanical Corner Sketches */}
        <img
          src="/templates/sketch-cotton-top.png"
          alt=""
          className="absolute top-2 left-0 w-24 sm:w-28 opacity-60 pointer-events-none mix-blend-multiply"
        />
        <img
          src="/templates/sketch-peanut-top.png"
          alt=""
          className="absolute top-2 right-0 w-24 sm:w-28 opacity-60 pointer-events-none mix-blend-multiply"
        />
        <img
          src="/templates/sketch-cotton-bottom.png"
          alt=""
          className="absolute bottom-0 left-0 w-20 sm:w-24 opacity-60 pointer-events-none mix-blend-multiply"
        />
        <img
          src="/templates/sketch-peanut-bottom.png"
          alt=""
          className="absolute bottom-0 right-0 w-20 sm:w-24 opacity-60 pointer-events-none mix-blend-multiply"
        />

        {/* 1. Header Section */}
        <div className="relative z-10 text-center pb-3">
          {/* Top Hindi Heading */}
          <div className="text-[#a44222] font-semibold text-lg sm:text-2xl tracking-wider">
            जय श्री कृष्णा
          </div>

          {/* Traditional Floral Ornament */}
          <div className="flex items-center justify-center gap-1.5 text-[#a44222] my-1 opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a44222]"></span>
            <span className="text-sm">✤</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#a44222]"></span>
          </div>

          {/* Firm Name */}
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-black uppercase tracking-widest text-[#1c1917] mt-1 leading-tight">
            {data.businessName || "KRISHNA EXPORT. INDUSTRIES"}
          </h1>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#57534e] mt-1">
            {data.tagline || "PRODUCT COLLECTION & WHOLESALE PRICE LIST"}
          </p>

          {/* Date Divider with Lines */}
          <div className="flex items-center justify-center gap-3 my-2 text-xs sm:text-sm font-bold text-[#292524]">
            <span className="w-12 sm:w-16 h-[1px] bg-[#9ca3af]"></span>
            <span className="tracking-widest">{formatDisplayDate(data.date)}</span>
            <span className="w-12 sm:w-16 h-[1px] bg-[#9ca3af]"></span>
          </div>
        </div>

        {/* 2. Products Section (Pure HTML 2-Column Grid) */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5 sm:gap-5 mt-1">
          {/* LEFT PRODUCT: TRUPTI COTTON SEED OIL */}
          <div className="flex flex-col">
            {/* Can Photo Card with rounded corners and shadow */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#e2d8cb] aspect-[378/430] bg-[#eee4d6]">
              <img
                src="/templates/can-cottonseed.jpg"
                alt="Trupti Cotton Seed Refined Oil"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Title */}
            <div className="text-center mt-2.5 sm:mt-3">
              <h2 className="text-lg sm:text-2xl font-black text-[#1c1917] tracking-wider uppercase leading-none">
                TRUPTI
              </h2>
              <p className="text-[8px] sm:text-[10px] font-bold text-[#57534e] tracking-widest uppercase mt-0.5">
                COTTON SEED REFINED OIL
              </p>
            </div>

            {/* Tin Price Pill */}
            <div className="mt-2 py-1.5 px-2 rounded-full bg-[#f4e7d7] border border-[#e8d5be] text-center shadow-xs">
              <span className="text-[11px] sm:text-[13px] md:text-[14px] font-black text-[#8c3e1e] tracking-wide whitespace-nowrap">
                ₹ {data.cottonSeedOil.tinPrice || "—"} + NEW TIN
              </span>
            </div>

            {/* Sub-boxes for 5 LTR & 1 LTR */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              {/* 5 LTR */}
              <div className="bg-[#fdfbf7] border border-[#e8d7c2] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center shadow-xs">
                <div className="text-[9px] sm:text-[10px] font-bold text-[#78716c] tracking-wider uppercase">
                  5 LTR
                </div>
                <div className="text-base sm:text-xl font-black text-[#1c1917] mt-0.5 tracking-tight">
                  ₹{data.cottonSeedOil.canPrice || "—"}
                </div>
              </div>

              {/* 1 LTR */}
              <div className="bg-[#fdfbf7] border border-[#e8d7c2] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center shadow-xs">
                <div className="text-[9px] sm:text-[10px] font-bold text-[#78716c] tracking-wider uppercase">
                  1 LTR
                </div>
                <div className="text-base sm:text-xl font-black text-[#1c1917] mt-0.5 tracking-tight">
                  ₹{data.cottonSeedOil.bottlePrice || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT: KRISHNA GROUNDNUT OIL */}
          <div className="flex flex-col">
            {/* Can Photo Card with rounded corners and shadow */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#e2d8cb] aspect-[378/430] bg-[#eee4d6]">
              <img
                src="/templates/can-groundnut.jpg"
                alt="Krishna Groundnut Oil"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Title */}
            <div className="text-center mt-2.5 sm:mt-3">
              <h2 className="text-lg sm:text-2xl font-black text-[#1c1917] tracking-wider uppercase leading-none">
                KRISHNA
              </h2>
              <p className="text-[8px] sm:text-[10px] font-bold text-[#57534e] tracking-widest uppercase mt-0.5">
                GROUNDNUT OIL
              </p>
            </div>

            {/* Tin Price Pill */}
            <div className="mt-2 py-1.5 px-2 rounded-full bg-[#f4e7d7] border border-[#e8d5be] text-center shadow-xs">
              <span className="text-[11px] sm:text-[13px] md:text-[14px] font-black text-[#8c3e1e] tracking-wide whitespace-nowrap">
                ₹ {data.groundnutOil.tinPrice || "—"} + NEW TIN
              </span>
            </div>

            {/* Sub-boxes for 5 LTR & 1 LTR */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              {/* 5 LTR */}
              <div className="bg-[#fdfbf7] border border-[#e8d7c2] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center shadow-xs">
                <div className="text-[9px] sm:text-[10px] font-bold text-[#78716c] tracking-wider uppercase">
                  5 LTR
                </div>
                <div className="text-base sm:text-xl font-black text-[#1c1917] mt-0.5 tracking-tight">
                  ₹{data.groundnutOil.canPrice || "—"}
                </div>
              </div>

              {/* 1 LTR */}
              <div className="bg-[#fdfbf7] border border-[#e8d7c2] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center shadow-xs">
                <div className="text-[9px] sm:text-[10px] font-bold text-[#78716c] tracking-wider uppercase">
                  1 LTR
                </div>
                <div className="text-base sm:text-xl font-black text-[#1c1917] mt-0.5 tracking-tight">
                  ₹{data.groundnutOil.bottlePrice || "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Footer Section (Pure HTML Divider & Text) */}
        <div className="relative z-10 mt-5 pt-3 border-t border-[#d8cdbf] text-center">
          <p className="text-[10px] sm:text-xs font-bold text-[#3e3a35] tracking-widest uppercase">
            ALL RATES PLUS GST
          </p>
          <p className="text-[9px] sm:text-[10px] text-[#78716c] tracking-widest uppercase mt-0.5">
            EX-FACTORY &nbsp; | &nbsp; {data.city || "JUNAGADH"}
          </p>
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
