"use client";

import { AuthProvider } from "@/contexts/auth";
import { DomainProvider } from "@/contexts/domain";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <DomainProvider>{children}</DomainProvider>
    </AuthProvider>
  );
};
