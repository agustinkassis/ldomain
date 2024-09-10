"use client";

import { ThemeProvider } from "@/components/shared/theme-provider";
import { AuthProvider } from "@/contexts/auth";
import { DomainProvider } from "@/features/domains/contexts/domain";
import { useNostrHooks } from "nostr-hooks";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  useNostrHooks();
  return (
    <AuthProvider>
      <DomainProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </DomainProvider>
    </AuthProvider>
  );
};
