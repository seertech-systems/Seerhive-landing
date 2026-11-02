import { API_URL } from "@/config/api";
import { getToken } from "@/features/auth/tokenStorage";

/** An error from the backend (or from reaching it) with a message that is safe to show. */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** Send `Authorization: Bearer <jwt>` when a token is stored. */
  auth?: boolean;
};

/**
 * Small fetch wrapper: JSON in/out, Bearer token, and backend errors
 * ({ "message": "..." }) turned into ApiError.
 */
export async function apiRequest<T>(path: string, { method = "GET", body, auth = false }: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
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
    throw new ApiError(data?.message ?? data?.error ?? "Something went wrong. Please try again.", res.status);
  }
  return data as T;
}
