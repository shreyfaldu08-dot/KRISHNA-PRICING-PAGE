"use client";

import React, { forwardRef } from "react";
import { PricingData } from "@/types/pricing";
import { Calendar, Phone, MapPin, Sparkles, Droplets, ShieldCheck } from "lucide-react";

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
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }
      } catch {
        return dateStr;
      }
      return dateStr;
    };

    // Theme styles configuration
    const themes = {
      "royal-amber": {
        containerBg: "bg-gradient-to-b from-[#181206] via-[#1c1508] to-[#120d04]",
        cardBorder: "border-2 border-amber-500/40 shadow-2xl shadow-amber-950/50",
        headerBg: "bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500",
        headerText: "text-slate-950",
        headerBadgeBg: "bg-black/80 text-amber-300 border border-amber-400/40",
        sectionBg: "bg-[#251b0b]/90 border border-amber-500/30",
        productHeaderBg: "bg-gradient-to-r from-amber-500/20 to-transparent border-b border-amber-500/20",
        productTitleColor: "text-amber-200",
        productTag: "text-amber-400/80 bg-amber-950/60 border border-amber-700/40",
        itemCardBg: "bg-[#181105] border border-amber-500/30",
        itemLabelColor: "text-amber-300/80",
        priceColor: "text-amber-300",
        currencyColor: "text-amber-400/70",
        divider: "border-amber-500/20",
        footerBg: "bg-[#150f04] border-t border-amber-500/30",
        footerText: "text-amber-200/80",
      },
      "modern-emerald": {
        containerBg: "bg-gradient-to-b from-slate-950 via-[#071d15] to-[#04130d]",
        cardBorder: "border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/50",
        headerBg: "bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500",
        headerText: "text-slate-950",
        headerBadgeBg: "bg-black/80 text-emerald-300 border border-emerald-400/40",
        sectionBg: "bg-[#0b241c]/90 border border-emerald-500/30",
        productHeaderBg: "bg-gradient-to-r from-emerald-500/20 to-transparent border-b border-emerald-500/20",
        productTitleColor: "text-emerald-200",
        productTag: "text-emerald-400/80 bg-emerald-950/60 border border-emerald-700/40",
        itemCardBg: "bg-[#061812] border border-emerald-500/30",
        itemLabelColor: "text-emerald-300/80",
        priceColor: "text-emerald-300",
        currencyColor: "text-emerald-400/70",
        divider: "border-emerald-500/20",
        footerBg: "bg-[#04120e] border-t border-emerald-500/30",
        footerText: "text-emerald-200/80",
      },
      "classic-navy": {
        containerBg: "bg-gradient-to-b from-[#0a1128] via-[#091533] to-[#060c1d]",
        cardBorder: "border-2 border-blue-400/40 shadow-2xl shadow-blue-950/50",
        headerBg: "bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500",
        headerText: "text-white",
        headerBadgeBg: "bg-black/80 text-blue-300 border border-blue-400/40",
        sectionBg: "bg-[#0d1d42]/90 border border-blue-500/30",
        productHeaderBg: "bg-gradient-to-r from-blue-500/20 to-transparent border-b border-blue-500/20",
        productTitleColor: "text-blue-200",
        productTag: "text-blue-300/80 bg-blue-950/60 border border-blue-700/40",
        itemCardBg: "bg-[#071126] border border-blue-500/30",
        itemLabelColor: "text-blue-300/80",
        priceColor: "text-cyan-300",
        currencyColor: "text-blue-400/70",
        divider: "border-blue-500/20",
        footerBg: "bg-[#050b18] border-t border-blue-500/30",
        footerText: "text-blue-200/80",
      },
      "custom-image": {
        containerBg: "bg-neutral-950/85 backdrop-blur-md",
        cardBorder: "border-2 border-amber-400 shadow-2xl",
        headerBg: "bg-neutral-900/90",
        headerText: "text-white",
        headerBadgeBg: "bg-amber-500 text-black",
        sectionBg: "bg-neutral-900/80 border border-white/20 backdrop-blur-sm",
        productHeaderBg: "bg-white/10 border-b border-white/15",
        productTitleColor: "text-amber-300",
        productTag: "text-white bg-black/60 border border-white/30",
        itemCardBg: "bg-black/70 border border-white/20",
        itemLabelColor: "text-amber-200",
        priceColor: "text-yellow-300",
        currencyColor: "text-amber-300",
        divider: "border-white/20",
        footerBg: "bg-black/90 border-t border-white/20",
        footerText: "text-neutral-300",
      },
    };

    const currentTemplateKey = data.templateId || "royal-amber";
    const theme = themes[currentTemplateKey] || themes["royal-amber"];

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
          data.customBgUrl ? "relative" : theme.containerBg
        } ${theme.cardBorder} text-white font-sans transition-all`}
      >
        {/* If custom background is present, add subtle darkening overlay so text is super readable */}
        {data.customBgUrl && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] z-0" />
        )}

        <div className="relative z-10">
          {/* Subtle Decorative Top Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300" />

          {/* Top Header Section */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Optional Custom Logo */}
                {data.customLogoUrl && (
                  <img
                    src={data.customLogoUrl}
                    alt="Logo"
                    className="w-14 h-14 object-contain rounded-xl bg-white/10 p-1 border border-white/20"
                  />
                )}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-2">
                    <Sparkles className="w-3 h-3" />
                    DAILY WHOLESALE MARKET RATES
                  </div>
                  <h1 className="text-3xl font-black tracking-tight uppercase text-white drop-shadow-md">
                    {data.businessName || "K.O.M. EDIBLE OILS"}
                  </h1>
                  {data.tagline && (
                    <p className="text-xs text-neutral-300 mt-0.5 font-medium tracking-wide">
                      {data.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Date Pill Card */}
              <div className="flex flex-col items-end shrink-0">
                <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-right shadow-inner">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    DATE
                  </div>
                  <div className="text-sm font-bold text-white whitespace-nowrap">
                    {formatDate(data.date)}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300">
              {data.city && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{data.city}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Phone className="w-3.5 h-3.5 text-green-400" />
                  <span>Call / WhatsApp: {data.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Items Container */}
          <div className="px-6 py-2 space-y-4">
            {/* PRODUCT 1: GROUNDNUT OIL */}
            <div className={`rounded-2xl overflow-hidden ${theme.sectionBg} shadow-lg`}>
              <div className={`px-4 py-2.5 ${theme.productHeaderBg} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🥜</span>
                  <div>
                    <h2 className={`font-bold text-base tracking-wide uppercase ${theme.productTitleColor}`}>
                      1. Groundnut Oil
                    </h2>
                    <span className="text-[10px] text-amber-300/70 font-medium">સીંગતેલ / मूंगफली तेल</span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.productTag}`}>
                  Premium Quality
                </span>
              </div>

              <div className="p-3 grid grid-cols-3 gap-2.5">
                {/* Tin */}
                <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                    15 Kg / 15 L Tin
                  </div>
                  <div className="my-1.5">
                    <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                      <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                      {data.groundnutOil.tinPrice || "—"}
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-400">per Tin</div>
                </div>

                {/* Can */}
                <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                    15 Ltr Jar / Can
                  </div>
                  <div className="my-1.5">
                    <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                      <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                      {data.groundnutOil.canPrice || "—"}
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-400">per Can</div>
                </div>

                {/* Bottle */}
                <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                    1 Ltr Bottle
                  </div>
                  <div className="my-1.5">
                    <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                      <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                      {data.groundnutOil.bottlePrice || "—"}
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-400">per Bottle / Box</div>
                </div>
              </div>
            </div>

            {/* PRODUCT 2: COTTONSEED OIL */}
            <div className={`rounded-2xl overflow-hidden ${theme.sectionBg} shadow-lg`}>
              <div className={`px-4 py-2.5 ${theme.productHeaderBg} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌿</span>
                  <div>
                    <h2 className={`font-bold text-base tracking-wide uppercase ${theme.productTitleColor}`}>
                      2. Cottonseed Oil
                    </h2>
                    <span className="text-[10px] text-emerald-300/70 font-medium">કપાસિયા તેલ / कपासिया</span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.productTag}`}>
                  Refined Grade
                </span>
              </div>

              <div className="p-3 grid grid-cols-3 gap-2.5">
                {/* Tin */}
                <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                    15 Kg / 15 L Tin
                  </div>
                  <div className="my-1.5">
                    <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                      <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                      {data.cottonSeedOil.tinPrice || "—"}
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-400">per Tin</div>
                </div>

                {/* Can */}
                <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                    15 Ltr Jar / Can
                  </div>
                  <div className="my-1.5">
                    <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                      <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                      {data.cottonSeedOil.canPrice || "—"}
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-400">per Can</div>
                </div>

                {/* Bottle */}
                <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                    1 Ltr Bottle
                  </div>
                  <div className="my-1.5">
                    <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                      <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                      {data.cottonSeedOil.bottlePrice || "—"}
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-400">per Bottle / Box</div>
                </div>
              </div>
            </div>

            {/* Extra Custom Products if added */}
            {data.customProducts && data.customProducts.length > 0 && (
              data.customProducts.map((p, idx) => (
                <div key={p.id} className={`rounded-2xl overflow-hidden ${theme.sectionBg} shadow-lg`}>
                  <div className={`px-4 py-2.5 ${theme.productHeaderBg} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-amber-400" />
                      <h2 className={`font-bold text-base tracking-wide uppercase ${theme.productTitleColor}`}>
                        {idx + 3}. {p.name}
                      </h2>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.productTag}`}>
                      Verified Pure
                    </span>
                  </div>

                  <div className="p-3 grid grid-cols-3 gap-2.5">
                    <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                      <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                        Tin Price
                      </div>
                      <div className="my-1.5">
                        <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                          <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                          {p.tinPrice || "—"}
                        </div>
                      </div>
                      <div className="text-[10px] text-neutral-400">per Tin</div>
                    </div>

                    <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                      <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                        Can Price
                      </div>
                      <div className="my-1.5">
                        <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                          <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                          {p.canPrice || "—"}
                        </div>
                      </div>
                      <div className="text-[10px] text-neutral-400">per Can</div>
                    </div>

                    <div className={`p-2.5 rounded-xl ${theme.itemCardBg} text-center flex flex-col justify-between`}>
                      <div className={`text-[11px] font-semibold uppercase tracking-wider ${theme.itemLabelColor}`}>
                        Bottle Price
                      </div>
                      <div className="my-1.5">
                        <div className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                          <span className={`text-base font-bold mr-0.5 ${theme.currencyColor}`}>₹</span>
                          {p.bottlePrice || "—"}
                        </div>
                      </div>
                      <div className="text-[10px] text-neutral-400">per Bottle</div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Market Remark / Special Note */}
            {data.note && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                <span className="text-amber-400 text-sm mt-0.5">📢</span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    Market Note:
                  </span>
                  <p className="text-xs text-neutral-200 mt-0.5 leading-relaxed font-medium">
                    {data.note}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className={`mt-3 px-6 py-4 ${theme.footerBg}`}>
            {data.terms && (
              <p className="text-[11px] text-neutral-400 text-center mb-2">
                ⚠️ {data.terms}
              </p>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Standard Market Quality Guaranteed</span>
              </div>
              <div className="font-semibold text-white">
                Rates Subject to Daily Market Fluctuations
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
