import { User } from "@/types/user";
import NoUsers from "./no-users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return <NoUsers />;
  }
  return (
    <div className='flex flex-1 flex-col w-full gap-1 '>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Walias</TableHead>
            <TableHead className='hidden xl:table-cell'>Display name</TableHead>
            <TableHead>Pubkey</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='hidden lg:table-cell'>Created at</TableHead>
            <TableHead>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, k) => (
            <TableRow key={k}>
              <TableCell className='font-medium'>{user.walias}</TableCell>
              <TableCell className='hidden xl:table-cell'>
                {user.display_name}
              </TableCell>
              <TableCell className=''>{user.pubkey}</TableCell>
              <TableCell>
                <Badge variant='outline'>{user.status}</Badge>
              </TableCell>
              <TableCell className='hidden lg:table-cell'>
                {user.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup='true' size='icon' variant='ghost'>
                      <MoreHorizontal className='h-4 w-4' />
                      <span className='sr-only'>Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem disabled={true}>Block</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
