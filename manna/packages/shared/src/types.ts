export type CardNetwork = "Visa" | "Mastercard";

export interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  network: CardNetwork;
  holder: string;
}

export interface CardTransaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
}

export interface CompanyProfile {
  name: string;
  registration: string;
  country: string;
  email: string;
}
