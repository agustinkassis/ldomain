"use client";
import { Wallet } from "@/types/wallet";
import { useEffect, useState } from "react";

export interface UseUsersListProps {
  page: number;
}

export interface UseWalletsListReturn {
  wallets: Wallet[];
  isLoading: boolean;
}

export default function useWalletsList({
  page = 0,
}: UseUsersListProps): UseWalletsListReturn {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const event = { nostr: "event", page: page };
    fetch(`/api/wallets/list`, {
      method: "POST",
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        setWallets(
          res.data.map((wallet: Wallet) => ({
            ...wallet,
            createdAt: new Date(wallet.createdAt),
          }))
        );
        setIsLoading(false);
      });
  }, [page]);

  return { wallets, isLoading };
}
