"use client";

import UsersList from "@/features/users/components/users-list";
import { User } from "@/types/user";
import usersMock from "@/mocks/users";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let users: User[] = usersMock;
  // users = [];

  return (
    <>
      <CreateUserDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold md:text-2xl'>Users</h1>
        <div>
          <Button
            size='sm'
            className='h-8 gap-1'
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Add User
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
