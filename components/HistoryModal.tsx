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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-neutral-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">
                Daily Price History
              </h3>
              <p className="text-xs text-neutral-500">
                Previously saved rates ({history.length} records)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of records */}
        <div className="py-4 overflow-y-auto flex-1 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm">
              <Calendar className="w-10 h-10 mx-auto text-neutral-300 mb-2 stroke-[1.5]" />
              No saved price records yet.
              <p className="text-xs text-neutral-400 mt-1">
                Click &quot;Save to History&quot; on the main page to keep a daily log!
              </p>
            </div>
          ) : (
            history.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 hover:bg-amber-50/30 transition group flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">
                      Date: {record.data.date}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Saved {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
                    <div>
                      <span className="font-semibold text-neutral-800">Groundnut:</span>{" "}
                      Tin ₹{record.data.groundnutOil.tinPrice || "—"} • Can ₹{record.data.groundnutOil.canPrice || "—"}
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-800">Cottonseed:</span>{" "}
                      Tin ₹{record.data.cottonSeedOil.tinPrice || "—"} • Can ₹{record.data.cottonSeedOil.canPrice || "—"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelect(record.data);
                    onClose();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 text-white font-semibold text-xs hover:bg-amber-600 shadow-sm transition"
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
          <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

