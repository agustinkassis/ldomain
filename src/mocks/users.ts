import { User } from "@/types/user";

export default [
  {
    pubkey: "npub2134324234322423432432",
    walias: "gorila",
    display_name: "Red Gorila",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    pubkey: "npub19475847859748545847958",
    walias: "chucher",
    display_name: "Green Chucher",
    status: "blocked",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as User[];
