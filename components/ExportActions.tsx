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
} from "lucide-react";

interface ExportActionsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  data: PricingData;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  cardRef,
  data,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copyingImage, setCopyingImage] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

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
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error("Failed to generate image:", err);
      alert("Error generating image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

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
        alert("Clipboard Image copy is not supported in this browser. Please use 'Download Price Card'.");
      }
    } catch (err) {
      console.error("Failed to copy image:", err);
      alert("Could not copy image. You can click 'Download Price Card' instead.");
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

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl shadow-sky-950/5 border border-white space-y-3">
      {/* Primary Big Gradient Download Button */}
      <button
        type="button"
        onClick={handleDownloadImage}
        disabled={downloading}
        className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-sm tracking-wide uppercase transition shadow-lg shadow-sky-500/25 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
      >
        {downloading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating High-Res Image...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download Price Card (PNG)</span>
          </>
        )}
      </button>

      {/* Secondary Actions with Minimal Soft Sky-Blue Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Share</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 text-slate-800 font-bold text-xs border border-sky-200/80 transition cursor-pointer"
        >
          {copiedText ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Text Copied!</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4 text-sky-600" />
              <span>Copy Text</span>
            </>
          )}
        </button>

        {/* Minimal Gradient Copy Image Button (Replacing old black button) */}
        <button
          type="button"
          onClick={handleCopyImage}
          disabled={copyingImage}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-100 via-blue-100 to-sky-200 hover:from-sky-200 hover:to-blue-200 text-blue-950 font-bold text-xs border border-sky-300/80 shadow-xs transition cursor-pointer disabled:opacity-60"
        >
          {copyingImage ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-blue-900" />
              <span>Copying...</span>
            </>
          ) : copiedImage ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Copied Image!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-blue-700" />
              <span>Copy Image</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
