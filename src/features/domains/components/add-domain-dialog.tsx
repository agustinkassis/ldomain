"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Domain } from "@/types/domain";
import { Skeleton } from "@/components/ui/skeleton";
import useDomainResolver from "../hooks/use-domain-resolver";
import ImageWithFallback from "@/components/shared/image-with-fallback";

const LoadingList = () => {
  const items = [
    "Getting domain profile.json",
    "Validating NIP-05",
    "Checking LUD-16",
  ];

  return (
    <div className='mt-4'>
      <ul className='space-y-2'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center space-x-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DomainDetails = ({ name, title, logo }: Domain) => {
  return (
    <div className='mt-4 space-y-4'>
      <div className='flex items-center space-x-4'>
        <div className='relative h-16 w-16 rounded-full overflow-hidden'>
          <ImageWithFallback
            src={logo}
            alt={`${name} avatar`}
            fallbackSrc='https://static.lawallet.io/img/domains/default.png'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div>
          <h3 className='text-lg font-semibold'>{name}</h3>
          <p className='text-sm text-gray-500'>{title}</p>
        </div>
      </div>
    </div>
  );
};

export interface AddDomainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddDomainDialog({
  open,
  onOpenChange,
}: AddDomainDialogProps) {
  const [walias, setWalias] = useState<string>();
  const [domain, setDomain] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const { profile, isLoading: isProfileLoading } = useDomainResolver({
    domain: domain || "",
    enabled: !!domain,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setDomain(walias!.split("@")[1]);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setWalias(undefined);
      setDomain(undefined);
      setIsLoading(false);
      setShowDetails(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
          <DialogDescription>
            {showDetails
              ? "Review domain details"
              : "Enter the email address (Walias) associated with the domain you want to add."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='walias' className='text-right'>
                Walias
              </Label>
              <Input
                id='walias'
                type='email'
                value={walias}
                onChange={(e) => setWalias(e.target.value)}
                className='col-span-3'
                placeholder='email@example.com'
                required
                disabled={isLoading}
              />
            </div>
          </div>
          {isLoading && (
            <>
              {!isProfileLoading && profile ? (
                <DomainDetails
                  name={profile.name}
                  title={profile.title}
                  logo={profile.logo}
                />
              ) : (
                <Skeleton className='h-20 w-full' />
              )}

              <LoadingList />
            </>
          )}
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
