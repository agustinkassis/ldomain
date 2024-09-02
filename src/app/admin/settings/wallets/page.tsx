"use client";

import UsersList from "@/features/users/components/users-list";
import { User } from "@/types/user";
import usersMock from "@/mocks/users";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";
import useUsersList from "@/features/users/hooks/use-users-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users } = useUsersList({ page: 0 });
  // users = [];

  return (
    <>
      <CreateUserDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className='flex flex-col'>
        <h1 className='text-lg font-semibold md:text-2xl text-left'>
          My Wallets
        </h1>
        <div className='flex flex-row justify-between w-full mt-4'>
          <Tabs defaultValue='all' onClick={(e) => console.dir(e)}>
            <TabsList>
              <TabsTrigger value='all'>All</TabsTrigger>
              <TabsTrigger value='active'>Active</TabsTrigger>
              <TabsTrigger value='draft'>Draft</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            size='sm'
            className='h-8 gap-1'
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Add Wallet
            </span>
          </Button>
        </div>
      </div>

      <div
        className='flex flex-1 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <UsersList users={users} />
      </div>
    </>
  );
}
