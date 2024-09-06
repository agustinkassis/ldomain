"use client";
import { AuthContext } from "@/contexts/auth";
// Packages
import { generateSecretKey } from "nostr-tools";
import { useContext } from "react";

export const useAuth = () => {
  const {
    userPubkey,
    isLoading,
    loginWithSecretKey,
    loginWithExtension,
    logout,
  } = useContext(AuthContext);

  const handleGenerateSecretKey = () => {
    const secret = generateSecretKey();
    return secret;
  };

  return {
    userPubkey,
    isLoading,
    loginWithSecretKey,
    loginWithExtension,
    logout,
    generateKey: handleGenerateSecretKey,
  };
};
