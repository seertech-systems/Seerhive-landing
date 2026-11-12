import { ENDPOINTS } from "@/config/api";
import { ApiError, apiRequest } from "@/services/apiClient";
import { normalizeRoles, saveToken, userFromToken } from "./tokenStorage";
import type { AuthResponse, AuthUser, ChangePasswordPayload, LoginPayload, SignupPayload } from "./types";

/** Accepts `{ user: {...} }` or a bare user object, so small backend variations still work. */
export function pickUser(data: any, token?: string): AuthUser {
  const u = data?.user ?? data;
  const full = [u?.firstName ?? u?.first_name, u?.lastName ?? u?.last_name].filter(Boolean).join(" ");
  // A real name wins over the login / username, which is only a fallback.
  const name = u?.fullName ?? u?.full_name ?? u?.displayName ?? u?.name ?? (full || (u?.username ?? u?.login ?? ""));
  if (name || u?.email) {
    const roles = normalizeRoles(u.roles ?? u.role ?? u.authorities);
    return { id: u.id != null ? String(u.id) : undefined, name, email: u.email ?? "", roles: roles.length ? roles : userFromToken(token ?? "")?.roles };
  }
  return (token && userFromToken(token)) || { name: "", email: "" };
}

async function authenticate(path: string, body: object): Promise<AuthUser> {
  const data = await apiRequest<any>(path, { method: "POST", body });
  const token: string | undefined = data?.token ?? data?.accessToken ?? data?.jwt;
  if (!token) throw new ApiError("The server did not return a token.");
  saveToken(token);
  // The login response may carry only the username; the profile has the real name.
  try {
    return await meRequest(token);
  } catch {
    return pickUser(data, token);
  }
}

/** POST /auth/signup */
export const signupRequest = (payload: SignupPayload) => authenticate(ENDPOINTS.signup, payload);

/** POST /auth/login, or POST /auth/admin/login when `admin` is set. Body: { login, password }. */
export const loginRequest = async ({ admin, ...body }: LoginPayload) => {
  const user = await authenticate(admin ? ENDPOINTS.adminLogin : ENDPOINTS.login, body);
  // /auth/admin/login only accepts ADMIN accounts, so success proves the role even if the profile omits it.
  return admin && !user.roles?.includes("ADMIN") ? { ...user, roles: [...(user.roles ?? []), "ADMIN"] } : user;
};

/**
 * PUT /auth/me/password: change the signed-in user's own password (needs the current one).
 * The backend logs out every OTHER session and returns a fresh accessToken for this one, so it
 * must be stored here; otherwise the next request is rejected and this session drops too.
 */
export const changePasswordRequest = async (payload: ChangePasswordPayload) => {
  const data = await apiRequest<any>(ENDPOINTS.changePassword, { method: "PUT", body: payload, auth: true });
  const token: string | undefined = data?.accessToken ?? data?.token;
  if (token) saveToken(token);
  return data;
};

/** GET /auth/me with the stored token. */
export const meRequest = async (token: string): Promise<AuthUser> =>
  pickUser(await apiRequest<AuthResponse | AuthUser>(ENDPOINTS.me, { auth: true }), token);
