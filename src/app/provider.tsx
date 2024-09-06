"use client";

import { AuthProvider } from "@/contexts/auth";
import { DomainProvider } from "@/contexts/domain";
import { useNostrHooks } from "nostr-hooks";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  useNostrHooks();
  return (
    <AuthProvider>
      <DomainProvider>{children}</DomainProvider>
    </AuthProvider>
  );
};
