"use client";

import React from "react";
import { PricingData } from "@/types/pricing";
import { History, X, Trash2, ArrowUpRight, Calendar } from "lucide-react";

interface HistoryRecord {
  id: string;
  timestamp: string;
  data: PricingData;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryRecord[];
  onSelect: (record: PricingData) => void;
  onClear: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121215] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-neutral-800 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Rate Log History
              </h3>
              <p className="text-[11px] text-neutral-400">
                Previously saved records ({history.length})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of records */}
        <div className="py-4 overflow-y-auto flex-1 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-xs">
              <Calendar className="w-8 h-8 mx-auto text-neutral-600 mb-2 stroke-[1.5]" />
              No saved price records yet.
              <p className="text-[11px] text-neutral-500 mt-1">
                Click &quot;Save Log&quot; on the main page to keep a daily record!
              </p>
            </div>
          ) : (
            history.map((record) => (
              <div
                key={record.id}
                className="p-3.5 rounded-2xl border border-neutral-800/80 hover:border-neutral-700 bg-neutral-900/40 transition flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">
                      {record.data.date}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      Saved {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                    <div>
                      <span className="text-neutral-300 font-medium">Groundnut:</span>{" "}
                      Tin ₹{record.data.groundnutOil.tinPrice || "—"} • 5L ₹{record.data.groundnutOil.canPrice || "—"}
                    </div>
                    <div>
                      <span className="text-neutral-300 font-medium">Cottonseed:</span>{" "}
                      Tin ₹{record.data.cottonSeedOil.tinPrice || "—"} • 5L ₹{record.data.cottonSeedOil.canPrice || "—"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelect(record.data);
                    onClose();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 transition cursor-pointer"
                >
                  <span>Load</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
