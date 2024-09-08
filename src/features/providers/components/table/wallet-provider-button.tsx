import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WalletProvider } from "@/types/wallet";
import { ArrowDownLeft, ArrowUpRight, Bolt, Zap } from "lucide-react";

export interface WalletProviderProps {
  provider: WalletProvider;
  setSelectedProvider: (provider: WalletProvider) => void;
}

export default function WalletProviderButton({
  provider,
  setSelectedProvider,
}: WalletProviderProps) {
  return (
    <Button
      key={provider.name}
      variant='outline'
      className={`h-auto py-4 px-4 justify-between items-center ${
        provider.disabled || provider.soon
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
      onClick={() =>
        !provider.disabled && !provider.soon && setSelectedProvider(provider)
      }
      disabled={provider.disabled || provider.soon}
    >
      <div className='flex items-center gap-2'>
        <span>{provider.name}</span>
        {provider.disabled && (
          <Badge variant='secondary' className='ml-2'>
            Disabled
          </Badge>
        )}
        {provider.soon && (
          <Badge variant='secondary' className='ml-2'>
            Upcoming
          </Badge>
        )}
      </div>
      <div className='flex gap-2'>
        {provider.canSend && (
          <ArrowUpRight
            className='h-4 w-4 text-green-500'
            aria-label='Can pay'
          />
        )}
        {provider.canReceive && (
          <ArrowDownLeft
            className='h-4 w-4 text-blue-500'
            aria-label='Can receive'
          />
        )}
        {provider.hasLUD16 && (
          <Zap
            className='h-4 w-4 text-yellow-500'
            aria-label='Supports LUD16'
          />
        )}
        {provider.hasNIP05 && (
          <Bolt
            className='h-4 w-4 text-purple-500'
            aria-label='Supports NIP05'
          />
        )}
      </div>
    </Button>
  );
}
