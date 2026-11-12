/**
 * Spring Boot backend address and auth endpoints, in one place.
 * Set the address in `.env.local`:  NEXT_PUBLIC_API_URL=http://localhost:9090
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9090").replace(/\/$/, "");

export const ENDPOINTS = {
  signup: "/auth/signup",
  login: "/auth/login",
  adminLogin: "/auth/admin/login",
  changePassword: "/auth/me/password",
  me: "/auth/me",
} as const;
