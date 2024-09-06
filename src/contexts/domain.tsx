// create react context
import { Domain, DomainItem } from "@/types/domain";
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

  const refreshDomainList = useCallback(() => {
    setIsLoading(true);
    return fetch(`/api/domains/list`, {
      method: "POST",
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        setDomainList(res.data);
        return res.data;
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  useEffect(() => {
    refreshDomainList().then((domainList) => {
      setCurrentDomain(domainList[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
