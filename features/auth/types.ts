export type AuthUser = {
  id?: string;
  name: string;
  email: string;
};

export type AuthMode = "login" | "signup";

export type SignupPayload = { name: string; email: string; password: string };
export type LoginPayload = { email: string; password: string };

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
