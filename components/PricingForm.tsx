"use client";

import React, { useState } from "react";
import { PricingData } from "@/types/pricing";
import {
  Calendar,
  Building2,
  FileText,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface PricingFormProps {
  data: PricingData;
  onChange: (data: PricingData) => void;
  onReset: () => void;
}

export const PricingForm: React.FC<PricingFormProps> = ({
  data,
  onChange,
  onReset,
}) => {
  const [showConfig, setShowConfig] = useState(false);

  const updateField = (field: keyof PricingData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const updateGroundnut = (field: "tinPrice" | "canPrice" | "bottlePrice", val: string) => {
    onChange({
      ...data,
      groundnutOil: {
        ...data.groundnutOil,
        [field]: val,
      },
    });
  };

  const updateCottonseed = (field: "tinPrice" | "canPrice" | "bottlePrice", val: string) => {
    onChange({
      ...data,
      cottonSeedOil: {
        ...data.cottonSeedOil,
        [field]: val,
      },
    });
  };

  const setTodayDate = () => {
    const today = new Date().toISOString().split("T")[0];
    updateField("date", today);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl shadow-sky-950/5 border border-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Enter Today&apos;s Oil Rates
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Prices will immediately reflect in the live image preview
          </p>
        </div>

        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          title="Reset to sample values"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Date Picker Row */}
      <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
        <label className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-sky-600" />
          Rate Date
        </label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-sky-200 bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm shadow-xs"
          />
          <button
            type="button"
            onClick={setTodayDate}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs transition shadow-sm cursor-pointer whitespace-nowrap"
          >
            Today
          </button>
        </div>
      </div>

      {/* 1) GROUNDNUT OIL SECTION */}
      <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥜</span>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                1) Groundnut Oil (સીંગતેલ)
              </h3>
              <p className="text-[11px] text-slate-500">मूंगफली तेल</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            Groundnut
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tin Price */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-sky-500">
            <label className="text-xs font-bold text-slate-600 block mb-1">
              Tin Price (15 Kg/L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="2450"
                value={data.groundnutOil.tinPrice}
                onChange={(e) => updateGroundnut("tinPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* 5L Can Price */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-sky-500">
            <label className="text-xs font-bold text-slate-600 block mb-1">
              5 Ltr Can Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="850"
                value={data.groundnutOil.canPrice}
                onChange={(e) => updateGroundnut("canPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Bottle Price */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-sky-500">
            <label className="text-xs font-bold text-slate-600 block mb-1">
              1 Ltr Bottle Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="165"
                value={data.groundnutOil.bottlePrice}
                onChange={(e) => updateGroundnut("bottlePrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2) COTTONSEED OIL SECTION */}
      <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                2) Cottonseed Oil (કપાસિયા)
              </h3>
              <p className="text-[11px] text-slate-500">कपासिया तेल</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
            Cottonseed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tin Price */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-sky-500">
            <label className="text-xs font-bold text-slate-600 block mb-1">
              Tin Price (15 Kg/L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="2050"
                value={data.cottonSeedOil.tinPrice}
                onChange={(e) => updateCottonseed("tinPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* 5L Can Price */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-sky-500">
            <label className="text-xs font-bold text-slate-600 block mb-1">
              5 Ltr Can Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="710"
                value={data.cottonSeedOil.canPrice}
                onChange={(e) => updateCottonseed("canPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Bottle Price */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-sky-500">
            <label className="text-xs font-bold text-slate-600 block mb-1">
              1 Ltr Bottle Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="140"
                value={data.cottonSeedOil.bottlePrice}
                onChange={(e) => updateCottonseed("bottlePrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional Market Note */}
      <div>
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          Market Remark / Dispatch Note (Optional)
        </label>
        <input
          type="text"
          value={data.note}
          onChange={(e) => updateField("note", e.target.value)}
          placeholder="e.g. Rates valid for today only. Ready delivery."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
        />
      </div>

      {/* Business Name & Contact Settings (Collapsible) */}
      <div className="pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-600 py-1 hover:text-slate-900 transition cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Edit Firm Name & Contact Number
          </span>
          {showConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showConfig && (
          <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Firm / Mill Name
              </label>
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="e.g. K.O.M. EDIBLE OILS"
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Location / City
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Rajkot, Gujarat"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
