import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError } from "@/services/apiClient";
import { changePasswordRequest, loginRequest, meRequest, signupRequest } from "./authService";
import { clearToken, getToken, isAdminUser, isTokenUsable, userFromToken } from "./tokenStorage";
import type { AuthUser, ChangePasswordPayload, LoginPayload, SignupPayload } from "./types";
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
      // Admin accounts (either login form) land on the dashboard unless they had clicked an app first.
      if (redirectTo) goTo(redirectTo);
      else if (payload.admin || isAdminUser(user)) goTo("/admin");
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

/** PUT /auth/me/password */
export const changePassword = createAsyncThunk<void, ChangePasswordPayload, ThunkConfig>(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      await changePasswordRequest(payload);
    } catch (err) {
      return rejectWithValue(messageOf(err));
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, ThunkConfig>("auth/logout", async () => {
  clearToken();
});
