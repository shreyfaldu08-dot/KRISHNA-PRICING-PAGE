"use client";

import React from "react";
import {
  CatalogueData,
  COLOR_THEMES,
  TemplateColorTheme,
} from "@/types/pricing";
import { Palette } from "lucide-react";

interface TemplateSelectorProps {
  data: CatalogueData;
  onChange: (newData: CatalogueData) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  data,
  onChange,
}) => {
  const currentTheme =
    data.theme === "royalBlue"
      ? "royalNavy"
      : data.theme === "forestEmerald"
      ? "heritageGreen"
      : data.theme === "charcoalSlate"
      ? "midnightNoir"
      : data.theme || "terracotta";

  const selectTheme = (themeKey: TemplateColorTheme) => {
    onChange({
      ...data,
      theme: themeKey,
    });
  };

  const handleCustomColor = (hex: string) => {
    onChange({
      ...data,
      theme: "custom",
      customColor: hex,
    });
  };

  const PRESET_THEMES: Array<{
    key: TemplateColorTheme;
    shortLabel: string;
    fullLabel: string;
    color: string;
  }> = [
    {
      key: "royalNavy",
      shortLabel: "Royal Navy",
      fullLabel: "Royal Navy Blue",
      color: "#1D4ED8",
    },
    {
      key: "terracotta",
      shortLabel: "Terracotta",
      fullLabel: "Classic Terracotta",
      color: "#B83B20",
    },
    {
      key: "heritageGreen",
      shortLabel: "Emerald",
      fullLabel: "Heritage Emerald",
      color: "#15803D",
    },
    {
      key: "goldenOchre",
      shortLabel: "Amber",
      fullLabel: "Golden Ochre",
      color: "#B45309",
    },
    {
      key: "midnightNoir",
      shortLabel: "Slate",
      fullLabel: "Editorial Slate",
      color: "#0F172A",
    },
    {
      key: "kesarGold",
      shortLabel: "Kesar",
      fullLabel: "Imperial Kesar Gold",
      color: "#D97706",
    },
    {
      key: "royalBurgundy",
      shortLabel: "Burgundy",
      fullLabel: "Royal Bordeaux Wine",
      color: "#881337",
    },
    {
      key: "oliveSage",
      shortLabel: "Olive",
      fullLabel: "Mediterranean Olive Sage",
      color: "#365314",
    },
    {
      key: "desertCopper",
      shortLabel: "Copper",
      fullLabel: "Burnished Desert Copper",
      color: "#9A3412",
    },
    {
      key: "imperialPlum",
      shortLabel: "Plum",
      fullLabel: "Imperial Royal Plum",
      color: "#6B21A8",
    },
    {
      key: "warmEspresso",
      shortLabel: "Espresso",
      fullLabel: "Warm Toasted Espresso",
      color: "#573D29",
    },
  ];

  const activeThemeMeta =
    PRESET_THEMES.find((t) => t.key === currentTheme) || {
      key: "custom" as TemplateColorTheme,
      shortLabel: "Custom",
      fullLabel: "Custom Shade",
      color: data.customColor || "#B83B20",
    };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3 space-y-2.5 transition-all">
      {/* 1. Product Layout Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-100 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
            Product Mode
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 bg-slate-100/90 p-0.5 rounded-full border border-slate-200 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onChange({ ...data, productMode: "both" })}
            className={`py-1 px-2 sm:px-3 rounded-full text-[10.5px] font-bold transition cursor-pointer text-center ${
              (data.productMode || "both") === "both"
                ? "bg-slate-900 text-white shadow-2xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Both Products
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, productMode: "cotton" })}
            className={`py-1 px-2 sm:px-3 rounded-full text-[10.5px] font-bold transition cursor-pointer text-center ${
              data.productMode === "cotton"
                ? "bg-blue-600 text-white shadow-2xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Cotton (Trupti)
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, productMode: "groundnut" })}
            className={`py-1 px-2 sm:px-3 rounded-full text-[10.5px] font-bold transition cursor-pointer text-center ${
              data.productMode === "groundnut"
                ? "bg-amber-600 text-white shadow-2xs font-black"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Groundnut (Krishna)
          </button>
        </div>
      </div>

      {/* 2. Top Header Row with Meta Details */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center shadow-2xs">
            <Palette className="w-3 h-3 text-slate-200" />
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
            Template Theme
          </span>
          <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
            • Instant poster color harmony
          </span>
        </div>

        {/* Active Theme Badge */}
        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80 flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
            style={{ backgroundColor: activeThemeMeta.color }}
          />
          <span>{activeThemeMeta.fullLabel}</span>
        </span>
      </div>

      {/* Balanced 6-Column Preset Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 sm:gap-2">
        {PRESET_THEMES.map(({ key, shortLabel, fullLabel, color }) => {
          const isSelected = currentTheme === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => selectTheme(key)}
              title={fullLabel}
              className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-xs font-black"
                  : "bg-slate-50/80 hover:bg-slate-100 border-slate-200/90 text-slate-700 font-bold hover:text-slate-900"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15 shadow-2xs"
                style={{ backgroundColor: color }}
              />
              <span className="text-[11px] truncate tracking-tight">
                {shortLabel}
              </span>
            </button>
          );
        })}

        {/* Custom Color Selector Tile */}
        <label
          className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer relative ${
            currentTheme === "custom"
              ? "bg-slate-900 border-slate-900 text-white shadow-xs font-black"
              : "bg-slate-50/80 hover:bg-slate-100 border-slate-200/90 text-slate-700 font-bold hover:text-slate-900"
          }`}
          title="Pick custom shade"
        >
          <input
            type="color"
            value={data.customColor || "#B83B20"}
            onChange={(e) => handleCustomColor(e.target.value)}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15 shadow-2xs"
            style={{ backgroundColor: data.customColor || "#B83B20" }}
          />
          <span className="text-[11px] truncate tracking-tight">
            Custom
          </span>
        </label>
      </div>
    </div>
  );
};
