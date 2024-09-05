import { Button } from "@/components/ui/button";

export default function NoWallets() {
  return (
    <div className='flex flex-col justify-center w-full h-full items-center gap-1 text-center'>
      <h3 className='text-2xl font-bold tracking-tight'>You have no Wallets</h3>
      <p className='text-sm text-muted-foreground'>
        Click on <b>Add Wallet</b> to start.
      </p>
      <Button className='mt-4'>Add User</Button>
    </div>
  );
}
