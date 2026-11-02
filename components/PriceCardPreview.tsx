"use client";

import React, { forwardRef } from "react";
import { PricingData } from "@/types/pricing";
import { Phone, MapPin, Sparkles, ShieldCheck } from "lucide-react";

interface PriceCardPreviewProps {
  data: PricingData;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data }, ref) => {
    // Format date nicely
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

    // Light Theme Gradient Designs
    const themes = {
      "champagne-gold": {
        cardBg: "bg-white",
        cardBorder: "border border-amber-200/80 shadow-2xl shadow-amber-950/10",
        topBanner: "bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500",
        badgeBg: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-200",
        sectionBg: "bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 border-amber-200/70",
        sectionHeaderBg: "bg-gradient-to-r from-amber-100/60 to-transparent",
        itemCardBg: "bg-white border-amber-200/70 shadow-sm",
        itemLabel: "text-amber-800/80 font-bold",
        priceColor: "text-slate-900",
        currencyColor: "text-amber-600 font-bold",
        tagColor: "bg-amber-100/80 text-amber-900 border-amber-300/60",
        footerBg: "bg-gradient-to-r from-amber-50/60 via-slate-50 to-amber-50/60 border-amber-200/60",
        numberBadge: "bg-amber-500 text-white",
      },
      "sunrise-warmth": {
        cardBg: "bg-white",
        cardBorder: "border border-orange-200/80 shadow-2xl shadow-orange-950/10",
        topBanner: "bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500",
        badgeBg: "bg-gradient-to-r from-orange-50 to-rose-50 text-orange-800 border-orange-200",
        sectionBg: "bg-gradient-to-br from-orange-50/50 via-white to-rose-50/20 border-orange-200/70",
        sectionHeaderBg: "bg-gradient-to-r from-orange-100/60 to-transparent",
        itemCardBg: "bg-white border-orange-200/70 shadow-sm",
        itemLabel: "text-orange-800/80 font-bold",
        priceColor: "text-slate-900",
        currencyColor: "text-orange-600 font-bold",
        tagColor: "bg-orange-100/80 text-orange-900 border-orange-300/60",
        footerBg: "bg-gradient-to-r from-orange-50/60 via-slate-50 to-orange-50/60 border-orange-200/60",
        numberBadge: "bg-orange-500 text-white",
      },
      "emerald-breeze": {
        cardBg: "bg-white",
        cardBorder: "border border-emerald-200/80 shadow-2xl shadow-emerald-950/10",
        topBanner: "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400",
        badgeBg: "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-emerald-200",
        sectionBg: "bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/20 border-emerald-200/70",
        sectionHeaderBg: "bg-gradient-to-r from-emerald-100/60 to-transparent",
        itemCardBg: "bg-white border-emerald-200/70 shadow-sm",
        itemLabel: "text-emerald-800/80 font-bold",
        priceColor: "text-slate-900",
        currencyColor: "text-emerald-600 font-bold",
        tagColor: "bg-emerald-100/80 text-emerald-900 border-emerald-300/60",
        footerBg: "bg-gradient-to-r from-emerald-50/60 via-slate-50 to-emerald-50/60 border-emerald-200/60",
        numberBadge: "bg-emerald-600 text-white",
      },
      "custom-image": {
        cardBg: "bg-white/95 backdrop-blur-md",
        cardBorder: "border border-slate-300 shadow-2xl",
        topBanner: "bg-gradient-to-r from-amber-500 to-orange-500",
        badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
        sectionBg: "bg-white/90 border-slate-300",
        sectionHeaderBg: "bg-slate-100/80",
        itemCardBg: "bg-white border-slate-200",
        itemLabel: "text-slate-700 font-bold",
        priceColor: "text-slate-900",
        currencyColor: "text-amber-600 font-bold",
        tagColor: "bg-slate-100 text-slate-800 border-slate-300",
        footerBg: "bg-slate-100/90 border-slate-200",
        numberBadge: "bg-slate-800 text-white",
      },
    };

    const currentKey = data.templateId || "champagne-gold";
    const t = themes[currentKey] || themes["champagne-gold"];

    return (
      <div
        ref={ref}
        id="price-card-canvas"
        style={{
          width: "600px",
          minWidth: "600px",
          backgroundImage: data.customBgUrl ? `url(${data.customBgUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`mx-auto rounded-3xl overflow-hidden ${
          data.customBgUrl ? "relative" : t.cardBg
        } ${t.cardBorder} text-slate-900 font-sans transition-all`}
      >
        {/* Custom background overlay */}
        {data.customBgUrl && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] z-0" />
        )}

        <div className="relative z-10">
          {/* Top Gradient Ribbon */}
          <div className={`h-2.5 w-full ${t.topBanner}`} />

          {/* Header Section */}
          <div className="p-7 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {data.customLogoUrl && (
                  <img
                    src={data.customLogoUrl}
                    alt="Logo"
                    className="w-14 h-14 object-contain rounded-2xl bg-slate-50 p-1.5 border border-slate-200 shadow-sm"
                  />
                )}
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${t.badgeBg} mb-2 shadow-sm`}>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    DAILY WHOLESALE MARKET RATES
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-slate-950">
                    {data.businessName || "K.O.M. EDIBLE OILS"}
                  </h1>
                  {data.tagline && (
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      {data.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Date Box */}
              <div className="shrink-0 text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  DATE
                </div>
                <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-black shadow-sm ${t.badgeBg}`}>
                  {formatDate(data.date)}
                </div>
              </div>
            </div>

            {/* City & Contact Pill Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              {data.city && (
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{data.city}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call / WhatsApp: {data.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Products Container */}
          <div className="px-7 py-3 space-y-4">
            {/* 1) GROUNDNUT OIL */}
            <div className={`rounded-2xl border overflow-hidden ${t.sectionBg} shadow-sm`}>
              <div className={`px-4 py-2.5 ${t.sectionHeaderBg} flex items-center justify-between border-b border-inherit`}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${t.numberBadge}`}>
                    1
                  </span>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-950">
                      Groundnut Oil
                    </h2>
                    <span className="text-[10px] text-amber-800 font-semibold">સીંગતેલ / मूंगफली तेल</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${t.tagColor}`}>
                  Premium Grade
                </span>
              </div>

              {/* 3 Price Cards: Tin, 5L Can, 1L Bottle */}
              <div className="p-3.5 grid grid-cols-3 gap-3">
                {/* Tin */}
                <div className={`p-3 rounded-xl border text-center flex flex-col justify-between ${t.itemCardBg}`}>
                  <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>
                    Tin (15 Kg/L)
                  </div>
                  <div className="my-2">
                    <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                    <span className={`text-2xl font-black tracking-tight ${t.priceColor}`}>
                      {data.groundnutOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">per tin</div>
                </div>

                {/* 5L Can */}
                <div className={`p-3 rounded-xl border text-center flex flex-col justify-between ${t.itemCardBg}`}>
                  <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>
                    5 Ltr Can
                  </div>
                  <div className="my-2">
                    <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                    <span className={`text-2xl font-black tracking-tight ${t.priceColor}`}>
                      {data.groundnutOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">per can</div>
                </div>

                {/* Bottle */}
                <div className={`p-3 rounded-xl border text-center flex flex-col justify-between ${t.itemCardBg}`}>
                  <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>
                    1 Ltr Bottle
                  </div>
                  <div className="my-2">
                    <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                    <span className={`text-2xl font-black tracking-tight ${t.priceColor}`}>
                      {data.groundnutOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">per bottle</div>
                </div>
              </div>
            </div>

            {/* 2) COTTONSEED OIL */}
            <div className={`rounded-2xl border overflow-hidden ${t.sectionBg} shadow-sm`}>
              <div className={`px-4 py-2.5 ${t.sectionHeaderBg} flex items-center justify-between border-b border-inherit`}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${t.numberBadge}`}>
                    2
                  </span>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-950">
                      Cottonseed Oil
                    </h2>
                    <span className="text-[10px] text-emerald-800 font-semibold">કપાસિયા તેલ / कपासिया</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${t.tagColor}`}>
                  Refined Grade
                </span>
              </div>

              {/* 3 Price Cards: Tin, 5L Can, 1L Bottle */}
              <div className="p-3.5 grid grid-cols-3 gap-3">
                {/* Tin */}
                <div className={`p-3 rounded-xl border text-center flex flex-col justify-between ${t.itemCardBg}`}>
                  <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>
                    Tin (15 Kg/L)
                  </div>
                  <div className="my-2">
                    <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                    <span className={`text-2xl font-black tracking-tight ${t.priceColor}`}>
                      {data.cottonSeedOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">per tin</div>
                </div>

                {/* 5L Can */}
                <div className={`p-3 rounded-xl border text-center flex flex-col justify-between ${t.itemCardBg}`}>
                  <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>
                    5 Ltr Can
                  </div>
                  <div className="my-2">
                    <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                    <span className={`text-2xl font-black tracking-tight ${t.priceColor}`}>
                      {data.cottonSeedOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">per can</div>
                </div>

                {/* Bottle */}
                <div className={`p-3 rounded-xl border text-center flex flex-col justify-between ${t.itemCardBg}`}>
                  <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>
                    1 Ltr Bottle
                  </div>
                  <div className="my-2">
                    <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                    <span className={`text-2xl font-black tracking-tight ${t.priceColor}`}>
                      {data.cottonSeedOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">per bottle</div>
                </div>
              </div>
            </div>

            {/* Custom Products if added */}
            {data.customProducts && data.customProducts.length > 0 && (
              data.customProducts.map((p, idx) => (
                <div key={p.id} className={`rounded-2xl border overflow-hidden ${t.sectionBg} shadow-sm`}>
                  <div className={`px-4 py-2.5 ${t.sectionHeaderBg} flex items-center justify-between border-b border-inherit`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${t.numberBadge}`}>
                        {idx + 3}
                      </span>
                      <h2 className="text-sm font-black uppercase tracking-wider text-slate-950">
                        {p.name}
                      </h2>
                    </div>
                  </div>

                  <div className="p-3.5 grid grid-cols-3 gap-3">
                    <div className={`p-3 rounded-xl border text-center ${t.itemCardBg}`}>
                      <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>Tin</div>
                      <div className="my-1.5 font-black text-xl text-slate-900">
                        <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                        {p.tinPrice || "—"}
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl border text-center ${t.itemCardBg}`}>
                      <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>5L Can</div>
                      <div className="my-1.5 font-black text-xl text-slate-900">
                        <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                        {p.canPrice || "—"}
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl border text-center ${t.itemCardBg}`}>
                      <div className={`text-[10px] uppercase tracking-wider ${t.itemLabel}`}>Bottle</div>
                      <div className="my-1.5 font-black text-xl text-slate-900">
                        <span className={`text-xs mr-0.5 ${t.currencyColor}`}>₹</span>
                        {p.bottlePrice || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Note / Terms Box */}
            {data.note && (
              <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 border border-amber-200/80 flex items-start gap-2 shadow-sm">
                <span className="text-amber-600 text-xs mt-0.5 font-bold">📢</span>
                <p className="text-xs text-amber-950 font-semibold leading-relaxed">
                  {data.note}
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className={`mt-2 px-7 py-4 border-t ${t.footerBg} flex items-center justify-between text-[11px] text-slate-600`}>
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{data.terms || "Standard commercial quality • Payment within 48h"}</span>
            </div>
            <div className="font-bold text-slate-900">
              Rates Valid for Today
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
