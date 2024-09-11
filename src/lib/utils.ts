import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Domain } from "@/types/domain";
import { LNURLResponse } from "@/types/lud";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function resolveLud16(
  walias: string
): Promise<LNURLResponse | null> {
  const [username, domain] = walias.split("@");

  try {
    const response = await fetch(
      `https://${domain}/.well-known/lnurlp/${username}`
    );

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function resolveNip05(walias: string): Promise<string | null> {
  const [username, domain] = walias.split("@");

  try {
    const response = await fetch(
      `https://${domain}/.well-known/nostr.json?name=${username}`
    );

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data.names[username];
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function getDomainProfile(
  $domain: string
): Promise<Domain | null> {
  try {
    const response = await fetch(`https://${$domain}/.well-known/domain.json`);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }
    return { ...(await response.json()), name: $domain };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
