"use client";

import React, { forwardRef } from "react";
import { PricingData } from "@/types/pricing";
import { Phone, MapPin, ShieldCheck, Sparkles } from "lucide-react";

interface PriceCardPreviewProps {
  data: PricingData;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data }, ref) => {
    const formatDate = (dateStr: string) => {
      if (!dateStr) return "";
      try {
        const parts = dateStr.split("-");
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
          return d.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
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
        style={{
          backgroundImage: data.customBgUrl ? `url(${data.customBgUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full max-w-[560px] mx-auto rounded-2xl sm:rounded-3xl bg-white border border-sky-200/90 shadow-xl text-slate-900 font-sans overflow-hidden transition-none"
      >
        {/* Minimal Sky-Blue Gradient Ribbon */}
        <div className="h-2 sm:h-2.5 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400" />

        <div className="p-4 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-slate-200 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-sky-50 to-blue-50 text-sky-800 border border-sky-200/80 mb-1.5 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-500" />
                DAILY WHOLESALE RATES
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                {data.businessName || "K.O.M. EDIBLE OILS"}
              </h1>
              {data.tagline && (
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  {data.tagline}
                </p>
              )}
            </div>

            {/* Date Box */}
            <div className="text-right shrink-0">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 mb-0.5">Date</div>
              <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 text-[11px] sm:text-xs font-black text-sky-900 shadow-xs whitespace-nowrap">
                {formatDate(data.date)}
              </div>
            </div>
          </div>

          {/* Contact & City Bar */}
          <div className="py-2 sm:py-2.5 flex items-center justify-between text-[11px] sm:text-xs text-slate-600 border-b border-slate-100 mb-3 sm:mb-4">
            {data.city && (
              <div className="flex items-center gap-1 font-medium truncate">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600 shrink-0" />
                <span className="truncate">{data.city}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-1 font-bold text-slate-900 shrink-0">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" />
                <span>Call/WA: {data.phone}</span>
              </div>
            )}
          </div>

          {/* Products List */}
          <div className="space-y-3 sm:space-y-4">
            {/* 1) GROUNDNUT OIL */}
            <div className="rounded-xl sm:rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/20 to-blue-50/30 p-3 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-xs">
                    1
                  </span>
                  <div>
                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950">
                      Groundnut Oil
                    </h2>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">સીંગતેલ / मूंगफली</span>
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-sky-200 text-sky-800 shadow-xs">
                  Standard Quality
                </span>
              </div>

              {/* 3 Price Columns */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">Tin (15 Kg/L)</div>
                  <div className="my-1 sm:my-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-600 mr-0.5">₹</span>
                    <span className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
                      {data.groundnutOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-medium">per tin</div>
                </div>

                <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">5 Ltr Can</div>
                  <div className="my-1 sm:my-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-600 mr-0.5">₹</span>
                    <span className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
                      {data.groundnutOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-medium">per can</div>
                </div>

                <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">1 Ltr Bottle</div>
                  <div className="my-1 sm:my-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-600 mr-0.5">₹</span>
                    <span className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
                      {data.groundnutOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-medium">per bottle</div>
                </div>
              </div>
            </div>

            {/* 2) COTTONSEED OIL */}
            <div className="rounded-xl sm:rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/20 to-blue-50/30 p-3 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-xs">
                    2
                  </span>
                  <div>
                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950">
                      Cottonseed Oil
                    </h2>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">કપાસિયા તેલ / कपासिया</span>
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-sky-200 text-sky-800 shadow-xs">
                  Refined Grade
                </span>
              </div>

              {/* 3 Price Columns */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">Tin (15 Kg/L)</div>
                  <div className="my-1 sm:my-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-600 mr-0.5">₹</span>
                    <span className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
                      {data.cottonSeedOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-medium">per tin</div>
                </div>

                <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">5 Ltr Can</div>
                  <div className="my-1 sm:my-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-600 mr-0.5">₹</span>
                    <span className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
                      {data.cottonSeedOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-medium">per can</div>
                </div>

                <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">1 Ltr Bottle</div>
                  <div className="my-1 sm:my-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-600 mr-0.5">₹</span>
                    <span className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
                      {data.cottonSeedOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-medium">per bottle</div>
                </div>
              </div>
            </div>

            {/* Note if entered */}
            {data.note && (
              <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/80 text-[11px] sm:text-xs text-sky-950 font-medium">
                📢 {data.note}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
            <div className="flex items-center gap-1 font-medium truncate">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600 shrink-0" />
              <span className="truncate">{data.terms || "Rates subject to daily market fluctuations"}</span>
            </div>
            <div className="font-bold text-sky-900 shrink-0 ml-2">
              Verified Rates
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
