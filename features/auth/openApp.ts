import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/store";
import { openAuthModal } from "./authSlice";
import { checkSession, goTo } from "./authThunks";

/**
 * Clicking an "Open app" link: valid JWT -> go straight to the route,
 * otherwise show the login / sign-up form and remember where to go afterwards.
 * (Its own file because it needs both the slice and the thunks, which import each other's types.)
 */
export const openApp = createAsyncThunk<void, string, { state: RootState; dispatch: AppDispatch }>(
  "auth/openApp",
  async (url, { dispatch }) => {
    const user = await dispatch(checkSession()).unwrap();
    if (user) goTo(url);
    else dispatch(openAuthModal({ mode: "login", redirectTo: url }));
  }
);
