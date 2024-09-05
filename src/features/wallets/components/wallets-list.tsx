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
import { MoreHorizontal } from "lucide-react";
import { Wallet } from "@/types/wallet";
import NoWallets from "./no-wallets";

export interface WalletsListProps {
  wallets: Wallet[];
}

export default function WalletsList({ wallets }: WalletsListProps) {
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
                    <DropdownMenuItem disabled={true}>Block</DropdownMenuItem>
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
