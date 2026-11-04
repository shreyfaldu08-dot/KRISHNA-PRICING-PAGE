"use client";

import React, { useState, useRef, useEffect } from "react";
import { CatalogueData, INITIAL_CATALOGUE_DATA } from "@/types/pricing";
import { PricingForm } from "@/components/PricingForm";
import { TemplateSelector } from "@/components/TemplateSelector";
import { PriceCardPreview } from "@/components/PriceCardPreview";
import { ExportActions } from "@/components/ExportActions";
import { Eye, Edit3, SlidersHorizontal, Image as ImageIcon } from "lucide-react";

export default function DailyPricingStudio() {
  const [data, setData] = useState<CatalogueData>(INITIAL_CATALOGUE_DATA);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [mounted, setMounted] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const formattedDate = `${dd}-${mm}-${yyyy}`;

      const savedData = localStorage.getItem("krishna_catalogue_data");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        delete parsed.customBgUrl;
        delete parsed.templateId;
        delete parsed.cottonSeedOil;
        delete parsed.groundnutOil;

        setData({
          ...INITIAL_CATALOGUE_DATA,
          ...parsed,
          productMode: parsed.productMode || INITIAL_CATALOGUE_DATA.productMode || "both",
          religiousHeading: parsed.religiousHeading || INITIAL_CATALOGUE_DATA.religiousHeading,
          leftCompanyName: parsed.leftCompanyName || parsed.brandName || INITIAL_CATALOGUE_DATA.leftCompanyName,
          rightCompanyName: parsed.rightCompanyName || INITIAL_CATALOGUE_DATA.rightCompanyName,
          brandName: parsed.brandName || parsed.leftCompanyName || INITIAL_CATALOGUE_DATA.brandName,
          subtitle: "",
          theme: parsed.theme || INITIAL_CATALOGUE_DATA.theme,
          customColor: parsed.customColor || INITIAL_CATALOGUE_DATA.customColor,
          footerNotice: parsed.footerNotice || INITIAL_CATALOGUE_DATA.footerNotice,
          footerLocation: parsed.footerLocation || INITIAL_CATALOGUE_DATA.footerLocation,
          date: parsed.date || formattedDate,
          trupti: {
            ...INITIAL_CATALOGUE_DATA.trupti,
            ...(parsed.trupti || {}),
            brandName: parsed.trupti?.brandName || INITIAL_CATALOGUE_DATA.trupti.brandName,
            subtitle: parsed.trupti?.subtitle || INITIAL_CATALOGUE_DATA.trupti.subtitle,
            imageSrc: "/assets/trupti-oil-5l.jpg",
            horizontalImageSrc: "/assets/trupti-oil-horizontal.jpg",
            imageAlt: INITIAL_CATALOGUE_DATA.trupti.imageAlt,
          },
          krishna: {
            ...INITIAL_CATALOGUE_DATA.krishna,
            ...(parsed.krishna || {}),
            brandName: parsed.krishna?.brandName || INITIAL_CATALOGUE_DATA.krishna.brandName,
            subtitle: parsed.krishna?.subtitle || INITIAL_CATALOGUE_DATA.krishna.subtitle,
            imageSrc: "/assets/krishna-groundnut-15kg.jpg",
            horizontalImageSrc: "/assets/krishna-groundnut-horizontal.jpg",
            imageAlt: INITIAL_CATALOGUE_DATA.krishna.imageAlt,
          },
        });
      } else {
        setData((prev) => ({
          ...prev,
          date: formattedDate,
        }));
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
  }, []);

  const handleDataChange = (newData: CatalogueData) => {
    setData(newData);
    try {
      localStorage.setItem("krishna_catalogue_data", JSON.stringify(newData));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  };

  const handleReset = () => {
    if (confirm("Reset rates to reference sample values?")) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const formattedDate = `${dd}-${mm}-${yyyy}`;

      setData({
        ...INITIAL_CATALOGUE_DATA,
        date: formattedDate,
      });
      try {
        localStorage.removeItem("krishna_catalogue_data");
      } catch (e) {
        console.warn("Could not clear localStorage:", e);
      }
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      {/* 1. Ultra-Clean Studio Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs tracking-wider">
              K
            </div>
            <div>
              <div className="flex items-center gap-2 leading-none">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 uppercase">
                  KRISHNA EXPORT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  Daily Pricing Studio
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">
                Junagadh • Edible Oil Daily Wholesale Rates
              </p>
            </div>
          </div>

          {/* Center Date Pill */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
            <span>📅</span>
            <span>{data.date}</span>
          </div>

          {/* Right Live Sync Capsule */}
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Sync</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Mobile Responsive Segmented Switcher */}
      <div className="lg:hidden px-4 pt-3 pb-1">
        <div className="bg-slate-200/80 p-1 rounded-full flex items-center max-w-sm mx-auto border border-slate-300/80">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === "form"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Rate Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === "preview"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Poster Preview</span>
          </button>
        </div>
      </div>

      {/* 3. Main Workspace Grid */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Clean Price Entry Terminal (5 Cols) */}
          <div
            className={`lg:col-span-5 ${activeTab === "preview" ? "hidden lg:block" : "block"
              }`}
          >
            <PricingForm
              data={data}
              onChange={handleDataChange}
              onReset={handleReset}
            />

            {/* Mobile quick action to view result */}
            <div className="block lg:hidden pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className="w-full py-3.5 px-6 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Generated Poster &gt;</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Style Selector (Above) + Artboard Canvas + CTA Actions (Below) (7 Cols) */}
          <div
            className={`lg:col-span-7 space-y-4 ${activeTab === "form" ? "hidden lg:block" : "block"
              }`}
          >
            {/* 1. ABOVE TEMPLATE: Template Style & Color Options */}
            <TemplateSelector data={data} onChange={handleDataChange} />

            {/* 2. CENTER: 4:5 Poster Artboard Frame */}
            <div className="rounded-2xl sm:rounded-3xl p-2.5 sm:p-6 bg-white border border-slate-200/90 shadow-md flex flex-col items-center">
              {/* Artboard Status Meta Header */}
              <div className="w-full flex items-center justify-between pb-2.5 mb-2.5 sm:pb-3 sm:mb-3 border-b border-slate-100 px-1 sm:px-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 uppercase tracking-wider">
                    4:5 Portrait Poster Artboard
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 bg-slate-100 px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-200">
                  1080 × 1350 px (3x Retina)
                </span>
              </div>

              {/* Centered Canvas Container */}
              <div className="w-full flex justify-center py-0.5 sm:py-1">
                <PriceCardPreview ref={cardRef} data={data} activeTab={activeTab} />
              </div>

              {/* Sub-Canvas Note */}
              <p className="text-center text-[10px] sm:text-[11px] text-slate-400 mt-2 sm:mt-3 font-medium">
                Rendered at 3x retina clarity for crisp viewing on mobile & WhatsApp broadcast.
              </p>
            </div>

            {/* 3. BELOW TEMPLATE: Capsule CTA Export Actions */}
            <ExportActions cardRef={cardRef} data={data} />

            {/* Mobile return button */}
            <div className="block lg:hidden pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className="w-full py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>&lt; Back to Price Terminal</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Minimalist Studio Footer */}
      <footer className="mt-10 border-t border-slate-200 py-5 text-center text-[11px] text-slate-400 font-medium">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {data.leftCompanyName || "KRISHNA EXPORT. INDUSTRIES"} • {data.rightCompanyName || "SHREE KRISHNA OIL MILL"}
          </span>
          <span>{data.footerLocation || "JUNAGADH, GUJARAT"} • ALL RATES PLUS GST</span>
        </div>
      </footer>
    </div>
  );
}
