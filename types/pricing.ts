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
  note: string;
  terms: string;
  templateId: "krishna-official" | "custom-image";
  customBgUrl?: string;
}

export const INITIAL_PRICING_DATA: PricingData = {
  businessName: "KRISHNA EXPORT. INDUSTRIES",
  tagline: "PRODUCT COLLECTION & WHOLESALE PRICE LIST",
  phone: "+91 98765 43210",
  city: "JUNAGADH",
  date: "2026-10-30",
  groundnutOil: {
    tinPrice: "2850",
    canPrice: "882",
    bottlePrice: "177",
  },
  cottonSeedOil: {
    tinPrice: "2445-2455",
    canPrice: "758",
    bottlePrice: "151",
  },
  note: "ALL RATES PLUS GST • EX-FACTORY | JUNAGADH",
  terms: "Payment within 48 hours • Loading free",
  templateId: "krishna-official",
};
