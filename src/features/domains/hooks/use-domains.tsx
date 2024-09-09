import { DomainContext, DomainContextType } from "@/contexts/domain";
import { useContext } from "react";

export interface UseDomainsReturn extends DomainContextType {}

export default function useDomains(): UseDomainsReturn {
  const domainContext = useContext(DomainContext);

  const addDomainViaHandle = async (handle: string) => {};

  return domainContext;
}
