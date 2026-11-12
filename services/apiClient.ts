import { API_URL } from "@/config/api";
import { getToken } from "@/features/auth/tokenStorage";

/** An error from the backend (or from reaching it) with a message that is safe to show. */
export class ApiError extends Error {
  status: number;
  /** Per-field problems when the backend lists them (400 validation errors). */
  fieldErrors: { field: string; message: string }[];
  constructor(message: string, status = 0, fieldErrors: { field: string; message: string }[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Query-string values; empty / undefined ones are left out. */
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  /** Send `Authorization: Bearer <jwt>` when a token is stored. */
  auth?: boolean;
};

/**
 * Small fetch wrapper: JSON in/out, Bearer token, and backend errors
 * ({ "message": "..." }) turned into ApiError.
 */
export async function apiRequest<T>(path: string, { method = "GET", body, auth = false, query }: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    const qs = new URLSearchParams();
    Object.entries(query ?? {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    });
    const url = `${API_URL}${path}${qs.toString() ? `?${qs}` : ""}`;
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Could not reach the server. Check your connection and try again.");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(data?.message ?? data?.error ?? "Something went wrong. Please try again.", res.status, Array.isArray(data?.errors) ? data.errors : []);
  }
  return data as T;
}
