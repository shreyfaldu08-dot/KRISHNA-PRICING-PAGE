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
        quality: 0.98,
        pixelRatio: 3, // 3x ultra-sharp resolution for WhatsApp
        cacheBust: true,
      });

      const dateStr = data.date || "today";
      const fileName = `Krishna_Export_Rates_${dateStr}.png`;

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
        quality: 0.98,
        pixelRatio: 3,
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
        alert("Clipboard Image copy is not supported in this browser. Please use 'Download Poster Image'.");
      }
    } catch (err) {
      console.error("Failed to copy image:", err);
      alert("Could not copy image. You can click 'Download Poster Image' instead.");
    } finally {
      setCopyingImage(false);
    }
  };

  const generateBroadcastText = () => {
    let text = `🙏 *जय श्री कृष्णा*\n`;
    text += `🏢 *${data.businessName || "KRISHNA EXPORT. INDUSTRIES"}*\n`;
    text += `📋 *PRODUCT COLLECTION & WHOLESALE PRICE LIST*\n`;
    text += `📅 *Date:* ${data.date}\n\n`;

    text += `──────────────────────\n`;
    text += `🌿 *TRUPTI - COTTON SEED REFINED OIL*\n`;
    text += `• Tin: ₹${data.cottonSeedOil.tinPrice || "—"} + NEW TIN\n`;
    text += `• 5 Ltr Can: ₹${data.cottonSeedOil.canPrice || "—"}\n`;
    text += `• 1 Ltr Bottle: ₹${data.cottonSeedOil.bottlePrice || "—"}\n\n`;

    text += `🥜 *KRISHNA - GROUNDNUT OIL (સીંગતેલ)*\n`;
    text += `• Tin: ₹${data.groundnutOil.tinPrice || "—"} + NEW TIN\n`;
    text += `• 5 Ltr Can: ₹${data.groundnutOil.canPrice || "—"}\n`;
    text += `• 1 Ltr Bottle: ₹${data.groundnutOil.bottlePrice || "—"}\n`;

    text += `──────────────────────\n`;
    text += `⚠️ *ALL RATES PLUS GST*\n`;
    text += `📍 *EX-FACTORY | JUNAGADH*\n`;

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
    <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl shadow-sky-950/5 border border-white space-y-3">
      {/* Primary Big Download Button */}
      <button
        type="button"
        onClick={handleDownloadImage}
        disabled={downloading}
        className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-black text-sm tracking-wide uppercase transition shadow-lg shadow-amber-600/25 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
      >
        {downloading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating Poster...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download Poster Image (PNG)</span>
          </>
        )}
      </button>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Text</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
        >
          {copiedText ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Text Copied!</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4 text-amber-700" />
              <span>Copy Text</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleCopyImage}
          disabled={copyingImage}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300/80 shadow-xs transition cursor-pointer disabled:opacity-60"
        >
          {copyingImage ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-900" />
              <span>Copying...</span>
            </>
          ) : copiedImage ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Copied Image!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-700" />
              <span>Copy Image</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
