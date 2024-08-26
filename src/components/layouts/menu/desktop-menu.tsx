"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/types/menu";

export default function DesktopMenu({ menuItems }: { menuItems: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <div className='flex-1'>
      <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              pathname !== item.href ? `text-muted-foreground` : `bg-muted`,
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`
            )}
          >
            <item.icon className='h-4 w-4' />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
