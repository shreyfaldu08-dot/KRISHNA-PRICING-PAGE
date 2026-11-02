"use client";

import React from "react";
import { CatalogueData } from "@/types/pricing";
import { CheckCircle2, Calendar } from "lucide-react";

interface TemplateProps {
  data: CatalogueData;
}

export const ContemporaryTemplate: React.FC<TemplateProps> = ({ data }) => {
  const cleanTinPrice = (val: string) =>
    (val || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();
  const cleanPrice = (val: string) => (val || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="relative w-full h-full bg-white text-slate-900 p-4 sm:p-5 flex flex-col justify-between select-text overflow-hidden font-sans">
      {/* Top Gradient Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"></div>

      {/* HEADER */}
      <div className="text-center pt-1">
        {/* Top Hindi Auspicious Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 font-devanagari font-bold text-xs sm:text-sm shadow-2xs mb-1">
          <span>✨</span>
          <span>{data.religiousHeading || "जय श्री कृष्णा"}</span>
          <span>✨</span>
        </div>

        {/* Brand Name */}
        <h1 className="text-xl sm:text-2xl md:text-[28px] font-black tracking-tight text-slate-950 uppercase leading-none mt-1">
          {data.brandName || "KRISHNA EXPORT. INDUSTRIES"}
        </h1>

        {/* Subtitle & Date Badge */}
        <div className="flex items-center justify-center gap-2 mt-1.5 text-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {data.subtitle || "PRODUCT COLLECTION & WHOLESALE PRICE LIST"}
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px]">
            <Calendar className="w-3 h-3 text-amber-600" />
            <span>{data.date}</span>
          </span>
        </div>
      </div>

      {/* PRODUCTS SHOWCASE */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 my-auto items-stretch">
        {/* LEFT PRODUCT: TRUPTI */}
        <div className="bg-slate-50/80 rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 flex flex-col justify-between shadow-2xs">
          {/* Photo */}
          <div className="w-full aspect-[1/1] rounded-xl overflow-hidden bg-white border border-slate-100 shadow-2xs">
            <img
              src={data.trupti.imageSrc}
              alt={data.trupti.brandName}
              className="w-full h-full object-cover object-center select-none block"
            />
          </div>

          {/* Titles */}
          <div className="text-center mt-2">
            <h3 className="font-black text-base sm:text-lg md:text-xl text-slate-900 tracking-tight leading-none">
              {data.trupti.brandName}
            </h3>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-blue-100/70 text-blue-900 font-bold text-[8px] sm:text-[9px] uppercase tracking-wider">
              {data.trupti.subtitle}
            </span>
          </div>

          {/* Wholesale Tin Price */}
          <div className="mt-2 py-1 px-1 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center shadow-xs">
            <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider opacity-90">
              Wholesale Tin Rate
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black tracking-tight">
              ₹ {cleanTinPrice(data.trupti.tinPrice)} <span className="text-[9px] sm:text-[10px] font-bold opacity-80">+ NEW TIN</span>
            </div>
          </div>

          {/* Dual Can Prices */}
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <div className="bg-white rounded-lg p-1 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase block">
                5 LTR Can
              </span>
              <span className="text-sm sm:text-base md:text-lg font-black text-slate-900">
                ₹{cleanPrice(data.trupti.canPrice)}
              </span>
            </div>

            <div className="bg-white rounded-lg p-1 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase block">
                1 LTR Bottle
              </span>
              <span className="text-sm sm:text-base md:text-lg font-black text-slate-900">
                ₹{cleanPrice(data.trupti.bottlePrice)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PRODUCT: KRISHNA */}
        <div className="bg-slate-50/80 rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 flex flex-col justify-between shadow-2xs">
          {/* Photo */}
          <div className="w-full aspect-[1/1] rounded-xl overflow-hidden bg-white border border-slate-100 shadow-2xs">
            <img
              src={data.krishna.imageSrc}
              alt={data.krishna.brandName}
              className="w-full h-full object-cover object-center select-none block"
            />
          </div>

          {/* Titles */}
          <div className="text-center mt-2">
            <h3 className="font-black text-base sm:text-lg md:text-xl text-slate-900 tracking-tight leading-none">
              {data.krishna.brandName}
            </h3>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-amber-100/70 text-amber-900 font-bold text-[8px] sm:text-[9px] uppercase tracking-wider">
              {data.krishna.subtitle}
            </span>
          </div>

          {/* Wholesale Tin Price */}
          <div className="mt-2 py-1 px-1 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center shadow-xs">
            <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider opacity-90">
              Wholesale Tin Rate
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black tracking-tight">
              ₹ {cleanTinPrice(data.krishna.tinPrice)} <span className="text-[9px] sm:text-[10px] font-bold opacity-80">+ NEW TIN</span>
            </div>
          </div>

          {/* Dual Can Prices */}
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <div className="bg-white rounded-lg p-1 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase block">
                5 LTR Can
              </span>
              <span className="text-sm sm:text-base md:text-lg font-black text-slate-900">
                ₹{cleanPrice(data.krishna.canPrice)}
              </span>
            </div>

            <div className="bg-white rounded-lg p-1 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase block">
                1 LTR Bottle
              </span>
              <span className="text-sm sm:text-base md:text-lg font-black text-slate-900">
                ₹{cleanPrice(data.krishna.bottlePrice)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[9px] sm:text-[10.5px] font-bold text-slate-500">
        <span className="flex items-center gap-1 text-emerald-700">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{data.footerNotice || "ALL RATES PLUS GST"}</span>
        </span>
        <span className="text-slate-700 tracking-wider uppercase">
          {data.footerLocation || "EX-FACTORY  |  JUNAGADH"}
        </span>
      </div>
    </div>
  );
};
