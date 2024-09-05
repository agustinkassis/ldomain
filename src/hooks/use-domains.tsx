import { DomainContext } from "@/contexts/domain";
import { useContext } from "react";

export default function useDomains() {
  return useContext(DomainContext);
}
