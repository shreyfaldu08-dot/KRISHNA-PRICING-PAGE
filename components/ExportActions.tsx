"use client";

import React, { useState } from "react";
import { toPng, toBlob } from "html-to-image";
import confetti from "canvas-confetti";
import { PricingData } from "@/types/pricing";
import {
  Download,
  Copy,
  Check,
  Loader2,
  MessageCircle,
  FileCheck,
  BookmarkPlus,
} from "lucide-react";

interface ExportActionsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  data: PricingData;
  onSaveHistory?: () => void;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  cardRef,
  data,
  onSaveHistory,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copyingImage, setCopyingImage] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [savedHistory, setSavedHistory] = useState(false);

  // Trigger high quality image download
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);

      await new Promise((res) => setTimeout(res, 100));

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2.5,
        cacheBust: true,
        style: {
          transform: "scale(1)",
        },
      });

      const dateStr = data.date || new Date().toISOString().split("T")[0];
      const fileName = `Daily_Oil_Rates_${dateStr}.png`;

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error("Failed to generate image:", err);
      alert("Error generating image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      setCopyingImage(true);

      const blob = await toBlob(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2.5,
        cacheBust: true,
      });

      if (!blob) throw new Error("Could not create image blob");

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        alert("Clipboard Image copy is not supported in this browser. Please use 'Download Image'.");
      }
    } catch (err) {
      console.error("Failed to copy image to clipboard:", err);
      alert("Could not copy image. You can use 'Download Image' instead.");
    } finally {
      setCopyingImage(false);
    }
  };

  const generateBroadcastText = () => {
    let text = `📦 *${data.businessName || "K.O.M. EDIBLE OILS"}*\n`;
    if (data.tagline) text += `_${data.tagline}_\n`;
    text += `📅 *DAILY OIL RATES - ${data.date}*\n`;
    if (data.city) text += `📍 ${data.city}\n\n`;

    text += `──────────────────────\n`;
    text += `🥜 *1. GROUNDNUT OIL (સીંગતેલ)*\n`;
    text += `• Tin (15 Kg/L): ₹${data.groundnutOil.tinPrice || "—"}\n`;
    text += `• 5 Ltr Can: ₹${data.groundnutOil.canPrice || "—"}\n`;
    text += `• 1 Ltr Bottle: ₹${data.groundnutOil.bottlePrice || "—"}\n\n`;

    text += `🌿 *2. COTTONSEED OIL (કપાસિયા)*\n`;
    text += `• Tin (15 Kg/L): ₹${data.cottonSeedOil.tinPrice || "—"}\n`;
    text += `• 5 Ltr Can: ₹${data.cottonSeedOil.canPrice || "—"}\n`;
    text += `• 1 Ltr Bottle: ₹${data.cottonSeedOil.bottlePrice || "—"}\n`;

    if (data.customProducts && data.customProducts.length > 0) {
      data.customProducts.forEach((p, idx) => {
        text += `\n💧 *${idx + 3}. ${p.name.toUpperCase()}*\n`;
        text += `• Tin: ₹${p.tinPrice || "—"}\n`;
        text += `• 5 Ltr Can: ₹${p.canPrice || "—"}\n`;
        text += `• Bottle: ₹${p.bottlePrice || "—"}\n`;
      });
    }

    text += `──────────────────────\n`;
    if (data.note) text += `📢 *Note:* ${data.note}\n`;
    if (data.terms) text += `⚠️ *Terms:* ${data.terms}\n`;
    if (data.phone) text += `📞 *Call / WhatsApp:* ${data.phone}\n`;

    return text;
  };

  const handleCopyText = async () => {
    const text = generateBroadcastText();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      alert("Failed to copy text.");
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(generateBroadcastText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleSaveToHistory = () => {
    if (onSaveHistory) {
      onSaveHistory();
      setSavedHistory(true);
      setTimeout(() => setSavedHistory(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/80 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
              Export & Share
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            Download Image Card
          </h3>
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Ready
        </span>
      </div>

      {/* Main Download Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Gradient Download Button */}
        <button
          type="button"
          onClick={handleDownloadImage}
          disabled={downloading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs tracking-wide uppercase transition shadow-lg shadow-orange-500/20 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-white" />
              <span>Download Image (PNG)</span>
            </>
          )}
        </button>

        {/* Copy Image to Clipboard */}
        <button
          type="button"
          onClick={handleCopyImage}
          disabled={copyingImage}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide uppercase transition active:scale-[0.98] disabled:opacity-70 cursor-pointer shadow-md shadow-slate-900/10"
        >
          {copyingImage ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Copying...</span>
            </>
          ) : copiedImage ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-300" />
              <span>Copy Image</span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp & Text Broadcast Buttons */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>WhatsApp Text</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
        >
          {copiedText ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Text Copied!</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4 text-slate-500" />
              <span>Copy Text</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSaveToHistory}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition cursor-pointer"
        >
          {savedHistory ? (
            <>
              <Check className="w-4 h-4 text-amber-600" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4 text-amber-600" />
              <span>Save Log</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
