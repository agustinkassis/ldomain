import ImageWithFallback from "@/components/shared/image-with-fallback";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleAlert, CircleCheck, CircleX, Loader2 } from "lucide-react";
import useDomainResolver from "../hooks/use-domain-resolver";
import { useEffect, useMemo, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { resolveLud16, resolveNip05 } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { LNURLResponse } from "@/types/lud";
import useDomains from "../hooks/use-domains";

export interface DomainResolverDetailsProps {
  walias: string;
  onOpenChange: (open: boolean) => void;
}

export default function DomainResolverDetails({
  walias,
  onOpenChange,
}: DomainResolverDetailsProps) {
  const { userPubkey } = useAuth();
  const [username, domain] = useMemo(() => walias!.split("@"), [walias]);
  const [nip05Pubkey, setNip05Pubkey] = useState<string | null>();
  const [lud16Pubkey, setLud16Pubkey] = useState<LNURLResponse | null>();
  const [isLoadingNip05, setIsLoadingNip05] = useState(true);
  const [isLoadingLud16, setIsLoadingLud16] = useState(true);

  const { profile, isLoading: isLoadingProfile } = useDomainResolver({
    domain: domain || "",
    enabled: !!domain,
  });

  const { addDomainViaHandle } = useDomains();

  const isLoading = useMemo(
    () => isLoadingNip05 || isLoadingLud16 || isLoadingProfile,
    [isLoadingNip05, isLoadingLud16, isLoadingProfile]
  );

  const isPubkeyMatch = useMemo(
    () => nip05Pubkey === userPubkey,
    [nip05Pubkey, userPubkey]
  );

  const handleAddDomain = () => {
    console.info("username", username);
    console.info("profile");
    console.dir(profile);
    addDomainViaHandle(username, profile!, profile?.adminPubkey === userPubkey);
    onOpenChange(false);
  };

  useEffect(() => {
    if (walias) {
      resolveNip05(walias)
        .then(setNip05Pubkey)
        .finally(() => setIsLoadingNip05(false));
      resolveLud16(walias)
        .then(setLud16Pubkey)
        .finally(() => setIsLoadingLud16(false));
    }
  }, [walias]);

  return (
    <>
      <div className='mt-4 space-y-4'>
        <div className='flex items-center space-x-4'>
          <div className='relative h-16 w-16 rounded-full overflow-hidden'>
            {isLoading ? (
              <Skeleton className='h-16 w-16' />
            ) : (
              <ImageWithFallback
                src={profile?.logo}
                alt={`${name} avatar`}
                fallbackSrc='https://static.lawallet.io/img/domains/default.png'
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
          <div>
            <h3 className='text-lg font-semibold'>{profile?.name || domain}</h3>
            <p className='text-sm text-gray-500'>{profile?.title || domain}</p>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <ul className='space-y-2'>
          <li className='flex items-center space-x-2'>
            {isLoadingProfile ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span>Getting domain domain.json</span>
              </>
            ) : profile?.hasProfileJson ? (
              <>
                <CircleCheck className='h-4 w-4' />
                <span>Lightning Domain</span>
              </>
            ) : (
              <>
                <CircleAlert className='h-4 w-4' />
                <span>Lightning Domain api not available</span>
              </>
            )}
          </li>
          <li className='flex items-center space-x-2'>
            {isLoadingNip05 ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span>Validating NIP-05</span>
              </>
            ) : isPubkeyMatch ? (
              <>
                <CircleCheck className='h-4 w-4' />
                <span>NIP-05 ownership successfully validated</span>
              </>
            ) : (
              <>
                <CircleX className='h-4 w-4' />
                <span>NIP-05 doesn&apos;t match your pubkey</span>
              </>
            )}
          </li>
          <li className='flex items-center space-x-2'>
            {isLoadingLud16 ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span>Checking LUD-16</span>
              </>
            ) : lud16Pubkey!! ? (
              <>
                <CircleCheck className='h-4 w-4' />
                <span>LUD-16 response found</span>
              </>
            ) : (
              <>
                <CircleAlert className='h-4 w-4' />
                <span>LUD-16 response not found</span>
              </>
            )}
          </li>
        </ul>
      </div>

      <DialogFooter>
        <Button
          onClick={handleAddDomain}
          disabled={isLoading || !isPubkeyMatch}
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Loading
            </>
          ) : (
            "Add Domain"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
