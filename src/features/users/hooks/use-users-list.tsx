"use client";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export interface UseUsersListProps {
  page: number;
}

export interface UseUsersListReturn {
  users: User[];
  isLoading: boolean;
}

export default function useUsersList({
  page = 0,
}: UseUsersListProps): UseUsersListReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const event = { nostr: "event", page: page };
    fetch(`/api/users/list`, {
      method: "POST",
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(
          res.data.map((user: User) => ({
            ...user,
            createdAt: new Date(user.createdAt),
          }))
        );
        setIsLoading(false);
      });
  }, [page]);

  return { users, isLoading };
}
