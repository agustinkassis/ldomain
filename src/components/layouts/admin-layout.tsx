"use client";
import Link from "next/link";
import { Bell, Search, Home, Settings, Users, WebhookIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import LaCryptaLogo from "@/components/icons/lacrypta";
import MobileMenu from "./menu/mobile-menu";
import UserMenu from "./menu/user-menu";
import Sidebar from "./sidebar";
import DesktopMenu from "./menu/desktop-menu";
import { MenuItem } from "@/types/menu";

const ADMIN_PREFIX = "/admin";
const menuItems: MenuItem[] = [
  {
    icon: Home,
    title: "Dashboard",
    href: `${ADMIN_PREFIX}`,
  },
  {
    icon: Users,
    title: "Users",
    href: `${ADMIN_PREFIX}/users`,
  },
  {
    icon: WebhookIcon,
    title: "Webhooks",
    href: `${ADMIN_PREFIX}/webhooks`,
  },
  {
    icon: Settings,
    title: "Settings",
    href: `${ADMIN_PREFIX}/settings`,
  },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link
            href='/'
            className='flex justify-center items-center gap-2 font-semibold'
          >
            <LaCryptaLogo className='w-6' />
            <span className=''>La Crypta</span>
          </Link>
          <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <DesktopMenu menuItems={menuItems} />
        <div className='mt-auto p-4'>
          <Card x-chunk='dashboard-02-chunk-0'>
            <CardHeader className='p-2 pt-0 md:p-4'>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
              <Button size='sm' className='w-full'>
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </Sidebar>

      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <MobileMenu menuItems={menuItems} />
          <div className='w-full flex-1'>
            <form>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search users...'
                  className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
                />
              </div>
            </form>
          </div>
          <UserMenu />
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
