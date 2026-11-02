"use client";

import React, { useState, useRef, useEffect } from "react";
import { PricingData, INITIAL_PRICING_DATA } from "@/types/pricing";
import { PricingForm } from "@/components/PricingForm";
import { PriceCardPreview } from "@/components/PriceCardPreview";
import { ExportActions } from "@/components/ExportActions";
import { HistoryModal } from "@/components/HistoryModal";
import {
  History,
  HelpCircle,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function DailyPricingLandingPage() {
  const [data, setData] = useState<PricingData>(INITIAL_PRICING_DATA);
  const [history, setHistory] = useState<Array<{ id: string; timestamp: string; data: PricingData }>>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
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

      const savedHistory = localStorage.getItem("kom_pricing_history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
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

  const handleSaveHistory = () => {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      data: { ...data },
    };
    const updated = [newEntry, ...history.slice(0, 29)];
    setHistory(updated);
    try {
      localStorage.setItem("kom_pricing_history", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save history:", e);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear all saved rate history?")) {
      setHistory([]);
      localStorage.removeItem("kom_pricing_history");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-200 selection:bg-neutral-100 selection:text-black font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#09090b]/85 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 text-black flex items-center justify-center font-black text-sm">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                  KOM PRICING
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded bg-neutral-800 text-neutral-400">
                  Minimal Portal
                </span>
              </div>
              <p className="text-[10px] text-neutral-500">
                Groundnut & Cottonseed daily wholesale rates
              </p>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition cursor-pointer"
              title="View saved price logs"
            >
              <History className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">History Log</span>
              {history.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-neutral-700 text-neutral-200 text-[10px] font-semibold">
                  {history.length}
                </span>
              )}
            </button>

            <a
              href="#instructions"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Guide</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="py-6 border-b border-neutral-800/80 bg-[#0d0d10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                  Daily Pricing Engine
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Daily Edible Oil Rates
              </h1>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                Enter today&apos;s Tin, 5L Can, and Bottle prices. Review the clean minimalist card and download high-resolution images for WhatsApp.
              </p>
            </div>

            {/* Quick Rate Indicators */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Groundnut Tin</div>
                <div className="text-base font-bold text-white mt-0.5">
                  ₹{data.groundnutOil.tinPrice || "—"}
                </div>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Cottonseed Tin</div>
                <div className="text-base font-bold text-white mt-0.5">
                  ₹{data.cottonSeedOil.tinPrice || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View Toggle */}
          <div className="mt-4 flex lg:hidden bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                activeTab === "form" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              1. Edit Rates
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                activeTab === "preview" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              2. Preview & Export
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
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

          {/* Right Column: Preview & Actions */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              activeTab === "form" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Export Actions Panel */}
            <ExportActions
              cardRef={cardRef}
              data={data}
              onSaveHistory={handleSaveHistory}
            />

            {/* Live Preview Container */}
            <div className="bg-[#121215] rounded-3xl p-4 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Live Minimalist Card Preview
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500">
                  Exact Export Render
                </span>
              </div>

              {/* Scaled Preview */}
              <div className="overflow-x-auto pb-2 flex justify-center">
                <div className="min-w-[600px] py-1">
                  <PriceCardPreview ref={cardRef} data={data} />
                </div>
              </div>

              <p className="text-center text-[10px] text-neutral-500 mt-3">
                💡 High-resolution image generated at 2.5x retina clarity for crisp viewing on mobile & WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Business Guide & Connections Section */}
        <section id="instructions" className="mt-16 pt-12 border-t border-neutral-800/80 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                Setup & Extensibility
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Business Connections & Integrations
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
              Options ready to connect into your Next.js application:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#121215] border border-neutral-800 space-y-2.5">
              <span className="text-xs font-black text-amber-400">01</span>
              <h3 className="font-bold text-white text-sm">
                Custom Brand Template
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upload your firm&apos;s custom background template image directly to display your genuine branding, watermark, and GSTIN.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121215] border border-neutral-800 space-y-2.5">
              <span className="text-xs font-black text-emerald-400">02</span>
              <h3 className="font-bold text-white text-sm">
                WhatsApp Cloud API
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Connect the official WhatsApp Business Cloud API to dispatch daily rates to all your dealers automatically every morning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121215] border border-neutral-800 space-y-2.5">
              <span className="text-xs font-black text-cyan-400">03</span>
              <h3 className="font-bold text-white text-sm">
                Vercel Live Hosting
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Deploy to Vercel in 2 minutes for a permanent URL accessible by your sales team and staff from anywhere on their smartphones.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={(loadedData) => handleDataChange(loadedData)}
        onClear={handleClearHistory}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-neutral-800 py-6 bg-[#070709]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 {data.businessName || "KOM Edible Oils"}. Clean Minimal Design.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Offline-Ready • Retina PNG Export • 5L Can Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
