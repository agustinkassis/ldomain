"use client";

import { DomainProvider } from "@/contexts/domain";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <DomainProvider>{children}</DomainProvider>;
};
