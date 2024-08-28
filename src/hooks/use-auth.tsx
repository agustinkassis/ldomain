// Packages

declare global {
  interface Window {
    nostr: any;
  }
}

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPublicKey, generateSecretKey } from "nostr-tools";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  // Flow
  const [userPubkey, setUserPubkey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginWithSecretKey = async (value: string) => {
    setIsLoading(true);

    if (value.length < 32) {
      toast.warning("The private key must have a minimum of 32 digits.");
      return;
    }

    // TO-DO
    // Revisar que no ingresa con @hodl.ar
    try {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(value);
      const pubkey: string = getPublicKey(uint8Array);

      setUserPubkey(pubkey);
      // initializeSigner(identity.signer);
      router.push("/admin");
    } catch (err) {
      toast.warning("An error occurred while logging in.");
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setUserPubkey(null);
    toast.success("Session closed.");
  };

  const handleGenerateSecretKey = () => {
    const secret = generateSecretKey();
    return secret;
  };

  const handleLoginWithExtension = async () => {
    setIsLoading(true);
    try {
      if (typeof (window as any).nostr === "undefined") {
        toast.warning("GetAlby is not installed or is not available");
        throw new Error("GetAlby is not installed or is not available");
      }

      // @ts-ignore
      const pubkey = await window.nostr.getPublicKey();

      setUserPubkey(pubkey);
      router.push("/admin");
    } catch (error) {
      toast.warning(
        "handleLoginWithExtension: An error occurred while logging in."
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.nostr.isEnabled().then((enabled: boolean) => {
      if (enabled) {
        handleLoginWithExtension();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    userPubkey,
    isLoading,
    loginWithSecretKey: handleLoginWithSecretKey,
    loginWithExtension: handleLoginWithExtension,
    logout: handleLogout,
    generateKey: handleGenerateSecretKey,
  };
};
