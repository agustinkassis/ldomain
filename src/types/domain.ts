export interface Domain {
  title: string;
  name: string;
  logo: string;
  apiEndpoint?: string;
  adminPubkey?: string;
}

export interface DomainItem extends Domain {
  isAdmin: boolean;
}
