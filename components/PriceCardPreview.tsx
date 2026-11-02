"use client";

import React, { forwardRef } from "react";
import { PricingData } from "@/types/pricing";
import { Phone, MapPin, Calendar, ShieldCheck } from "lucide-react";

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
          width: "580px",
          minWidth: "580px",
          backgroundImage: data.customBgUrl ? `url(${data.customBgUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="mx-auto rounded-3xl bg-white border-2 border-slate-300 shadow-xl text-slate-900 font-sans overflow-hidden"
      >
        {/* Top Dark Bar for high-contrast official look */}
        <div className="h-2 w-full bg-slate-900" />

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-700 border border-slate-200 mb-1.5">
                DAILY WHOLESALE RATES
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
                {data.businessName || "K.O.M. EDIBLE OILS"}
              </h1>
              {data.tagline && (
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {data.tagline}
                </p>
              )}
            </div>

            {/* Date Box */}
            <div className="text-right shrink-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Date</div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-black text-slate-900 mt-0.5">
                {formatDate(data.date)}
              </div>
            </div>
          </div>

          {/* Contact & City Bar */}
          <div className="py-2.5 flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 mb-4">
            {data.city && (
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{data.city}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Phone className="w-3.5 h-3.5 text-slate-700" />
                <span>Call / WhatsApp: {data.phone}</span>
              </div>
            )}
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {/* 1) GROUNDNUT OIL */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                    1
                  </span>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-950">
                      Groundnut Oil
                    </h2>
                    <span className="text-[10px] text-slate-500 font-semibold">સીંગતેલ / मूंगफली तेल</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                  Standard Quality
                </span>
              </div>

              {/* 3 Price Columns */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Tin (15 Kg/L)</div>
                  <div className="my-1.5">
                    <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                    <span className="text-2xl font-black text-slate-950 tracking-tight">
                      {data.groundnutOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-medium">per tin</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500">5 Ltr Can</div>
                  <div className="my-1.5">
                    <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                    <span className="text-2xl font-black text-slate-950 tracking-tight">
                      {data.groundnutOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-medium">per can</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500">1 Ltr Bottle</div>
                  <div className="my-1.5">
                    <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                    <span className="text-2xl font-black text-slate-950 tracking-tight">
                      {data.groundnutOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-medium">per bottle</div>
                </div>
              </div>
            </div>

            {/* 2) COTTONSEED OIL */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                    2
                  </span>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-950">
                      Cottonseed Oil
                    </h2>
                    <span className="text-[10px] text-slate-500 font-semibold">કપાસિયા તેલ / कपासिया</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                  Refined Grade
                </span>
              </div>

              {/* 3 Price Columns */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Tin (15 Kg/L)</div>
                  <div className="my-1.5">
                    <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                    <span className="text-2xl font-black text-slate-950 tracking-tight">
                      {data.cottonSeedOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-medium">per tin</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500">5 Ltr Can</div>
                  <div className="my-1.5">
                    <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                    <span className="text-2xl font-black text-slate-950 tracking-tight">
                      {data.cottonSeedOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-medium">per can</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500">1 Ltr Bottle</div>
                  <div className="my-1.5">
                    <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                    <span className="text-2xl font-black text-slate-950 tracking-tight">
                      {data.cottonSeedOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-medium">per bottle</div>
                </div>
              </div>
            </div>

            {/* Note if entered */}
            {data.note && (
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
                📢 {data.note}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>{data.terms || "Rates subject to daily market fluctuations"}</span>
            </div>
            <div className="font-bold text-slate-900">
              Verified Rates
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
