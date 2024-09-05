export interface Wallet {
  display_name: string;
  provider: WalletProvider;
  config: Record<string, any>;
  canSend: boolean;
  canReceive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletProvider {
  name: string;
  image: string;
  canSend: boolean;
  canReceive: boolean;
}
