import {
  DomainContext,
  DomainContextType,
} from "@/features/domains/contexts/domain";
import { useContext } from "react";

export interface UseDomainsReturn extends DomainContextType {}

export default function useDomains(): UseDomainsReturn {
  const domainContext = useContext(DomainContext);

  return domainContext;
}
