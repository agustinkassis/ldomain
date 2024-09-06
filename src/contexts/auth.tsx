import { generateSecretKey, getPublicKey } from "nostr-tools";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { NostrWindow } from "@/types/extension";

export interface AuthContextType {
  isLoading: boolean;
  userPubkey: string | null;
  loginWithSecretKey: (value: string) => Promise<boolean | undefined>;
  loginWithExtension: () => Promise<boolean | undefined>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  userPubkey: null,
  loginWithSecretKey: async () => false,
  loginWithExtension: async () => false,
  logout: () => {},
});

interface AuthProviderProps {
  autoconnect?: boolean;
  children: React.ReactNode;
}

const w: NostrWindow | undefined =
  typeof window !== "undefined" ? (window as any) : undefined;

export function AuthProvider({
  autoconnect = true,
  children,
}: AuthProviderProps) {
  // Flow
  const [userPubkey, setUserPubkey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginWithSecretKey = async (value: string) => {
    if (isLoading) return;
    setIsLoading(true);

    if (value.length < 32) {
      toast.warning("The private key must have a minimum of 32 digits.");
      return;
    }

    try {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(value);
      const pubkey: string = getPublicKey(uint8Array);

      setUserPubkey(pubkey);
      setIsLoading(true);
      return true;
    } catch (err) {
      toast.warning("An error occurred while logging in.");
      return false;
      setIsLoading(false);
    }
  };

  const handleLoginWithExtension = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (!w?.nostr) {
        toast.warning("GetAlby is not installed or is not available");
        throw new Error("GetAlby is not installed or is not available");
      }

      // @ts-ignore
      const pubkey = await w.nostr.getPublicKey();

      setUserPubkey(pubkey);
      toast.success("Logged with extension");
      setIsLoading(false);
      return true;
    } catch (error) {
      toast.warning(
        "handleLoginWithExtension: An error occurred while logging in."
      );
      setIsLoading(false);
      return false;
    }
  };

  const handleLogout = async () => {
    setUserPubkey(null);

    setIsLoading(false);
    toast.success("Session closed.");
  };

  useEffect(() => {
    if (!autoconnect) {
      return;
    }
    w?.nostr?.isEnabled().then((enabled: boolean) => {
      if (enabled) {
        handleLoginWithExtension();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoconnect]);

  return (
    <AuthContext.Provider
      value={{
        userPubkey,
        isLoading,
        loginWithSecretKey: handleLoginWithSecretKey,
        loginWithExtension: handleLoginWithExtension,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
