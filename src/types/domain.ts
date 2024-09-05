export interface Domain {
  label: string;
  value: string;
  logo: string;
}

export interface DomainItem extends Domain {
  isAdmin: boolean;
}
