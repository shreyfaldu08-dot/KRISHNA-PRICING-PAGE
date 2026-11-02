"use client";

import React, { useState } from "react";
import { PricingData } from "@/types/pricing";
import {
  Calendar,
  Building2,
  Phone,
  MapPin,
  FileText,
  Palette,
  RotateCcw,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
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
  const [showBusinessConfig, setShowBusinessConfig] = useState(false);
  const [showTemplateUploader, setShowTemplateUploader] = useState(false);

  // Field updater
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

  const addCustomProduct = () => {
    const newId = Date.now().toString();
    onChange({
      ...data,
      customProducts: [
        ...data.customProducts,
        {
          id: newId,
          name: "Sunflower Oil",
          tinPrice: "",
          canPrice: "",
          bottlePrice: "",
        },
      ],
    });
  };

  const removeCustomProduct = (id: string) => {
    onChange({
      ...data,
      customProducts: data.customProducts.filter((p) => p.id !== id),
    });
  };

  const updateCustomProduct = (
    id: string,
    field: "name" | "tinPrice" | "canPrice" | "bottlePrice",
    val: string
  ) => {
    onChange({
      ...data,
      customProducts: data.customProducts.map((p) =>
        p.id === id ? { ...p, [field]: val } : p
      ),
    });
  };

  // Handle uploading custom background template image
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          ...data,
          templateId: "custom-image",
          customBgUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle uploading logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          ...data,
          customLogoUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomBg = () => {
    onChange({
      ...data,
      templateId: "minimal-obsidian",
      customBgUrl: undefined,
    });
  };

  const clearLogo = () => {
    onChange({
      ...data,
      customLogoUrl: undefined,
    });
  };

  return (
    <div className="bg-[#121215] rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-800 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              Pricing Entry
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Daily Market Rates
          </h2>
        </div>

        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-xl transition cursor-pointer border border-neutral-700/60"
          title="Reset to sample values"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Date Picker Row */}
      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          Effective Date
        </label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-800 bg-[#0d0d10] text-white font-medium focus:outline-none focus:border-amber-400 text-sm"
          />
          <button
            type="button"
            onClick={setTodayDate}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition border border-neutral-700 cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      {/* 1) GROUNDNUT OIL SECTION */}
      <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400">01</span>
              <h3 className="font-bold text-white text-sm tracking-wide uppercase">
                Groundnut Oil (સીંગતેલ)
              </h3>
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">Primary commodity oil</p>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
            Groundnut
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tin Price */}
          <div className="bg-[#0b0b0e] p-3.5 rounded-xl border border-neutral-800/80 focus-within:border-amber-400/80">
            <label className="text-[11px] font-medium text-neutral-400 block mb-1">
              Tin (15 Kg/L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500 font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="2450"
                value={data.groundnutOil.tinPrice}
                onChange={(e) => updateGroundnut("tinPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-base font-bold text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* 5L Can Price */}
          <div className="bg-[#0b0b0e] p-3.5 rounded-xl border border-neutral-800/80 focus-within:border-amber-400/80">
            <label className="text-[11px] font-medium text-neutral-400 block mb-1">
              5 Ltr Can
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500 font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="850"
                value={data.groundnutOil.canPrice}
                onChange={(e) => updateGroundnut("canPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-base font-bold text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Bottle Price */}
          <div className="bg-[#0b0b0e] p-3.5 rounded-xl border border-neutral-800/80 focus-within:border-amber-400/80">
            <label className="text-[11px] font-medium text-neutral-400 block mb-1">
              1 Ltr Bottle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500 font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="165"
                value={data.groundnutOil.bottlePrice}
                onChange={(e) => updateGroundnut("bottlePrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-base font-bold text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2) COTTONSEED OIL SECTION */}
      <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-400">02</span>
              <h3 className="font-bold text-white text-sm tracking-wide uppercase">
                Cottonseed Oil (કપાસિયા)
              </h3>
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">Refined commodity oil</p>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
            Cottonseed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tin Price */}
          <div className="bg-[#0b0b0e] p-3.5 rounded-xl border border-neutral-800/80 focus-within:border-emerald-400/80">
            <label className="text-[11px] font-medium text-neutral-400 block mb-1">
              Tin (15 Kg/L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500 font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="2050"
                value={data.cottonSeedOil.tinPrice}
                onChange={(e) => updateCottonseed("tinPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-base font-bold text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* 5L Can Price */}
          <div className="bg-[#0b0b0e] p-3.5 rounded-xl border border-neutral-800/80 focus-within:border-emerald-400/80">
            <label className="text-[11px] font-medium text-neutral-400 block mb-1">
              5 Ltr Can
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500 font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="710"
                value={data.cottonSeedOil.canPrice}
                onChange={(e) => updateCottonseed("canPrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-base font-bold text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Bottle Price */}
          <div className="bg-[#0b0b0e] p-3.5 rounded-xl border border-neutral-800/80 focus-within:border-emerald-400/80">
            <label className="text-[11px] font-medium text-neutral-400 block mb-1">
              1 Ltr Bottle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500 font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="140"
                value={data.cottonSeedOil.bottlePrice}
                onChange={(e) => updateCottonseed("bottlePrice", e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-base font-bold text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Extra Custom Products */}
      {data.customProducts.length > 0 && (
        <div className="space-y-3">
          {data.customProducts.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updateCustomProduct(p.id, "name", e.target.value)}
                  className="font-bold text-white text-sm bg-transparent border-b border-neutral-700 focus:outline-none focus:border-amber-400"
                  placeholder="Oil Name (e.g. Sunflower Oil)"
                />
                <button
                  type="button"
                  onClick={() => removeCustomProduct(p.id)}
                  className="text-red-400 hover:text-red-300 p-1 rounded-lg cursor-pointer"
                  title="Remove product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Tin ₹"
                  value={p.tinPrice}
                  onChange={(e) => updateCustomProduct(p.id, "tinPrice", e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#0b0b0e] border border-neutral-800 text-sm font-bold text-white"
                />
                <input
                  type="number"
                  placeholder="5L Can ₹"
                  value={p.canPrice}
                  onChange={(e) => updateCustomProduct(p.id, "canPrice", e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#0b0b0e] border border-neutral-800 text-sm font-bold text-white"
                />
                <input
                  type="number"
                  placeholder="Bottle ₹"
                  value={p.bottlePrice}
                  onChange={(e) => updateCustomProduct(p.id, "bottlePrice", e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#0b0b0e] border border-neutral-800 text-sm font-bold text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Additional Product Button */}
      <button
        type="button"
        onClick={addCustomProduct}
        className="w-full py-2.5 px-4 rounded-xl border border-dashed border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Another Product (Sunflower, Mustard, etc.)</span>
      </button>

      {/* Market Note & Terms */}
      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            <FileText className="w-3.5 h-3.5 text-neutral-500" />
            Market Note / Remark
          </label>
          <input
            type="text"
            value={data.note}
            onChange={(e) => updateField("note", e.target.value)}
            placeholder="e.g. Rates valid for today only. Ex-mill / ready delivery."
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-800 bg-[#0d0d10] text-white text-xs focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
            Payment Terms / Terms of Trade
          </label>
          <input
            type="text"
            value={data.terms}
            onChange={(e) => updateField("terms", e.target.value)}
            placeholder="e.g. Payment within 48 hours • GST extra as applicable"
            className="w-full px-4 py-2 rounded-xl border border-neutral-800 bg-[#0d0d10] text-neutral-300 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Visual Template Selector */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            Clean & Minimal Style
          </label>
          <button
            type="button"
            onClick={() => setShowTemplateUploader(!showTemplateUploader)}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{showTemplateUploader ? "Hide Upload" : "Upload Custom Image"}</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => updateField("templateId", "minimal-obsidian")}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              data.templateId === "minimal-obsidian"
                ? "border-amber-400 bg-amber-400/5 ring-1 ring-amber-400/40"
                : "border-neutral-800 hover:border-neutral-700 bg-neutral-900/60"
            }`}
          >
            <div className="w-full h-3.5 rounded bg-[#0b0b0e] border border-neutral-700 mb-1.5" />
            <div className="font-bold text-xs text-white">Obsidian</div>
            <div className="text-[10px] text-neutral-400">Dark Minimal</div>
          </button>

          <button
            type="button"
            onClick={() => updateField("templateId", "porcelain-light")}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              data.templateId === "porcelain-light"
                ? "border-neutral-300 bg-white/10 ring-1 ring-white/40"
                : "border-neutral-800 hover:border-neutral-700 bg-neutral-900/60"
            }`}
          >
            <div className="w-full h-3.5 rounded bg-white border border-neutral-300 mb-1.5" />
            <div className="font-bold text-xs text-white">Porcelain</div>
            <div className="text-[10px] text-neutral-400">Light Minimal</div>
          </button>

          <button
            type="button"
            onClick={() => updateField("templateId", "nordic-slate")}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              data.templateId === "nordic-slate"
                ? "border-cyan-400 bg-cyan-400/5 ring-1 ring-cyan-400/40"
                : "border-neutral-800 hover:border-neutral-700 bg-neutral-900/60"
            }`}
          >
            <div className="w-full h-3.5 rounded bg-zinc-800 border border-zinc-700 mb-1.5" />
            <div className="font-bold text-xs text-white">Nordic Slate</div>
            <div className="text-[10px] text-neutral-400">Zinc Minimal</div>
          </button>
        </div>

        {/* Upload Custom Template Section */}
        {showTemplateUploader && (
          <div className="mt-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                Custom Background Graphic
              </span>
              {data.customBgUrl && (
                <button
                  type="button"
                  onClick={clearCustomBg}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                >
                  Remove Custom Image
                </button>
              )}
            </div>
            <p className="text-[11px] text-neutral-400">
              Upload your own pre-designed background template. Rates will overlay cleanly on it.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleBgUpload}
              className="text-xs text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Business Header & Contact Customization */}
      <div className="pt-2 border-t border-neutral-800">
        <button
          type="button"
          onClick={() => setShowBusinessConfig(!showBusinessConfig)}
          className="w-full flex items-center justify-between text-xs font-semibold text-neutral-400 py-1 hover:text-white transition cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-neutral-500" />
            Customize Business Name & Contact Details
          </span>
          {showBusinessConfig ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {showBusinessConfig && (
          <div className="mt-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div>
              <label className="text-[11px] font-medium text-neutral-400 block mb-1">
                Firm / Mill Name
              </label>
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="e.g. K.O.M. EDIBLE OILS"
                className="w-full px-3 py-2 rounded-lg bg-[#0d0d10] border border-neutral-800 text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-400 block mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                placeholder="e.g. Pure Edible Oils • Daily Wholesale Rates"
                className="w-full px-3 py-2 rounded-lg bg-[#0d0d10] border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-neutral-400 block mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg bg-[#0d0d10] border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-400 block mb-1">
                  Location / City
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Rajkot, Gujarat"
                  className="w-full px-3 py-2 rounded-lg bg-[#0d0d10] border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Logo Upload Option */}
            <div className="pt-2 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-medium text-neutral-400">
                  Business Logo (Optional)
                </label>
                {data.customLogoUrl && (
                  <button
                    type="button"
                    onClick={clearLogo}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold cursor-pointer"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="text-xs text-neutral-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
