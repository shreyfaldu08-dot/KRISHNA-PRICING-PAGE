export interface ProductRate {
  id: string;
  name: string;
  tinPrice: string;
  canPrice: string;
  bottlePrice: string;
  unitNotes?: {
    tin?: string;
    can?: string;
    bottle?: string;
  };
  trend?: "up" | "down" | "stable";
}

export interface PricingData {
  businessName: string;
  tagline: string;
  phone: string;
  city: string;
  date: string;
  groundnutOil: {
    tinPrice: string;
    canPrice: string;
    bottlePrice: string;
  };
  cottonSeedOil: {
    tinPrice: string;
    canPrice: string;
    bottlePrice: string;
  };
  customProducts: ProductRate[];
  note: string;
  terms: string;
  templateId: "minimal-obsidian" | "porcelain-light" | "nordic-slate" | "custom-image";
  customBgUrl?: string;
  customLogoUrl?: string;
}

export const INITIAL_PRICING_DATA: PricingData = {
  businessName: "K.O.M. EDIBLE OILS",
  tagline: "Pure Edible Oils • Daily Wholesale Rates",
  phone: "+91 98765 43210",
  city: "Rajkot, Gujarat",
  date: "2026-11-02",
  groundnutOil: {
    tinPrice: "2450",
    canPrice: "850",
    bottlePrice: "165",
  },
  cottonSeedOil: {
    tinPrice: "2050",
    canPrice: "710",
    bottlePrice: "140",
  },
  customProducts: [],
  note: "Rates valid for today only. Ex-mill / ready delivery.",
  terms: "Payment within 48 hours • Taxes applicable as per GST norms",
  templateId: "minimal-obsidian",
};
