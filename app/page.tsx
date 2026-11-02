"use client";

import React, { useState, useRef, useEffect } from "react";
import { PricingData, INITIAL_PRICING_DATA } from "@/types/pricing";
import { PricingForm } from "@/components/PricingForm";
import { PriceCardPreview } from "@/components/PriceCardPreview";
import { ExportActions } from "@/components/ExportActions";
import { HistoryModal } from "@/components/HistoryModal";
import {
  Sparkles,
  Droplets,
  Share2,
  Download,
  Eye,
  CheckCircle2,
  History,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Send,
  Zap,
} from "lucide-react";

export default function DailyPricingLandingPage() {
  const [data, setData] = useState<PricingData>(INITIAL_PRICING_DATA);
  const [history, setHistory] = useState<Array<{ id: string; timestamp: string; data: PricingData }>>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"both" | "form" | "preview">("both");
  const [mounted, setMounted] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Load saved state or history from localStorage if available after mount
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

  // Save current data changes to localStorage
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
    const updated = [newEntry, ...history.slice(0, 29)]; // keep last 30 days
    setHistory(updated);
    try {
      localStorage.setItem("kom_pricing_history", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save history:", e);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to delete all saved rate history?")) {
      setHistory([]);
      localStorage.removeItem("kom_pricing_history");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-amber-500/20">
              <Droplets className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                  KOM PRICING PORTAL
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Daily Dealer Rates
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Generate & share daily Groundnut & Cottonseed oil rates
              </p>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700 transition"
              title="View saved price logs"
            >
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Rate History</span>
              {history.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                  {history.length}
                </span>
              )}
            </button>

            <a
              href="#instructions"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Setup Guide</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner / Highlights bar */}
      <section className="bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 py-6 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Next.js Daily Price Generator
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Edible Oil Daily Rates Dashboard
              </h1>
              <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
                Enter your daily Groundnut Oil & Cottonseed Oil prices below. 
                Preview the instant professional rate card and download it as an image for WhatsApp dealer broadcasts.
              </p>
            </div>

            {/* Quick Stats / Highlights */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-center">
                <div className="text-xs text-neutral-400 font-medium">Groundnut Tin</div>
                <div className="text-lg font-black text-amber-400">
                  ₹{data.groundnutOil.tinPrice || "—"}
                </div>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-center">
                <div className="text-xs text-neutral-400 font-medium">Cottonseed Tin</div>
                <div className="text-lg font-black text-emerald-400">
                  ₹{data.cottonSeedOil.tinPrice || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View Toggle */}
          <div className="mt-4 flex lg:hidden bg-neutral-800 p-1 rounded-xl border border-neutral-700">
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === "form" ? "bg-amber-500 text-black shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              1. Edit Pricing
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === "preview" ? "bg-amber-500 text-black shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              2. Live Preview & Download
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace: Left Form, Right Preview */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (Takes 6 cols) */}
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

          {/* Right Column: Live Card Preview & Export Actions (Takes 6 cols) */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              activeTab === "form" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Export Actions Panel (Download, Copy, WhatsApp) */}
            <ExportActions
              cardRef={cardRef}
              data={data}
              onSaveHistory={handleSaveHistory}
            />

            {/* Live Preview Wrapper */}
            <div className="bg-neutral-800/50 rounded-3xl p-4 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Live Image Preview
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">
                  Exact image rendered on download
                </span>
              </div>

              {/* Scrollable / Scaled Preview Container */}
              <div className="overflow-x-auto pb-2 flex justify-center">
                <div className="min-w-[600px] py-1">
                  <PriceCardPreview ref={cardRef} data={data} />
                </div>
              </div>

              <p className="text-center text-[11px] text-neutral-400 mt-3">
                💡 High-resolution image generated at 2.5x retina clarity for crisp viewing on mobile & WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Informative Guidance & Extensibility Section */}
        <section id="instructions" className="mt-16 pt-12 border-t border-neutral-800 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Zap className="w-3.5 h-3.5" />
              Business Setup & Connections
            </div>
            <h2 className="text-2xl font-black text-white">
              What Else Can We Connect or Add For Your Business?
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
              You asked: &quot;tell me if need to do any things in this or to connect any things in this&quot;. 
              Here are the exact enhancements ready to be integrated into this Next.js app:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Custom Logo & Custom Background */}
            <div className="p-6 rounded-3xl bg-neutral-800/50 border border-neutral-700/60 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-white text-base">
                Custom Brand Logo & Background
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                If you have an existing image template or company logo file, we can upload it directly into Next.js so your genuine logo, watermark, and GSTIN appear on every exported image.
              </p>
            </div>

            {/* Card 2: WhatsApp Cloud API & Dealer List */}
            <div className="p-6 rounded-3xl bg-neutral-800/50 border border-neutral-700/60 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-white text-base">
                1-Click WhatsApp Broadcast API
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Connect the official WhatsApp Business Cloud API or Twilio to automatically send this image card and rates to 100+ dealers at 9:00 AM every morning with one click.
              </p>
            </div>

            {/* Card 3: Free Custom Domain & Hosting */}
            <div className="p-6 rounded-3xl bg-neutral-800/50 border border-neutral-700/60 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-white text-base">
                Deploy to Vercel / Live Domain
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                This Next.js app can be deployed to Vercel in 2 minutes. You and your staff can open it on your phones anytime at <code>rates.yourcompany.com</code> or a free <code>.vercel.app</code> link.
              </p>
            </div>
          </div>

          {/* Quick FAQ / Daily Workflow */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-800/30 border border-neutral-700/40">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              Your Daily 30-Second Morning Routine
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-300">
              <div className="flex gap-3">
                <span className="font-black text-amber-400 text-sm">01.</span>
                <span>
                  <strong>Open App:</strong> Check the date (auto-selected today), type today&apos;s Tin, Can, and Bottle rates for Groundnut and Cottonseed.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-black text-amber-400 text-sm">02.</span>
                <span>
                  <strong>Review Live Card:</strong> Instantly inspect the real-time card preview and choose your preferred style (Royal Amber, Emerald, or Classic Navy).
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-black text-amber-400 text-sm">03.</span>
                <span>
                  <strong>Download & Share:</strong> Click &quot;Download Image&quot; or &quot;Send on WhatsApp&quot; to forward directly to your dealer broadcast list!
                </span>
              </div>
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
      <footer className="mt-20 border-t border-neutral-800 py-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 {data.businessName || "KOM Edible Oils"}. Built with Next.js & Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Offline-ready • LocalStorage Enabled • Retina Export</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
