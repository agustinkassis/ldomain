// create react context
import { useAuth } from "@/hooks/use-auth";
import { DomainItem } from "@/types/domain";
import { createContext, useCallback, useEffect, useState } from "react";

export interface DomainContextType {
  isLoading: boolean;
  domainList: DomainItem[];
  currentDomain: DomainItem | undefined;
  setCurrentDomain: (domain: DomainItem) => void;
  refreshDomainList: () => void;
}

export const DomainContext = createContext<DomainContextType>({
  isLoading: true,
  domainList: [],
  currentDomain: undefined,
  setCurrentDomain: () => {},
  refreshDomainList: () => {},
});

interface DomainProviderProps {
  children: React.ReactNode;
}

export function DomainProvider({ children }: DomainProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDomain, setCurrentDomain] = useState<DomainItem>();
  const [domainList, setDomainList] = useState<DomainItem[]>([]);

  const { userPubkey } = useAuth();

  const refreshDomainList = useCallback(async () => {
    setIsLoading(true);
    return fetch(`/api/domains/list`, {
      method: "POST",
      body: JSON.stringify({ nostr: "event" }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDomainList(res.data);
        return res.data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!userPubkey) {
      return;
    }
    refreshDomainList().then((domainList) => {
      setCurrentDomain(domainList[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPubkey]);

  return (
    <DomainContext.Provider
      value={{
        isLoading,
        domainList,
        currentDomain,
        setCurrentDomain,
        refreshDomainList,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
}
