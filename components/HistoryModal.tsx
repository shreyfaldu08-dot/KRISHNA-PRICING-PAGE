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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl shadow-slate-900/10 border border-slate-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shadow-sm">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Daily Price History
              </h3>
              <p className="text-[11px] text-slate-500">
                Previously saved records ({history.length})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of records */}
        <div className="py-4 overflow-y-auto flex-1 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Calendar className="w-8 h-8 mx-auto text-slate-300 mb-2 stroke-[1.5]" />
              No saved price records yet.
              <p className="text-[11px] text-slate-400 mt-1">
                Click &quot;Save Log&quot; on the main page to store your daily rates!
              </p>
            </div>
          ) : (
            history.map((record) => (
              <div
                key={record.id}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/20 transition flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">
                      {record.data.date}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Saved {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-900 font-semibold">Groundnut:</span>{" "}
                      Tin ₹{record.data.groundnutOil.tinPrice || "—"} • 5L ₹{record.data.groundnutOil.canPrice || "—"}
                    </div>
                    <div>
                      <span className="text-slate-900 font-semibold">Cottonseed:</span>{" "}
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
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs transition cursor-pointer shadow-sm"
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
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
