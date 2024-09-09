import { getDomainProfile } from "@/lib/utils";
import { Domain } from "@/types/domain";
import { useCallback, useEffect, useState } from "react";

export interface UseDomainResolverProps {
  domain: string;
  enabled?: boolean;
}
export interface UseDomainResolverReturn {
  isLoading: boolean;
  profile?: Domain;
  resolveDomain: (domain: string) => Promise<Domain>;
}

export default function useDomainResolver({
  domain,
  enabled,
}: UseDomainResolverProps): UseDomainResolverReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Domain>();

  const getDomainStaticImage = useCallback(
    async (domain: string): Promise<string | null> => {
      const staticPrefix = "https://static.lawallet.io";
      try {
        const response = await fetch(`${staticPrefix}/domains.json`);
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return null;
        }
        const json = await response.json();
        return json[domain] ? `${staticPrefix}${json[domain]}` : null;
      } catch (error) {
        console.error("Fetch error:", error);
        return null;
      }
    },
    []
  );

  const getDomainImage = useCallback(
    async (domain: string): Promise<string> => {
      const staticImage = await getDomainStaticImage(domain);
      if (staticImage !== null) {
        return staticImage;
      }
      return `https://${domain}/favicon.ico`;
    },
    [getDomainStaticImage]
  );

  const resolveDomain = useCallback(
    async (domain: string): Promise<Domain> => {
      const _domain = domain.trim().toLowerCase();
      const profile = await getDomainProfile(_domain);
      if (profile) {
        return { ...profile, hasProfileJson: true };
      }
      return {
        title: _domain,
        name: _domain,
        logo: await getDomainImage(_domain),
        hasProfileJson: false,
      };
    },
    [getDomainImage]
  );

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);
      resolveDomain(domain)
        .then((_profile) => {
          console.info("Setting profile");
          setProfile(_profile);
        })
        .catch((error) => {
          console.info(error);
        })
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, domain]);

  return {
    isLoading,
    profile,
    resolveDomain,
  };
}
