import { Wallet } from "@/types/wallet";
import walletsProviders from "./wallets-providers";

export default [
  {
    display_name: "Wallet 1",
    config: {},
    provider: walletsProviders[0],
    canReceive: walletsProviders[0].canReceive,
    canSend: walletsProviders[0].canSend,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    display_name: "Wallet 2",
    config: {},
    provider: walletsProviders[1],
    canReceive: walletsProviders[1].canReceive,
    canSend: walletsProviders[1].canSend,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    display_name: "Wallet 3",
    config: {},
    provider: walletsProviders[2],
    canReceive: walletsProviders[2].canReceive,
    canSend: walletsProviders[2].canSend,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as Wallet[];
