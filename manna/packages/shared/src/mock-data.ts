import type { CompanyProfile, CardDetails, CardTransaction } from "./types";

export const COMPANY_PROFILE: CompanyProfile = {
  name: "TechVentures GmbH",
  registration: "HRB 123456 B",
  country: "Germany",
  email: "treasury@techventures.de",
};

export const CARD_DETAILS: CardDetails = {
  number: "5432 7891 2345 7890",
  expiry: "12/27",
  cvv: "321",
  network: "Visa",
  holder: "TECHVENTURES GMBH",
};

export const CARD_TRANSACTIONS: CardTransaction[] = [
  { id: "1", merchant: "Amazon Web Services", amount: -2340.0, date: "2026-03-08", category: "Cloud" },
  { id: "2", merchant: "WeWork Berlin", amount: -890.0, date: "2026-03-07", category: "Office" },
  { id: "3", merchant: "Notion", amount: -45.0, date: "2026-03-05", category: "Software" },
  { id: "4", merchant: "Deutsche Bahn", amount: -156.8, date: "2026-03-04", category: "Travel" },
  { id: "5", merchant: "Figma", amount: -75.0, date: "2026-03-03", category: "Software" },
  { id: "6", merchant: "LinkedIn Recruiter", amount: -499.0, date: "2026-03-01", category: "HR" },
  { id: "7", merchant: "Heroku", amount: -120.0, date: "2026-02-28", category: "Cloud" },
  { id: "8", merchant: "Zoom", amount: -39.99, date: "2026-02-26", category: "Software" },
];
