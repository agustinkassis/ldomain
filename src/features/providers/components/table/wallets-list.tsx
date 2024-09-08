import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, MoreHorizontal } from "lucide-react";
import { Wallet } from "@/types/wallet";
import NoWallets from "./no-wallets";
import { useEffect, useMemo, useState } from "react";

export interface WalletsListProps {
  wallets: Wallet[];
  filter?: {
    canReceive?: boolean;
    canSend?: boolean;
  };
}

export default function WalletsList({
  wallets: _wallets,
  filter,
}: WalletsListProps) {
  const wallets: Wallet[] = useMemo(() => {
    if (!filter) {
      return _wallets;
    }
    const { canReceive, canSend } = filter;

    return _wallets.filter(
      (wallet) => wallet.canReceive === canReceive && wallet.canSend === canSend
    );
  }, [_wallets, filter]);

  if (wallets.length === 0) {
    return <NoWallets />;
  }

  return (
    <div className='flex flex-1 flex-col w-full gap-1 '>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className='table-cell'>Provider</TableHead>
            <TableHead className='table-cell'>Capabilities</TableHead>
            <TableHead className='hidden xl:table-cell'>Created at</TableHead>
            <TableHead>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wallets.map((wallet, k) => (
            <TableRow key={k}>
              {void console.dir(wallet)}
              <TableCell className='font-medium'>
                {wallet.display_name}
              </TableCell>
              <TableCell className='table-cell'>
                {wallet.provider.name}
              </TableCell>
              <TableCell className='table-cell'>
                <div className='flex space-x-2'>
                  <span
                    className={`flex items-center ${
                      wallet.canReceive ? "text-green-500" : "text-gray-200"
                    }`}
                  >
                    <ArrowDownToLine size={16} />
                    <span className='sr-only'>
                      {wallet.canReceive ? "Can receive" : "Cannot receive"}
                    </span>
                  </span>
                  <span
                    className={`flex items-center ${
                      wallet.canSend ? "text-green-500" : "text-gray-200"
                    }`}
                  >
                    <ArrowUpFromLine size={16} />
                    <span className='sr-only'>
                      {wallet.canSend ? "Can send" : "Cannot send"}
                    </span>
                  </span>
                </div>
              </TableCell>
              <TableCell className='hidden xl:table-cell'>
                {wallet.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup='true' size='icon' variant='ghost'>
                      <MoreHorizontal className='h-4 w-4' />
                      <span className='sr-only'>Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem disabled={!wallet.canSend}>
                      Send
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={!wallet.canReceive}>
                      Receive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
