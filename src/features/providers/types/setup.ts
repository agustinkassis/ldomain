import { WalletProvider } from "@/types/wallet";

export interface SetupComponentProps {
  setSelectedProvider: (provider: WalletProvider | undefined) => void;
}
