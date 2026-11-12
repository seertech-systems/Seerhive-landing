export type AuthUser = {
  id?: string;
  name: string;
  email: string;
  /** Role names without the ROLE_ prefix, e.g. ["ADMIN"]. */
  roles?: string[];
};

export type AuthMode = "login" | "signup" | "password";

export type SignupPayload = { name: string; email: string; password: string };
/** `login` is the account's email or username. `admin` uses POST /auth/admin/login (ADMIN accounts only). */
export type LoginPayload = { login: string; password: string; admin?: boolean };

/** PUT /auth/me/password */
export type ChangePasswordPayload = { currentPassword: string; newPassword: string };

/** What POST /auth/signup and POST /auth/login return. */
export type AuthResponse = {
  token: string;
  user?: AuthUser;
};

export type AuthModalState = {
  open: boolean;
  mode: AuthMode;
  /** App the visitor clicked before being asked to log in; opened right after login. */
  redirectTo: string | null;
};
