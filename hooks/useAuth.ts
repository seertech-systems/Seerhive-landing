import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuthModal } from "@/features/auth/authSlice";
import { logoutUser } from "@/features/auth/authThunks";
import { openApp } from "@/features/auth/openApp";
import type { AuthMode } from "@/features/auth/types";

/** The one hook components use for login state and actions. */
export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const sessionChecked = useAppSelector((s) => s.auth.sessionChecked);

  return {
    user,
    sessionChecked,
    /** Valid JWT -> go to `url`; otherwise show login / sign-up first. */
    openApp: useCallback((url: string) => void dispatch(openApp(url)), [dispatch]),
    /** Open the login / sign-up form directly (navbar buttons). */
    openAuth: useCallback((mode: AuthMode) => dispatch(openAuthModal({ mode })), [dispatch]),
    logout: useCallback(() => void dispatch(logoutUser()), [dispatch]),
  };
}
