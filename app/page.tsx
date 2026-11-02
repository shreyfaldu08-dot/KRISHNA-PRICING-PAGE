"use client";

import React, { useState, useRef, useEffect } from "react";
import { PricingData, INITIAL_PRICING_DATA } from "@/types/pricing";
import { PricingForm } from "@/components/PricingForm";
import { PriceCardPreview } from "@/components/PriceCardPreview";
import { ExportActions } from "@/components/ExportActions";
import { Sparkles, Eye, Edit3 } from "lucide-react";

export default function DailyPricingLandingPage() {
  const [data, setData] = useState<PricingData>(INITIAL_PRICING_DATA);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [mounted, setMounted] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const savedData = localStorage.getItem("kom_pricing_data");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setData({
          ...parsed,
          date: today,
        });
      } else {
        setData((prev) => ({
          ...prev,
          date: today,
        }));
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
  }, []);

  const handleDataChange = (newData: PricingData) => {
    setData(newData);
    try {
      localStorage.setItem("kom_pricing_data", JSON.stringify(newData));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  };

  const handleReset = () => {
    if (confirm("Reset rates to default sample values?")) {
      const today = new Date().toISOString().split("T")[0];
      setData({
        ...INITIAL_PRICING_DATA,
        date: today,
      });
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans pb-16 selection:bg-amber-100 selection:text-amber-950 overflow-x-hidden">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-amber-600/20">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-950 text-sm sm:text-lg tracking-tight">
                  KRISHNA EXPORT
                </span>
                <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  Daily Rates
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                Wholesale Price Poster Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 bg-white/90 px-3 py-1.5 rounded-xl border border-sky-200 shadow-xs whitespace-nowrap">
              📅 {data.date}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Headline */}
      <section className="py-4 sm:py-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-white/90 text-amber-900 border border-amber-200/80 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Official Wholesale Poster Generator
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Daily Wholesale Price Poster
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Enter today&apos;s rates for Trupti Cottonseed and Krishna Groundnut oil, review the poster, and download.
          </p>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="mt-4 flex lg:hidden bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-sky-200 max-w-xs mx-auto shadow-sm">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "form"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>1. Enter Rates</span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>2. Poster Preview</span>
          </button>
        </div>
      </section>

      {/* Main Form & Preview Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Input Form */}
          <div
            className={`lg:col-span-6 space-y-4 sm:space-y-6 ${
              activeTab === "preview" ? "hidden lg:block" : "block"
            }`}
          >
            <PricingForm
              data={data}
              onChange={handleDataChange}
              onReset={handleReset}
            />

            {/* Quick button to jump to preview on mobile */}
            <div className="block lg:hidden pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xs uppercase tracking-wide shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Poster & Download &gt;</span>
              </button>
            </div>
          </div>

          {/* Right: Export Actions & Live Preview */}
          <div
            className={`lg:col-span-6 space-y-4 sm:space-y-5 ${
              activeTab === "form" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Top Action Bar */}
            <ExportActions
              cardRef={cardRef}
              data={data}
            />

            {/* Live Card Preview Box */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-white shadow-xl shadow-sky-950/5">
              <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                    Live Official Poster Preview
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold">
                  Full HD Quality
                </span>
              </div>

              {/* Perfectly Responsive Container — No horizontal scrollbar! */}
              <div className="w-full flex justify-center">
                <PriceCardPreview ref={cardRef} data={data} />
              </div>

              <p className="text-center text-[10px] sm:text-[11px] text-slate-500 mt-3 font-medium">
                💡 High-resolution image generated at 3x retina clarity for crisp viewing on mobile & WhatsApp.
              </p>
            </div>

            {/* Mobile button to return to editing */}
            <div className="block lg:hidden pt-1">
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className="w-full py-3 px-4 rounded-xl bg-white border border-sky-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>&lt; Back to Edit Prices</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="mt-12 sm:mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 font-medium">
        © 2026 {data.businessName || "KRISHNA EXPORT. INDUSTRIES"} • All Rates Plus GST • Ex-Factory | Junagadh
      </footer>
    </div>
  );
}
