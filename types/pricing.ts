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
  templateId: "royal-amber" | "modern-emerald" | "classic-navy" | "custom-image";
  customBgUrl?: string;
  customLogoUrl?: string;
}

export const INITIAL_PRICING_DATA: PricingData = {
  businessName: "K.O.M. EDIBLE OILS",
  tagline: "Pure Quality • Best Market Rates",
  phone: "+91 98765 43210",
  city: "Rajkot / Market Yard",
  date: "2026-11-02",
  groundnutOil: {
    tinPrice: "2450",
    canPrice: "2350",
    bottlePrice: "165",
  },
  cottonSeedOil: {
    tinPrice: "2050",
    canPrice: "1950",
    bottlePrice: "140",
  },
  customProducts: [],
  note: "Rates are valid for today only. Ex-Mill / Ready Delivery.",
  terms: "Payment within 48 hours • Taxes as applicable • Loading free",
  templateId: "royal-amber",
};
