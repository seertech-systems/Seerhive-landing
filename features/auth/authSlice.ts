import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthMode, AuthModalState, AuthUser } from "./types";
import { checkSession, loginUser, logoutUser, signupUser } from "./authThunks";

export type AuthState = {
  user: AuthUser | null;
  /** The request in flight from the login / sign-up form. */
  status: "idle" | "loading" | "failed";
  error: string | null;
  /** True once the stored token has been checked on page load. */
  sessionChecked: boolean;
  modal: AuthModalState;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  sessionChecked: false,
  modal: { open: false, mode: "login", redirectTo: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal(state, action: PayloadAction<{ mode?: AuthMode; redirectTo?: string | null } | undefined>) {
      state.modal = {
        open: true,
        mode: action.payload?.mode ?? "login",
        redirectTo: action.payload?.redirectTo ?? null,
      };
      state.error = null;
    },
    closeAuthModal(state) {
      state.modal = { open: false, mode: state.modal.mode, redirectTo: null };
      state.error = null;
      state.status = "idle";
    },
    setAuthMode(state, action: PayloadAction<AuthMode>) {
      state.modal.mode = action.payload;
      state.error = null;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // session check on page load / before opening an app
      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.sessionChecked = true;
      })
      // login + sign-up share the same lifecycle
      .addCase(loginUser.pending, pendingForm)
      .addCase(signupUser.pending, pendingForm)
      .addCase(loginUser.fulfilled, signedIn)
      .addCase(signupUser.fulfilled, signedIn)
      .addCase(loginUser.rejected, failedForm)
      .addCase(signupUser.rejected, failedForm)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

function pendingForm(state: AuthState) {
  state.status = "loading";
  state.error = null;
}
function signedIn(state: AuthState, action: PayloadAction<AuthUser>) {
  state.status = "idle";
  state.user = action.payload;
  state.sessionChecked = true;
  state.modal = { open: false, mode: state.modal.mode, redirectTo: null };
}
function failedForm(state: AuthState, action: { payload?: unknown; error: { message?: string } }) {
  state.status = "failed";
  state.error = (action.payload as string) ?? action.error.message ?? "Something went wrong. Please try again.";
}

export const { openAuthModal, closeAuthModal, setAuthMode, setAuthError } = authSlice.actions;
export default authSlice.reducer;
