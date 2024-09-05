"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import useWalletsList from "@/features/wallets/hooks/use-wallets-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletsList from "@/features/wallets/components/wallets-list";
import { CreateWalletDialog } from "@/features/wallets/components/create-wallet-dialog";
import ToggleFilter from "@/features/wallets/components/toggle-button";

export default function WalletsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wallets } = useWalletsList({ page: 0 });
  // wallets = [];

  const [canReceiveFilter, setCanReceiveFilter] = useState(false);
  const [canSendFilter, setCanSendFilter] = useState(false);

  return (
    <>
      <CreateWalletDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className='flex flex-col'>
        <h1 className='text-lg font-semibold md:text-2xl text-left'>
          My Wallets
        </h1>
        <div className='flex flex-row justify-between w-full mt-4'>
          <div className='flex flex-col sm:flex-row gap-4 mb-4'>
            <ToggleFilter
              label='Can Receive'
              checked={canReceiveFilter}
              onChange={(checked) => setCanReceiveFilter(checked)}
            />
            <ToggleFilter
              label='Can Send'
              checked={canSendFilter}
              onChange={(checked) => setCanSendFilter(checked)}
            />
          </div>

          <Button
            size='sm'
            className='h-8 gap-1'
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Add Wallet
            </span>
          </Button>
        </div>
      </div>

      <div
        className='flex flex-1 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <WalletsList wallets={wallets} />
      </div>
    </>
  );
}
