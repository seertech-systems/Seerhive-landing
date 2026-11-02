"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { checkSession } from "@/features/auth/authThunks";
import AuthModal from "@/components/auth/AuthModal";

/**
 * Creates one store per browser session, checks the stored JWT once on load,
 * and mounts the login / sign-up modal (it renders only while the store says it is open).
 */
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {
    storeRef.current!.dispatch(checkSession());
  }, []);

  return (
    <Provider store={storeRef.current}>
      {children}
      <AuthModal />
    </Provider>
  );
}
