"use client";

import React, { useState } from "react";
import { PricingData } from "@/types/pricing";
import {
  Calendar,
  RotateCcw,
  Upload,
  Image as ImageIcon,
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
  const [showUploader, setShowUploader] = useState(false);

  const updateField = (field: keyof PricingData, value: any) => {
    onChange({
      ...data,
      [field]: value,
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

  const updateGroundnut = (field: "tinPrice" | "canPrice" | "bottlePrice", val: string) => {
    onChange({
      ...data,
      groundnutOil: {
        ...data.groundnutOil,
        [field]: val,
      },
    });
  };

  const setTodayDate = () => {
    const today = new Date().toISOString().split("T")[0];
    updateField("date", today);
  };

  const handleCustomTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          ...data,
          customBgUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToOfficialTemplate = () => {
    onChange({
      ...data,
      customBgUrl: undefined,
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl shadow-sky-950/5 border border-white space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Daily Wholesale Price Entry
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Krishna Export Industries • Live Poster Preview
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
      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
        <label className="text-[11px] sm:text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
          Rate Date
        </label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-amber-300 bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm shadow-xs"
          />
          <button
            type="button"
            onClick={setTodayDate}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-sm cursor-pointer whitespace-nowrap"
          >
            Today
          </button>
        </div>
      </div>

      {/* 1) TRUPTI COTTONSEED OIL (Left side on the poster) */}
      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🌿</span>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                1) TRUPTI • Cottonseed Oil
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500">Cotton Seed Refined Oil</p>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            Left Side
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* Tin Price */}
          <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-[10px] sm:text-xs font-bold text-slate-600 block mb-1 truncate">
              Tin Price
            </label>
            <div className="relative">
              <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-slate-400 font-bold text-xs sm:text-sm">₹</span>
              <input
                type="text"
                placeholder="2445-2455"
                value={data.cottonSeedOil.tinPrice}
                onChange={(e) => updateCottonseed("tinPrice", e.target.value)}
                className="w-full pl-5 sm:pl-7 pr-1 py-0.5 sm:py-1 text-base sm:text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-amber-800 font-semibold block mt-1">+ NEW TIN</span>
          </div>

          {/* 5L Can Price */}
          <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-[10px] sm:text-xs font-bold text-slate-600 block mb-1 truncate">
              5 LTR Can
            </label>
            <div className="relative">
              <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-slate-400 font-bold text-xs sm:text-sm">₹</span>
              <input
                type="number"
                placeholder="758"
                value={data.cottonSeedOil.canPrice}
                onChange={(e) => updateCottonseed("canPrice", e.target.value)}
                className="w-full pl-5 sm:pl-7 pr-1 py-0.5 sm:py-1 text-base sm:text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-slate-400 font-medium block mt-1">per can</span>
          </div>

          {/* Bottle Price */}
          <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-[10px] sm:text-xs font-bold text-slate-600 block mb-1 truncate">
              1 LTR Bottle
            </label>
            <div className="relative">
              <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-slate-400 font-bold text-xs sm:text-sm">₹</span>
              <input
                type="number"
                placeholder="151"
                value={data.cottonSeedOil.bottlePrice}
                onChange={(e) => updateCottonseed("bottlePrice", e.target.value)}
                className="w-full pl-5 sm:pl-7 pr-1 py-0.5 sm:py-1 text-base sm:text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-slate-400 font-medium block mt-1">per bottle</span>
          </div>
        </div>
      </div>

      {/* 2) KRISHNA GROUNDNUT OIL (Right side on the poster) */}
      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🥜</span>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                2) KRISHNA • Groundnut Oil
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500">Pure Groundnut Oil (સીંગતેલ)</p>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            Right Side
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* Tin Price */}
          <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-[10px] sm:text-xs font-bold text-slate-600 block mb-1 truncate">
              Tin Price
            </label>
            <div className="relative">
              <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-slate-400 font-bold text-xs sm:text-sm">₹</span>
              <input
                type="text"
                placeholder="2850"
                value={data.groundnutOil.tinPrice}
                onChange={(e) => updateGroundnut("tinPrice", e.target.value)}
                className="w-full pl-5 sm:pl-7 pr-1 py-0.5 sm:py-1 text-base sm:text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-amber-800 font-semibold block mt-1">+ NEW TIN</span>
          </div>

          {/* 5L Can Price */}
          <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-[10px] sm:text-xs font-bold text-slate-600 block mb-1 truncate">
              5 LTR Can
            </label>
            <div className="relative">
              <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-slate-400 font-bold text-xs sm:text-sm">₹</span>
              <input
                type="number"
                placeholder="882"
                value={data.groundnutOil.canPrice}
                onChange={(e) => updateGroundnut("canPrice", e.target.value)}
                className="w-full pl-5 sm:pl-7 pr-1 py-0.5 sm:py-1 text-base sm:text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-slate-400 font-medium block mt-1">per can</span>
          </div>

          {/* Bottle Price */}
          <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-[10px] sm:text-xs font-bold text-slate-600 block mb-1 truncate">
              1 LTR Bottle
            </label>
            <div className="relative">
              <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-slate-400 font-bold text-xs sm:text-sm">₹</span>
              <input
                type="number"
                placeholder="177"
                value={data.groundnutOil.bottlePrice}
                onChange={(e) => updateGroundnut("bottlePrice", e.target.value)}
                className="w-full pl-5 sm:pl-7 pr-1 py-0.5 sm:py-1 text-base sm:text-lg font-black text-slate-900 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-slate-400 font-medium block mt-1">per bottle</span>
          </div>
        </div>
      </div>

      {/* Custom Template / Future Templates Section */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-amber-600" />
            Template Image Option
          </span>
          <button
            type="button"
            onClick={() => setShowUploader(!showUploader)}
            className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{showUploader ? "Hide Option" : "Upload Another Poster"}</span>
          </button>
        </div>

        {showUploader && (
          <div className="mt-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2.5">
            <p className="text-[11px] text-slate-600">
              When you have new can images or another background poster, select it here to test it immediately.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomTemplateUpload}
                className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
              />
              {data.customBgUrl && (
                <button
                  type="button"
                  onClick={resetToOfficialTemplate}
                  className="text-xs text-red-600 hover:text-red-700 font-bold cursor-pointer whitespace-nowrap"
                >
                  Reset to Krishna Poster
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
