"use client";
/* eslint-disable @next/next/no-img-element */

import { useProfile } from "nostr-hooks";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";

export default function UserMenu() {
  const router = useRouter();
  const { userPubkey } = useAuth();
  const { profile } = useProfile({ pubkey: userPubkey! });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='rounded-full'>
          {profile ? (
            <img
              alt={profile?.displayName}
              src={profile?.image}
              className='rounded-full'
            />
          ) : (
            <CircleUser className='h-5 w-5' />
          )}

          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>
          {profile?.displayName ? profile.displayName : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => router.push("/admin/settings/profile")}
        >
          My profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => router.push("/admin/settings/providers")}
        >
          Wallet providers
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => router.push("https://discord.lacrypta.ar")}
        >
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => router.push("/")}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
