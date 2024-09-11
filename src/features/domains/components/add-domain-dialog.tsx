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
import DomainResolverDetails from "./domain-resolver-details";
import Link from "next/link";

export interface AddDomainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddDomainDialog({
  open,
  onOpenChange,
}: AddDomainDialogProps) {
  const [walias, setWalias] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setShowDetails(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setWalias(undefined);
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
              : "Enter your Walias (NIP-05) associated with the domain you want to add."}
          </DialogDescription>
        </DialogHeader>
        {!showDetails ? (
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
                  placeholder='walias@lawallet.ar'
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className='text-sm text-muted-foreground'>
              Click{" "}
              <Link href={"/setup"} className='font-bold hover:text-slate-400'>
                HERE
              </Link>{" "}
              to turn your domain into a Lightning Domain in 5 minutes.
            </div>
            <DialogFooter>
              <Button type='submit'>Add Domain</Button>
            </DialogFooter>
          </form>
        ) : (
          <DomainResolverDetails
            walias={walias!.toLocaleLowerCase().trim()}
            onOpenChange={onOpenChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
