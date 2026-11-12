import { apiRequest } from "@/services/apiClient";

/** Admin enquiry (Contact Us leads) API. All calls need an ADMIN token. */
const BASE = "/admin/enquiries";

export type EnquiryNote = { noteId: number; note: string; insertedBy?: string; insertedOn?: string };

export type Enquiry = {
  enquiryId: number;
  referenceNo: string;
  fullName: string;
  workEmail: string;
  company: string;
  phone?: string;
  companySize?: string;
  enquiryType: string;
  product: string;
  source?: string;
  status: string;
  message?: string;
  consentGiven?: boolean;
  consentOn?: string;
  insertedOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  notes?: EnquiryNote[];
};

export type EnquiryQuery = {
  page: number; // zero-based
  size: number; // 1 to 100
  sortBy?: string; // enquiryId, fullName, workEmail, company, enquiryType, product, source, status, insertedOn, updatedOn
  sortDir?: "asc" | "desc";
  search?: string; // name, email, company or a reference such as ENQ-000042
  enquiryType?: string;
  product?: string;
  status?: string;
  source?: string;
  fromDate?: string; // yyyy-MM-dd
  toDate?: string; // yyyy-MM-dd, inclusive
};

export type EnquiryPage = { items: Enquiry[]; total: number; totalPages: number; page: number; size: number };

/** GET /admin/enquiries */
export async function listEnquiries(q: EnquiryQuery): Promise<EnquiryPage> {
  const data = await apiRequest<any>(BASE, { auth: true, query: { ...q, search: q.search?.trim() } });
  const items: Enquiry[] = data?.content ?? [];
  return {
    items,
    total: data?.totalElements ?? items.length,
    totalPages: data?.totalPages ?? 1,
    page: data?.pageNumber ?? q.page,
    size: data?.pageSize ?? q.size,
  };
}

/** GET /admin/enquiries/{id}: one enquiry with its notes. */
export const getEnquiry = (id: number) => apiRequest<Enquiry>(`${BASE}/${id}`, { auth: true });

/** PATCH /admin/enquiries/{id}/status: NEW, CONTACTED, QUALIFIED or CLOSED, in any order. */
export const setEnquiryStatus = (id: number, status: string) =>
  apiRequest<Enquiry>(`${BASE}/${id}/status`, { method: "PATCH", auth: true, body: { status } });

/** POST /admin/enquiries/{id}/notes: an internal note. */
export const addEnquiryNote = (id: number, note: string) =>
  apiRequest<unknown>(`${BASE}/${id}/notes`, { method: "POST", auth: true, body: { note } });

/** DELETE /admin/enquiries/{id}/notes/{noteId} */
export const deleteEnquiryNote = (id: number, noteId: number) =>
  apiRequest<unknown>(`${BASE}/${id}/notes/${noteId}`, { method: "DELETE", auth: true });

/** DELETE /admin/enquiries/{id}: permanent. */
export const deleteEnquiry = (id: number) => apiRequest<unknown>(`${BASE}/${id}`, { method: "DELETE", auth: true });

/** POST /admin/enquiries/bulk-delete: up to 100 ids. */
export const bulkDeleteEnquiries = (ids: number[]) =>
  apiRequest<{ message?: string }>(`${BASE}/bulk-delete`, { method: "POST", auth: true, body: { ids } });
