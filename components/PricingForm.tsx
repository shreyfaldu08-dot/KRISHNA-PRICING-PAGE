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
      templateId: "royal-amber",
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-100 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 text-sm font-black">
              ₹
            </span>
            Enter Daily Pricing
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Update today&apos;s rates for Groundnut and Cottonseed oil
          </p>
        </div>

        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition cursor-pointer"
          title="Reset to sample values"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Date Picker Row */}
      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
        <label className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-amber-600" />
          Rate Date
        </label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
          <button
            type="button"
            onClick={setTodayDate}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition shadow-sm whitespace-nowrap cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      {/* 1) GROUNDNUT OIL SECTION */}
      <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥜</span>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">
                1) Groundnut Oil Rates
              </h3>
              <p className="text-xs text-neutral-500">સીંગતેલ / मूंगफली तेल</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
            Primary Product
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tin Price */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-xs font-semibold text-neutral-600 block mb-1">
              Tin Price (15 Kg/L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="2450"
                value={data.groundnutOil.tinPrice}
                onChange={(e) => updateGroundnut("tinPrice", e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-lg font-black text-neutral-900 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Can Price */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-xs font-semibold text-neutral-600 block mb-1">
              Can / Jar Price (15 L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="2350"
                value={data.groundnutOil.canPrice}
                onChange={(e) => updateGroundnut("canPrice", e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-lg font-black text-neutral-900 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Bottle Price */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm focus-within:ring-2 focus-within:ring-amber-500">
            <label className="text-xs font-semibold text-neutral-600 block mb-1">
              Bottle Price (1 Ltr)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="165"
                value={data.groundnutOil.bottlePrice}
                onChange={(e) => updateGroundnut("bottlePrice", e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-lg font-black text-neutral-900 focus:outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2) COTTONSEED OIL SECTION */}
      <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base">
                2) Cottonseed Oil Rates
              </h3>
              <p className="text-xs text-neutral-500">કપાસિયા તેલ / कपासिया</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Refined Product
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tin Price */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
            <label className="text-xs font-semibold text-neutral-600 block mb-1">
              Tin Price (15 Kg/L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="2050"
                value={data.cottonSeedOil.tinPrice}
                onChange={(e) => updateCottonseed("tinPrice", e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-lg font-black text-neutral-900 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Can Price */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
            <label className="text-xs font-semibold text-neutral-600 block mb-1">
              Can / Jar Price (15 L)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="1950"
                value={data.cottonSeedOil.canPrice}
                onChange={(e) => updateCottonseed("canPrice", e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-lg font-black text-neutral-900 focus:outline-none rounded-lg"
              />
            </div>
          </div>

          {/* Bottle Price */}
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
            <label className="text-xs font-semibold text-neutral-600 block mb-1">
              Bottle Price (1 Ltr)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="140"
                value={data.cottonSeedOil.bottlePrice}
                onChange={(e) => updateCottonseed("bottlePrice", e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-lg font-black text-neutral-900 focus:outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Extra Custom Products (Optional extensible items) */}
      {data.customProducts.length > 0 && (
        <div className="space-y-3">
          {data.customProducts.map((p, idx) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updateCustomProduct(p.id, "name", e.target.value)}
                  className="font-bold text-neutral-900 text-sm bg-transparent border-b border-neutral-300 focus:outline-none focus:border-amber-500"
                  placeholder="Oil Name (e.g. Sunflower Oil)"
                />
                <button
                  type="button"
                  onClick={() => removeCustomProduct(p.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-lg cursor-pointer"
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
                  className="px-3 py-2 rounded-lg border border-neutral-200 text-sm font-bold"
                />
                <input
                  type="number"
                  placeholder="Can ₹"
                  value={p.canPrice}
                  onChange={(e) => updateCustomProduct(p.id, "canPrice", e.target.value)}
                  className="px-3 py-2 rounded-lg border border-neutral-200 text-sm font-bold"
                />
                <input
                  type="number"
                  placeholder="Bottle ₹"
                  value={p.bottlePrice}
                  onChange={(e) => updateCustomProduct(p.id, "bottlePrice", e.target.value)}
                  className="px-3 py-2 rounded-lg border border-neutral-200 text-sm font-bold"
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
        className="w-full py-2.5 px-4 rounded-xl border border-dashed border-neutral-300 text-neutral-600 hover:text-amber-600 hover:border-amber-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Another Product (Sunflower, Mustard, etc.)</span>
      </button>

      {/* Market Note & Terms */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <FileText className="w-3.5 h-3.5 text-neutral-500" />
            Market Remark / Dispatch Note
          </label>
          <input
            type="text"
            value={data.note}
            onChange={(e) => updateField("note", e.target.value)}
            placeholder="e.g. Rates are valid for today only. Ready stock available."
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-neutral-500 block mb-1">
            Payment Terms / Disclaimer
          </label>
          <input
            type="text"
            value={data.terms}
            onChange={(e) => updateField("terms", e.target.value)}
            placeholder="e.g. Payment within 48 hours • Taxes applicable"
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Visual Template Selector */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-500" />
            Image Design Style
          </label>
          <button
            type="button"
            onClick={() => setShowTemplateUploader(!showTemplateUploader)}
            className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{showTemplateUploader ? "Hide Custom Upload" : "Upload Own Template"}</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => updateField("templateId", "royal-amber")}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              data.templateId === "royal-amber"
                ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30"
                : "border-neutral-200 hover:border-neutral-300 bg-neutral-50"
            }`}
          >
            <div className="w-full h-4 rounded-md bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 mb-1.5" />
            <div className="font-bold text-xs text-neutral-900">Royal Amber</div>
            <div className="text-[10px] text-neutral-500">Gold & Warm</div>
          </button>

          <button
            type="button"
            onClick={() => updateField("templateId", "modern-emerald")}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              data.templateId === "modern-emerald"
                ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30"
                : "border-neutral-200 hover:border-neutral-300 bg-neutral-50"
            }`}
          >
            <div className="w-full h-4 rounded-md bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 mb-1.5" />
            <div className="font-bold text-xs text-neutral-900">Emerald Fresh</div>
            <div className="text-[10px] text-neutral-500">Clean & Green</div>
          </button>

          <button
            type="button"
            onClick={() => updateField("templateId", "classic-navy")}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              data.templateId === "classic-navy"
                ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30"
                : "border-neutral-200 hover:border-neutral-300 bg-neutral-50"
            }`}
          >
            <div className="w-full h-4 rounded-md bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 mb-1.5" />
            <div className="font-bold text-xs text-neutral-900">Classic Navy</div>
            <div className="text-[10px] text-neutral-500">Corporate Blue</div>
          </button>
        </div>

        {/* Upload Custom Template Section */}
        {showTemplateUploader && (
          <div className="mt-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-600" />
                Upload Existing Image Template / Background
              </span>
              {data.customBgUrl && (
                <button
                  type="button"
                  onClick={clearCustomBg}
                  className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                >
                  Remove Custom Image
                </button>
              )}
            </div>
            <p className="text-[11px] text-neutral-600">
              Have an image template you already use? Select it here and the rates will overlay cleanly on top.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleBgUpload}
              className="text-xs text-neutral-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Business Header & Contact Customization (Collapsible) */}
      <div className="pt-2 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => setShowBusinessConfig(!showBusinessConfig)}
          className="w-full flex items-center justify-between text-xs font-bold text-neutral-700 py-1 hover:text-amber-600 transition cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-neutral-400" />
            Customize Business Name & Contact Details
          </span>
          {showBusinessConfig ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showBusinessConfig && (
          <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                Firm / Business Name
              </label>
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="e.g. K.O.M. EDIBLE OILS"
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                placeholder="e.g. Pure Quality • Best Market Rates"
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  City / Market Location
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Rajkot / Market Yard"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Logo Upload Option */}
            <div className="pt-2 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-neutral-600">
                  Business Logo (Optional)
                </label>
                {data.customLogoUrl && (
                  <button
                    type="button"
                    onClick={clearLogo}
                    className="text-[10px] text-red-600 hover:text-red-700 font-bold cursor-pointer"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="text-xs text-neutral-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-neutral-200 file:text-neutral-800 hover:file:bg-neutral-300 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
