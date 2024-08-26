export interface User {
  pubkey: string;
  walias: string;
  display_name: string;
  status: UserStatus;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserStatus = "unverified" | "active" | "blocked" | "banned";
