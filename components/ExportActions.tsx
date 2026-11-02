"use client";

import React, { useState } from "react";
import { toPng, toBlob } from "html-to-image";
import confetti from "canvas-confetti";
import { PricingData } from "@/types/pricing";
import {
  Download,
  Copy,
  Share2,
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

      // Give a tiny tick for any DOM updates
      await new Promise((res) => setTimeout(res, 100));

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2.5, // 2.5x retina clarity for crystal clear text
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

      // Confetti celebration
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

  // Build WhatsApp Broadcast text
  const generateBroadcastText = () => {
    let text = `🔥 *${data.businessName || "K.O.M. EDIBLE OILS"}*\n`;
    if (data.tagline) text += `_${data.tagline}_\n`;
    text += `📅 *DAILY OIL RATES - ${data.date}*\n`;
    if (data.city) text += `📍 ${data.city}\n\n`;

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🥜 *1. GROUNDNUT OIL (સીંગતેલ)*\n`;
    text += `• Tin (15 Kg/L): ₹${data.groundnutOil.tinPrice || "—"}\n`;
    text += `• Can (15 Ltr): ₹${data.groundnutOil.canPrice || "—"}\n`;
    text += `• Bottle (1 Ltr): ₹${data.groundnutOil.bottlePrice || "—"}\n\n`;

    text += `🌿 *2. COTTONSEED OIL (કપાસિયા)*\n`;
    text += `• Tin (15 Kg/L): ₹${data.cottonSeedOil.tinPrice || "—"}\n`;
    text += `• Can (15 Ltr): ₹${data.cottonSeedOil.canPrice || "—"}\n`;
    text += `• Bottle (1 Ltr): ₹${data.cottonSeedOil.bottlePrice || "—"}\n`;

    if (data.customProducts && data.customProducts.length > 0) {
      data.customProducts.forEach((p, idx) => {
        text += `\n💧 *${idx + 3}. ${p.name.toUpperCase()}*\n`;
        text += `• Tin: ₹${p.tinPrice || "—"}\n`;
        text += `• Can: ₹${p.canPrice || "—"}\n`;
        text += `• Bottle: ₹${p.bottlePrice || "—"}\n`;
      });
    }

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    if (data.note) text += `📢 *Note:* ${data.note}\n`;
    if (data.terms) text += `⚠️ *Terms:* ${data.terms}\n`;
    if (data.phone) text += `📞 *Call / WhatsApp:* ${data.phone}\n`;

    return text;
  };

  // Copy Text
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

  // Share on WhatsApp directly
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
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-neutral-100 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            Export & Share Rates
          </h3>
          <p className="text-xs text-neutral-500">
            Instant image generation for WhatsApp dealers & customers
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
          Ready to Send
        </span>
      </div>

      {/* Main Download Button */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleDownloadImage}
          disabled={downloading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-[0.98] disabled:opacity-70 cursor-pointer"
        >
          {downloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Image...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Download Image (PNG)</span>
            </>
          )}
        </button>

        {/* Copy Image to Clipboard */}
        <button
          type="button"
          onClick={handleCopyImage}
          disabled={copyingImage}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-md transition-all transform active:scale-[0.98] disabled:opacity-70 cursor-pointer"
        >
          {copyingImage ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Copying Image...</span>
            </>
          ) : copiedImage ? (
            <>
              <Check className="w-5 h-5 text-emerald-400" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-neutral-300" />
              <span>Copy Image to Clipboard</span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp & Text Broadcast Buttons */}
      <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-sm transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Send on WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition"
        >
          {copiedText ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Text Copied!</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4 text-neutral-500" />
              <span>Copy WhatsApp Text</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSaveToHistory}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/60 font-semibold text-xs transition"
        >
          {savedHistory ? (
            <>
              <Check className="w-4 h-4 text-amber-600" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4 text-amber-600" />
              <span>Save to History</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

