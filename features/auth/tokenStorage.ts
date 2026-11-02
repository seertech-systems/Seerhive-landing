import type { AuthUser } from "./types";

const TOKEN_KEY = "seerhive-token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function saveToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

export function clearToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

type JwtPayload = { exp?: number; sub?: string; name?: string; email?: string };

/** Reads the JWT payload. No signature check: the backend is the authority. */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

/** True when the string is a JWT that has not expired. */
export function isTokenUsable(token: string | null): token is string {
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  return !payload.exp || payload.exp * 1000 > Date.now();
}

/** Best-effort user from the token's own claims. */
export function userFromToken(token: string): AuthUser | null {
  const p = decodeToken(token);
  return p ? { id: p.sub, name: p.name ?? "", email: p.email ?? "" } : null;
}
