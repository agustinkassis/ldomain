import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
import { DialogProps } from "@radix-ui/react-dialog";
import { FormEvent, FormEventHandler, useCallback } from "react";
import walletMock from "@/mocks/users";

export interface CreateWalletDialog extends DialogProps {
  onNewWallet?: (user: User) => void;
}

export function CreateWalletDialog({
  onNewWallet,
  onOpenChange,
  ...dialogProps
}: CreateWalletDialog) {
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const _data = new FormData(e.currentTarget);
      const data = Object.fromEntries(_data);
      console.dir(data);
      onNewWallet && onNewWallet(walletMock[0]);
      onOpenChange && onOpenChange(false);
      e.preventDefault();
    },
    [onNewWallet, onOpenChange]
  );

  return (
    <Dialog onOpenChange={onOpenChange} {...dialogProps}>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Add new Wallet</DialogTitle>
            <DialogDescription>Add new Wallet.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Pubkey
              </Label>
              <Input
                id='pubkey'
                name='pubkey'
                defaultValue=''
                placeholder='npub123 or hex'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input
                id='walias'
                name='walias'
                defaultValue=''
                placeholder='satoshi'
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
