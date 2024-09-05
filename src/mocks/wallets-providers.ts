import { WalletProvider } from "@/types/wallet";

export default [
  {
    canReceive: true,
    canSend: true,
    image: "https://via.placeholder.com/150",
    name: "Wallet Provider 1",
  },
  {
    canReceive: true,
    canSend: false,
    image: "https://via.placeholder.com/150",
    name: "Wallet Provider 2",
  },
  {
    canReceive: false,
    canSend: true,
    image: "https://via.placeholder.com/150",
    name: "Wallet Provider 3",
  },
] as WalletProvider[];
