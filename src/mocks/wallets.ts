import { Wallet } from "@/types/wallet";
import walletsProviders from "./wallets-providers";

export default [
  {
    display_name: "Wallet 1",
    config: {},
    provider: walletsProviders[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    display_name: "Wallet 2",
    config: {},
    provider: walletsProviders[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    display_name: "Wallet 3",
    config: {},
    provider: walletsProviders[2],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as Wallet[];
