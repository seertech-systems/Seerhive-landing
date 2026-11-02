import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError } from "@/services/apiClient";
import { loginRequest, meRequest, signupRequest } from "./authService";
import { clearToken, getToken, isTokenUsable, userFromToken } from "./tokenStorage";
import type { AuthUser, LoginPayload, SignupPayload } from "./types";
// Type-only import: the store imports the slice, which imports this file.
import type { AppDispatch, RootState } from "@/store";

type ThunkConfig = { state: RootState; dispatch: AppDispatch; rejectValue: string };

export const goTo = (url: string) => {
  window.location.href = url;
};

const messageOf = (err: unknown) =>
  err instanceof ApiError ? err.message : "Something went wrong. Please try again.";

/**
 * Is there a valid login right now? Checks the stored JWT locally, then asks the
 * backend. A 401/403 clears the token; a network error or a missing /auth/me falls
 * back to trusting the unexpired token.
 */
export const checkSession = createAsyncThunk<AuthUser | null, void, ThunkConfig>(
  "auth/checkSession",
  async () => {
    const token = getToken();
    if (!isTokenUsable(token)) {
      clearToken();
      return null;
    }
    try {
      return await meRequest(token);
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearToken();
        return null;
      }
      return userFromToken(token) ?? { name: "", email: "" };
    }
  }
);

/** POST /auth/login, then open the app the visitor had clicked (if any). */
export const loginUser = createAsyncThunk<AuthUser, LoginPayload, ThunkConfig>(
  "auth/login",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const redirectTo = getState().auth.modal.redirectTo;
      const user = await loginRequest(payload);
      if (redirectTo) goTo(redirectTo);
      return user;
    } catch (err) {
      return rejectWithValue(messageOf(err));
    }
  }
);

/** POST /auth/signup, then open the app the visitor had clicked (if any). */
export const signupUser = createAsyncThunk<AuthUser, SignupPayload, ThunkConfig>(
  "auth/signup",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const redirectTo = getState().auth.modal.redirectTo;
      const user = await signupRequest(payload);
      if (redirectTo) goTo(redirectTo);
      return user;
    } catch (err) {
      return rejectWithValue(messageOf(err));
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, ThunkConfig>("auth/logout", async () => {
  clearToken();
});
