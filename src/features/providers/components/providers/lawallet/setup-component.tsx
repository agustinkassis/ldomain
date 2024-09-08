import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { SetupComponentProps } from "../../../types/setup";
import { useAuth } from "@/hooks/use-auth";

export default function LaWalletSetupComponent({
  setSelectedProvider,
}: SetupComponentProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userPubkey } = useAuth();

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const _data = new FormData(e.currentTarget);
      const data = Object.fromEntries(_data);
      console.info("Form data");
      console.dir(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSelectedProvider(undefined);
    } catch (error) {
      console.error("Error while verifying domain");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='publicKey'>Public key</Label>
        <Input
          name='publicKey'
          placeholder='Public key'
          disabled={isLoading}
          defaultValue={userPubkey || ""}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='identityEndpoint'>Identity Endpoint</Label>
        <Input
          name='identityEndpoint'
          placeholder='https://lawallet.ar'
          defaultValue='https://lawallet.ar'
          disabled={isLoading}
        />
      </div>

      <Button
        variant='outline'
        className='w-full'
        type='button'
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
      </Button>

      <div className={!showAdvanced ? "hidden" : ""}>
        <div className='space-y-2'>
          <Label htmlFor='apiEndpoint'>API Endpoint</Label>
          <Input
            name='apiEndpoint'
            placeholder='https://api.lawallet.ar'
            disabled={isLoading}
            defaultValue='https://api.lawallet.ar'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='ledgerPublicKey'>Ledger Public key</Label>
          <Input
            name='ledgerPublicKey'
            placeholder='bd9b0b60d5cd2a9df282fc504e88334995e6fac8b148fa89e0'
            disabled={isLoading}
            defaultValue='bd9b0b60d5cd2a9df282fc504e88334995e6fac8b148fa89e0'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='urlxPublicKey'>URLx Public key</Label>
          <Input
            name='urlxPublicKey'
            placeholder='e17feb5f2cf83546bcf7fd9c8237b05275be958bd521543c228'
            disabled={isLoading}
            defaultValue='e17feb5f2cf83546bcf7fd9c8237b05275be958bd521543c228'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='relayUrl'>Relay URL</Label>
          <Input
            name='relayUrl'
            placeholder='wss://relay.lawallet.ar'
            disabled={isLoading}
            defaultValue={"wss://relay.lawallet.ar"}
          />
        </div>
      </div>

      <Button
        className='w-full flex flex-row gap-2 mt-4'
        disabled={isLoading}
        type='submit'
      >
        {isLoading && <Loader2 className='w-4 h-4 animate-spin text-white' />}
        Connect LaWallet
      </Button>
    </form>
  );
}
