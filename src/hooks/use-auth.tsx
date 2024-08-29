"use client";
// Packages

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPublicKey, generateSecretKey } from "nostr-tools";
import { toast } from "sonner";
import { NostrWindow } from "@/types/extension";

const w: NostrWindow = window as any;

export const useAuth = () => {
  const router = useRouter();

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
      if (!w.nostr) {
        toast.warning("GetAlby is not installed or is not available");
        throw new Error("GetAlby is not installed or is not available");
      }

      // @ts-ignore
      const pubkey = await window.nostr.getPublicKey();

      setUserPubkey(pubkey);
      toast.warning("Logged with extension");
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

  const handleGenerateSecretKey = () => {
    const secret = generateSecretKey();
    return secret;
  };

  useEffect(() => {
    w.nostr?.isEnabled().then((enabled: boolean) => {
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
