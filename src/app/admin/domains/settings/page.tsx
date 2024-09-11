"use client";

import DangerZone from "@/features/domains/components/remove-domain/danger-zone";
import useDomains from "@/features/domains/hooks/use-domains";

export default function SettingsPage() {
  const { currentDomain } = useDomains();

  if (!currentDomain) {
    return <div>No domain</div>;
  }
  return (
    <>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Domains</h1>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm w-full pt-4'>
        <DangerZone domain={currentDomain} />
      </div>
    </>
  );
}
