"use client";

import React, { useState, useRef, useEffect } from "react";
import { PricingData, INITIAL_PRICING_DATA } from "@/types/pricing";
import { PricingForm } from "@/components/PricingForm";
import { PriceCardPreview } from "@/components/PriceCardPreview";
import { ExportActions } from "@/components/ExportActions";
import { Droplets, Sparkles } from "lucide-react";

export default function DailyPricingLandingPage() {
  const [data, setData] = useState<PricingData>(INITIAL_PRICING_DATA);
  const [activeTab, setActiveTab] = useState<"both" | "form" | "preview">("both");
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
    <div className="min-h-screen text-slate-900 font-sans pb-16 selection:bg-sky-200 selection:text-sky-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b border-sky-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-sky-500/20">
              <Droplets className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-950 text-base sm:text-lg tracking-tight">
                  KOM PRICING PORTAL
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  Daily Rates
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Simple & fast daily oil price generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-white/80 px-3 py-1.5 rounded-xl border border-sky-200 shadow-xs">
              📅 {data.date}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Headline */}
      <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-sky-800 border border-sky-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Daily Price Card Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Generate Today&apos;s Oil Price Card
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Type today&apos;s Groundnut and Cottonseed oil rates on the left, check the preview, and click download.
          </p>
        </div>

        {/* Mobile Tab Toggle */}
        <div className="mt-5 flex lg:hidden bg-white/80 backdrop-blur-md p-1 rounded-2xl border border-sky-200 max-w-sm mx-auto shadow-xs">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              activeTab === "form" ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            1. Enter Rates
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              activeTab === "preview" ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            2. Preview & Download
          </button>
        </div>
      </section>

      {/* Main Form & Preview Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              activeTab === "preview" ? "hidden lg:block" : "block"
            }`}
          >
            <PricingForm
              data={data}
              onChange={handleDataChange}
              onReset={handleReset}
            />
          </div>

          {/* Right: Export Actions & Live Preview */}
          <div
            className={`lg:col-span-6 space-y-5 ${
              activeTab === "form" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Top Action Bar (Download & Share) */}
            <ExportActions
              cardRef={cardRef}
              data={data}
            />

            {/* Live Card Preview Box */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-white shadow-xl shadow-sky-950/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Live Preview (Card to Download)
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold">
                  2.5x Retina Quality
                </span>
              </div>

              {/* Card Container */}
              <div className="overflow-x-auto pb-2 flex justify-center">
                <div className="min-w-[580px] py-1">
                  <PriceCardPreview ref={cardRef} data={data} />
                </div>
              </div>

              <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
                💡 Template customization will be designed afterwards as requested.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 font-medium">
        © 2026 {data.businessName || "KOM Edible Oils"} • Simple & Fast Daily Pricing Engine
      </footer>
    </div>
  );
}
