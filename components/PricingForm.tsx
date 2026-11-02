"use client";

import React, { useState } from "react";
import { CatalogueData, TemplateStyle } from "@/types/pricing";
import {
  Calendar,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Tag,
  Palette,
} from "lucide-react";

interface PricingFormProps {
  data: CatalogueData;
  onChange: (data: CatalogueData) => void;
  onReset: () => void;
}

export const PricingForm: React.FC<PricingFormProps> = ({
  data,
  onChange,
  onReset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateField = <K extends keyof CatalogueData>(
    field: K,
    value: CatalogueData[K]
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const updateTruptiPrice = (
    field: "tinPrice" | "canPrice" | "bottlePrice",
    val: string
  ) => {
    onChange({
      ...data,
      trupti: {
        ...data.trupti,
        [field]: val,
      },
    });
  };

  const updateKrishnaPrice = (
    field: "tinPrice" | "canPrice" | "bottlePrice",
    val: string
  ) => {
    onChange({
      ...data,
      krishna: {
        ...data.krishna,
        [field]: val,
      },
    });
  };

  const setTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formatted = `${dd}-${mm}-${yyyy}`;
    updateField("date", formatted);
  };

  const templates: { id: TemplateStyle; name: string; desc: string; icon: string }[] = [
    {
      id: "minimal",
      name: "Minimal Editorial",
      desc: "Warm ivory, clean serif, natural breathing room",
      icon: "🌿",
    },
    {
      id: "contemporary",
      name: "Studio Clean",
      desc: "Fresh white, high contrast, modern FMCG brochure",
      icon: "✨",
    },
    {
      id: "heritage",
      name: "Heritage Prestige",
      desc: "Saurashtra Mill gold framing & royal terracotta",
      icon: "🏛️",
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-sky-900/5 border border-sky-100/80 space-y-4 sm:space-y-5">
      {/* Top Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Daily Price Updates</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Live Sync
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Type today&apos;s wholesale numbers below. The poster updates automatically.
          </p>
        </div>

        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          title="Reset to default sample rates"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Template Design Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-amber-600" />
          <span>Choose Poster Template Style</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {templates.map((t) => {
            const isSelected = (data.templateStyle || "minimal") === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => updateField("templateStyle", t.id)}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-amber-500 bg-amber-50/70 shadow-xs ring-1 ring-amber-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{t.icon}</span>
                  <span className="text-xs font-black text-slate-900 leading-tight">
                    {t.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {t.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Field */}
      <div className="bg-sky-50/50 p-3.5 rounded-2xl border border-sky-100 space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>Poster Date</span>
          </label>
          <button
            type="button"
            onClick={setTodayDate}
            className="text-[11px] font-bold text-sky-700 hover:text-sky-900 cursor-pointer underline underline-offset-2"
          >
            Set Today&apos;s Date
          </button>
        </div>
        <input
          type="text"
          value={data.date}
          onChange={(e) => updateField("date", e.target.value)}
          placeholder="e.g. 02-11-2026"
          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
        />
      </div>

      {/* Product 1: TRUPTI COTTON SEED REFINED OIL */}
      <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/70 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              T
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                {data.trupti.brandName}
              </h3>
              <p className="text-[11px] font-medium text-slate-600">
                {data.trupti.subtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
            Cottonseed
          </span>
        </div>

        {/* Wholesale Tin Price */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Wholesale Tin Rate (₹ + NEW TIN)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="text"
              value={data.trupti.tinPrice}
              onChange={(e) => updateTruptiPrice("tinPrice", e.target.value)}
              placeholder="e.g. 2445–2455"
              className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-amber-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Individual Retail/Can Prices: 5 LTR & 1 LTR */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              5 LTR Can Rate
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="text"
                value={data.trupti.canPrice}
                onChange={(e) => updateTruptiPrice("canPrice", e.target.value)}
                placeholder="758"
                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              1 LTR Bottle Rate
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="text"
                value={data.trupti.bottlePrice}
                onChange={(e) => updateTruptiPrice("bottlePrice", e.target.value)}
                placeholder="151"
                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product 2: KRISHNA GROUNDNUT OIL */}
      <div className="p-4 rounded-2xl bg-orange-50/40 border border-orange-200/70 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              K
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                {data.krishna.brandName}
              </h3>
              <p className="text-[11px] font-medium text-slate-600">
                {data.krishna.subtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 bg-orange-100/80 px-2 py-0.5 rounded-md">
            Groundnut
          </span>
        </div>

        {/* Wholesale Tin Price */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Wholesale Tin Rate (₹ + NEW TIN)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="text"
              value={data.krishna.tinPrice}
              onChange={(e) => updateKrishnaPrice("tinPrice", e.target.value)}
              placeholder="e.g. 2850"
              className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-orange-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Individual Retail/Can Prices: 5 LTR & 1 LTR */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              5 LTR Can Rate
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="text"
                value={data.krishna.canPrice}
                onChange={(e) => updateKrishnaPrice("canPrice", e.target.value)}
                placeholder="882"
                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              1 LTR Bottle Rate
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="text"
                value={data.krishna.bottlePrice}
                onChange={(e) => updateKrishnaPrice("bottlePrice", e.target.value)}
                placeholder="177"
                className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Customization (Optional Accordion) */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>Edit Firm Name, Top Heading & Terms (Optional)</span>
          </span>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Top Religious Heading
              </label>
              <input
                type="text"
                value={data.religiousHeading}
                onChange={(e) => updateField("religiousHeading", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Main Firm Heading
              </label>
              <input
                type="text"
                value={data.brandName}
                onChange={(e) => updateField("brandName", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Catalog Subtitle
              </label>
              <input
                type="text"
                value={data.subtitle}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Footer Notice
                </label>
                <input
                  type="text"
                  value={data.footerNotice}
                  onChange={(e) => updateField("footerNotice", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Footer Location
                </label>
                <input
                  type="text"
                  value={data.footerLocation}
                  onChange={(e) => updateField("footerLocation", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
