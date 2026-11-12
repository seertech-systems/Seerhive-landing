import { apiRequest } from "@/services/apiClient";

export type Option = { code: string; label: string };
export type ContactOptions = {
  enquiryTypes: Option[];
  products: Option[];
  companySizes: Option[];
  sources: Option[];
  statuses: Option[];
};

export type ContactPayload = {
  fullName: string;
  workEmail: string;
  company: string;
  enquiryType: string;
  product: string;
  companySize?: string;
  phone?: string; // E.164, e.g. +919876543210, or empty
  message?: string;
  consent: boolean;
  source?: string;
};

export type ContactSubmitted = { referenceNo: string; title: string; message: string; submittedOn: string };

/** GET /contact/options: the dropdown lists (public). */
export const getContactOptions = () => apiRequest<ContactOptions>("/contact/options");

/** POST /contact: public. 201 with a reference number; 400 lists the wrong fields; 429 when sent too often. */
export const submitContact = (payload: ContactPayload) =>
  apiRequest<ContactSubmitted>("/contact", { method: "POST", body: payload });
