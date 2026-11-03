"use client";

import React, { useState } from "react";
import { CatalogueData } from "@/types/pricing";
import {
  Calendar,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Tag,
  Coins,
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

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm space-y-5">
      {/* 1. Terminal Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
            <Coins className="w-4 h-4 text-slate-200" />
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
              Daily Price Terminal
            </h2>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Enter today&apos;s rates to update live poster
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          type="button"
          className="py-1.5 px-3 rounded-full text-xs font-bold text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 transition cursor-pointer flex items-center gap-1.5"
          title="Reset sample rates"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. Floating Date Capsule Pill */}
      <div className="py-2 px-3.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-2 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Poster Date</span>
        </label>
        <div className="flex items-center gap-1.5 max-w-[210px] w-full">
          <input
            type="text"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            placeholder="DD-MM-YYYY"
            className="w-full px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 bg-white hover:bg-white focus:bg-white border border-slate-200 focus:border-slate-800 focus:outline-none transition shadow-2xs"
          />
          <button
            type="button"
            onClick={setTodayDate}
            className="py-1.5 px-3 rounded-full text-[11px] font-bold text-slate-700 hover:text-slate-950 bg-slate-200 hover:bg-slate-300 transition shrink-0 cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      {/* 3. Commodity 1: TRUPTI COTTON SEED REFINED OIL */}
      <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
        {/* Commodity Header */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              T
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
                {data.trupti.brandName}
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">
                {data.trupti.subtitle}
              </span>
            </div>
          </div>
          <span className="py-0.5 px-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 border border-blue-200">
            Cottonseed
          </span>
        </div>

        {/* Wholesale Tin Rate */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1 pl-1">
            Wholesale Tin Rate (₹ + NEW TIN)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="text"
              value={data.trupti.tinPrice}
              onChange={(e) => updateTruptiPrice("tinPrice", e.target.value)}
              placeholder="2445–2455"
              className="w-full pl-8 pr-24 py-2.5 rounded-full bg-white border border-slate-200 focus:border-blue-600 text-slate-900 font-bold text-sm focus:outline-none transition shadow-2xs"
            />
            <span className="absolute right-2.5 py-1 px-2.5 rounded-full text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100">
              + NEW TIN
            </span>
          </div>
        </div>

        {/* 5 LTR & 1 LTR Rates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10.5px] font-bold text-slate-600 mb-1 pl-1">
              5 LTR Can Rate
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-xs">
                ₹
              </span>
              <input
                type="text"
                value={data.trupti.canPrice}
                onChange={(e) => updateTruptiPrice("canPrice", e.target.value)}
                placeholder="758"
                className="w-full pl-7 pr-3 py-2 rounded-full bg-white border border-slate-200 focus:border-blue-600 text-slate-900 font-bold text-xs focus:outline-none transition shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10.5px] font-bold text-slate-600 mb-1 pl-1">
              1 LTR Bottle Rate
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-xs">
                ₹
              </span>
              <input
                type="text"
                value={data.trupti.bottlePrice}
                onChange={(e) => updateTruptiPrice("bottlePrice", e.target.value)}
                placeholder="151"
                className="w-full pl-7 pr-3 py-2 rounded-full bg-white border border-slate-200 focus:border-blue-600 text-slate-900 font-bold text-xs focus:outline-none transition shadow-2xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Commodity 2: KRISHNA GROUNDNUT OIL */}
      <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
        {/* Commodity Header */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              K
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
                {data.krishna.brandName}
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">
                {data.krishna.subtitle}
              </span>
            </div>
          </div>
          <span className="py-0.5 px-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200">
            Groundnut
          </span>
        </div>

        {/* Wholesale Tin Rate */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1 pl-1">
            Wholesale Tin Rate (₹ + NEW TIN)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="text"
              value={data.krishna.tinPrice}
              onChange={(e) => updateKrishnaPrice("tinPrice", e.target.value)}
              placeholder="2850"
              className="w-full pl-8 pr-24 py-2.5 rounded-full bg-white border border-slate-200 focus:border-amber-600 text-slate-900 font-bold text-sm focus:outline-none transition shadow-2xs"
            />
            <span className="absolute right-2.5 py-1 px-2.5 rounded-full text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100">
              + NEW TIN
            </span>
          </div>
        </div>

        {/* 5 LTR & 1 LTR Rates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10.5px] font-bold text-slate-600 mb-1 pl-1">
              5 LTR Can Rate
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-xs">
                ₹
              </span>
              <input
                type="text"
                value={data.krishna.canPrice}
                onChange={(e) => updateKrishnaPrice("canPrice", e.target.value)}
                placeholder="882"
                className="w-full pl-7 pr-3 py-2 rounded-full bg-white border border-slate-200 focus:border-amber-600 text-slate-900 font-bold text-xs focus:outline-none transition shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10.5px] font-bold text-slate-600 mb-1 pl-1">
              1 LTR Bottle Rate
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-xs">
                ₹
              </span>
              <input
                type="text"
                value={data.krishna.bottlePrice}
                onChange={(e) => updateKrishnaPrice("bottlePrice", e.target.value)}
                placeholder="177"
                className="w-full pl-7 pr-3 py-2 rounded-full bg-white border border-slate-200 focus:border-amber-600 text-slate-900 font-bold text-xs focus:outline-none transition shadow-2xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Collapsible Advanced Settings (Firm Names & Terms) */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <span>Customize Company Names & Notice Terms</span>
          </span>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1 pl-1">
                Top Religious Heading
              </label>
              <input
                type="text"
                value={data.religiousHeading}
                onChange={(e) => updateField("religiousHeading", e.target.value)}
                className="w-full px-3 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1 pl-1">
                  Left Company Name
                </label>
                <input
                  type="text"
                  value={data.leftCompanyName || data.brandName || ""}
                  onChange={(e) => {
                    updateField("leftCompanyName", e.target.value);
                    updateField("brandName", e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1 pl-1">
                  Right Company Name
                </label>
                <input
                  type="text"
                  value={data.rightCompanyName || ""}
                  onChange={(e) => updateField("rightCompanyName", e.target.value)}
                  className="w-full px-3 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1 pl-1">
                  Footer Notice
                </label>
                <input
                  type="text"
                  value={data.footerNotice}
                  onChange={(e) => updateField("footerNotice", e.target.value)}
                  className="w-full px-3 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1 pl-1">
                  Footer Location
                </label>
                <input
                  type="text"
                  value={data.footerLocation}
                  onChange={(e) => updateField("footerLocation", e.target.value)}
                  className="w-full px-3 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
