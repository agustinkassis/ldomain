"use client";

import * as React from "react";
import { ChevronDown, CheckIcon, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import useDomains from "@/features/domains/hooks/use-domains";
import AddDomainDialog from "@/features/domains/components/add-domain-dialog";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const { domainList, currentDomain, setCurrentDomain } = useDomains();
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const groups = React.useMemo(() => {
    return [
      {
        label: "My Domains",
        domains: domainList.filter((domain) => domain.isAdmin),
      },
      {
        label: "Other Domains",
        domains: domainList.filter((domain) => !domain.isAdmin),
      },
    ];
  }, [domainList]);

  return (
    <>
      <AddDomainDialog
        open={showNewTeamDialog}
        onOpenChange={setShowNewTeamDialog}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {!currentDomain ? (
            <Skeleton className='w-full h-[40px] p-2 text-xs flex items-center text-gray-500'>
              Loading Domains
            </Skeleton>
          ) : (
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              aria-label='Select a team'
              className={cn("w-[200px] justify-between", className)}
            >
              <Avatar className='mr-2 h-5 w-5'>
                <AvatarImage
                  src={currentDomain.logo}
                  alt={currentDomain.title}
                  className='rounded'
                />
                <AvatarFallback>LC</AvatarFallback>
              </Avatar>
              {currentDomain.title}
              <ChevronDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.domains.map((domain) => (
                    <CommandItem
                      key={domain.name}
                      onSelect={() => {
                        setCurrentDomain(domain);
                        setOpen(false);
                      }}
                      className='text-sm'
                    >
                      <Avatar className='mr-2 h-5 w-5'>
                        <AvatarImage
                          src={domain.logo}
                          alt={domain.title}
                          className='grayscale'
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {domain.title}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          currentDomain?.name === domain.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setShowNewTeamDialog(true);
                  }}
                >
                  <PlusCircle className='mr-2 h-5 w-5' />
                  Create Domain
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
