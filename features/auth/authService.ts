import { ENDPOINTS } from "@/config/api";
import { ApiError, apiRequest } from "@/services/apiClient";
import { saveToken, userFromToken } from "./tokenStorage";
import type { AuthResponse, AuthUser, LoginPayload, SignupPayload } from "./types";

/** Accepts `{ user: {...} }` or a bare user object, so small backend variations still work. */
export function pickUser(data: any, token?: string): AuthUser {
  const u = data?.user ?? data;
  if (u?.email || u?.name) return { id: u.id != null ? String(u.id) : undefined, name: u.name ?? "", email: u.email ?? "" };
  return (token && userFromToken(token)) || { name: "", email: "" };
}

async function authenticate(path: string, body: object): Promise<AuthUser> {
  const data = await apiRequest<any>(path, { method: "POST", body });
  const token: string | undefined = data?.token ?? data?.accessToken ?? data?.jwt;
  if (!token) throw new ApiError("The server did not return a token.");
  saveToken(token);
  return pickUser(data, token);
}

/** POST /auth/signup */
export const signupRequest = (payload: SignupPayload) => authenticate(ENDPOINTS.signup, payload);

/** POST /auth/login */
export const loginRequest = (payload: LoginPayload) => authenticate(ENDPOINTS.login, payload);

/** GET /auth/me with the stored token. */
export const meRequest = async (token: string): Promise<AuthUser> =>
  pickUser(await apiRequest<AuthResponse | AuthUser>(ENDPOINTS.me, { auth: true }), token);
