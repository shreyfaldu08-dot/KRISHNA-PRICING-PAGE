"use client";

import React, { forwardRef } from "react";
import { PricingData } from "@/types/pricing";
import { Calendar, Phone, MapPin, ShieldCheck } from "lucide-react";

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

    // Clean & Premium Minimal Themes
    const themes = {
      "minimal-obsidian": {
        cardBg: "bg-[#0c0c0e]",
        cardBorder: "border border-neutral-800 shadow-2xl",
        textPrimary: "text-neutral-100",
        textSecondary: "text-neutral-400",
        textMuted: "text-neutral-500",
        accent: "text-amber-400",
        accentBadge: "bg-amber-400/10 text-amber-300 border-amber-400/20",
        sectionBg: "bg-[#141418] border border-neutral-800/80",
        itemBg: "bg-[#0f0f13] border border-neutral-800/60",
        itemLabel: "text-neutral-400",
        priceText: "text-white",
        currencyText: "text-amber-400/80",
        divider: "border-neutral-800",
        footerBg: "bg-[#09090b] border-t border-neutral-800/80",
      },
      "porcelain-light": {
        cardBg: "bg-[#ffffff]",
        cardBorder: "border border-neutral-200 shadow-xl",
        textPrimary: "text-neutral-900",
        textSecondary: "text-neutral-600",
        textMuted: "text-neutral-400",
        accent: "text-neutral-900",
        accentBadge: "bg-neutral-100 text-neutral-800 border-neutral-300",
        sectionBg: "bg-[#fafafa] border border-neutral-200",
        itemBg: "bg-white border border-neutral-200/90 shadow-sm",
        itemLabel: "text-neutral-500",
        priceText: "text-neutral-950",
        currencyText: "text-neutral-600",
        divider: "border-neutral-200",
        footerBg: "bg-[#f4f4f5] border-t border-neutral-200",
      },
      "nordic-slate": {
        cardBg: "bg-[#18181b]",
        cardBorder: "border border-zinc-700/60 shadow-2xl",
        textPrimary: "text-zinc-100",
        textSecondary: "text-zinc-400",
        textMuted: "text-zinc-500",
        accent: "text-cyan-400",
        accentBadge: "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",
        sectionBg: "bg-[#202025] border border-zinc-700/50",
        itemBg: "bg-[#161619] border border-zinc-800",
        itemLabel: "text-zinc-400",
        priceText: "text-white",
        currencyText: "text-cyan-400/70",
        divider: "border-zinc-800",
        footerBg: "bg-[#131316] border-t border-zinc-800",
      },
      "custom-image": {
        cardBg: "bg-[#0c0c0e]/90 backdrop-blur-md",
        cardBorder: "border border-neutral-700 shadow-2xl",
        textPrimary: "text-white",
        textSecondary: "text-neutral-300",
        textMuted: "text-neutral-400",
        accent: "text-amber-400",
        accentBadge: "bg-amber-400/20 text-amber-300 border-amber-400/30",
        sectionBg: "bg-black/70 border border-white/10",
        itemBg: "bg-black/80 border border-white/10",
        itemLabel: "text-neutral-300",
        priceText: "text-white",
        currencyText: "text-amber-300",
        divider: "border-white/10",
        footerBg: "bg-black/80 border-t border-white/10",
      },
    };

    const currentKey = data.templateId || "minimal-obsidian";
    const t = themes[currentKey] || themes["minimal-obsidian"];

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
        } ${t.cardBorder} font-sans transition-all`}
      >
        {/* Custom background overlay */}
        {data.customBgUrl && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-0" />
        )}

        <div className="relative z-10 p-7">
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-5 border-b border-neutral-800/60">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                  Daily Wholesale Market Rates
                </span>
              </div>
              <h1 className={`text-2xl font-black tracking-tight uppercase ${t.textPrimary}`}>
                {data.businessName || "K.O.M. EDIBLE OILS"}
              </h1>
              {data.tagline && (
                <p className={`text-xs mt-0.5 font-medium ${t.textSecondary}`}>
                  {data.tagline}
                </p>
              )}
            </div>

            {/* Date Pill */}
            <div className="text-right">
              <div className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400 mb-0.5">
                Date
              </div>
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap ${t.accentBadge}`}>
                {formatDate(data.date)}
              </div>
            </div>
          </div>

          {/* Sub Header: City & Contact */}
          <div className="py-3 flex items-center justify-between text-xs border-b border-neutral-800/40">
            {data.city && (
              <div className={`flex items-center gap-1.5 ${t.textSecondary}`}>
                <MapPin className="w-3.5 h-3.5 opacity-70" />
                <span>{data.city}</span>
              </div>
            )}
            {data.phone && (
              <div className={`flex items-center gap-1.5 font-semibold ${t.textPrimary}`}>
                <Phone className="w-3.5 h-3.5 opacity-80" />
                <span>{data.phone}</span>
              </div>
            )}
          </div>

          {/* Products Container */}
          <div className="py-5 space-y-4">
            {/* 1) GROUNDNUT OIL */}
            <div className={`rounded-2xl p-4 ${t.sectionBg}`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/40">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-amber-400">01</span>
                  <div>
                    <h2 className={`text-sm font-black uppercase tracking-wider ${t.textPrimary}`}>
                      Groundnut Oil
                    </h2>
                    <span className="text-[10px] text-neutral-400 font-medium">સીંગતેલ / मूंगफली तेल</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-neutral-800/60 text-neutral-300">
                  Standard Quality
                </span>
              </div>

              {/* 3 Price Columns: Tin, 5L Can, 1L Bottle */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* 15 Kg / 15 L Tin */}
                <div className={`p-3 rounded-xl ${t.itemBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>
                    Tin (15 Kg/L)
                  </div>
                  <div className="my-1.5">
                    <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                    <span className={`text-xl font-black tracking-tight ${t.priceText}`}>
                      {data.groundnutOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Per Tin</div>
                </div>

                {/* 5 Ltr Can (Changed from 15L to 5L!) */}
                <div className={`p-3 rounded-xl ${t.itemBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>
                    5 Ltr Can
                  </div>
                  <div className="my-1.5">
                    <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                    <span className={`text-xl font-black tracking-tight ${t.priceText}`}>
                      {data.groundnutOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Per Can</div>
                </div>

                {/* 1 Ltr Bottle */}
                <div className={`p-3 rounded-xl ${t.itemBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>
                    1 Ltr Bottle
                  </div>
                  <div className="my-1.5">
                    <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                    <span className={`text-xl font-black tracking-tight ${t.priceText}`}>
                      {data.groundnutOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Per Bottle</div>
                </div>
              </div>
            </div>

            {/* 2) COTTONSEED OIL */}
            <div className={`rounded-2xl p-4 ${t.sectionBg}`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/40">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-emerald-400">02</span>
                  <div>
                    <h2 className={`text-sm font-black uppercase tracking-wider ${t.textPrimary}`}>
                      Cottonseed Oil
                    </h2>
                    <span className="text-[10px] text-neutral-400 font-medium">કપાસિયા તેલ / कपासिया</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-neutral-800/60 text-neutral-300">
                  Refined Grade
                </span>
              </div>

              {/* 3 Price Columns: Tin, 5L Can, 1L Bottle */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* 15 Kg / 15 L Tin */}
                <div className={`p-3 rounded-xl ${t.itemBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>
                    Tin (15 Kg/L)
                  </div>
                  <div className="my-1.5">
                    <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                    <span className={`text-xl font-black tracking-tight ${t.priceText}`}>
                      {data.cottonSeedOil.tinPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Per Tin</div>
                </div>

                {/* 5 Ltr Can (Changed from 15L to 5L!) */}
                <div className={`p-3 rounded-xl ${t.itemBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>
                    5 Ltr Can
                  </div>
                  <div className="my-1.5">
                    <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                    <span className={`text-xl font-black tracking-tight ${t.priceText}`}>
                      {data.cottonSeedOil.canPrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Per Can</div>
                </div>

                {/* 1 Ltr Bottle */}
                <div className={`p-3 rounded-xl ${t.itemBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>
                    1 Ltr Bottle
                  </div>
                  <div className="my-1.5">
                    <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                    <span className={`text-xl font-black tracking-tight ${t.priceText}`}>
                      {data.cottonSeedOil.bottlePrice || "—"}
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Per Bottle</div>
                </div>
              </div>
            </div>

            {/* Additional Custom Products */}
            {data.customProducts && data.customProducts.length > 0 && (
              data.customProducts.map((p, idx) => (
                <div key={p.id} className={`rounded-2xl p-4 ${t.sectionBg}`}>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/40">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-neutral-400">0{idx + 3}</span>
                      <h2 className={`text-sm font-black uppercase tracking-wider ${t.textPrimary}`}>
                        {p.name}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className={`p-3 rounded-xl ${t.itemBg} text-center`}>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>Tin</div>
                      <div className="my-1.5">
                        <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                        <span className={`text-xl font-black ${t.priceText}`}>{p.tinPrice || "—"}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${t.itemBg} text-center`}>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>5 Ltr Can</div>
                      <div className="my-1.5">
                        <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                        <span className={`text-xl font-black ${t.priceText}`}>{p.canPrice || "—"}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${t.itemBg} text-center`}>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${t.itemLabel}`}>Bottle</div>
                      <div className="my-1.5">
                        <span className={`text-xs font-bold mr-0.5 ${t.currencyText}`}>₹</span>
                        <span className={`text-xl font-black ${t.priceText}`}>{p.bottlePrice || "—"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Note / Terms Box */}
            {data.note && (
              <div className="px-4 py-3 rounded-xl bg-neutral-800/30 border border-neutral-800/60 flex items-start gap-2">
                <span className="text-neutral-400 text-xs mt-0.5">•</span>
                <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                  {data.note}
                </p>
              </div>
            )}
          </div>

          {/* Minimalist Footer */}
          <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-400">
            <div>
              {data.terms || "Subject to daily market fluctuations • Standard commercial quality"}
            </div>
            <div className="font-semibold text-neutral-300">
              Verified Rates
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
