import { ScrollArea } from "@/components/ui/scroll-area";

export default function CloudflareContent() {
  return (
    <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
      <h3 className='text-lg font-semibold mb-4'>Cloudflare Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Login to your Cloudflare account</li>
        <li className='text-sm'>
          Go to the &apos;Workers &amp; Pages&apos; section
        </li>
        <li className='text-sm'>Click &apos;Create application&apos;</li>
        <li className='text-sm'>
          Choose &apos;Pages&apos; and connect your Git provider
        </li>
        <li className='text-sm'>Select your repository and branch</li>
        <li className='text-sm'>Set up your build settings</li>
        <li className='text-sm'>Deploy your site</li>
        <li className='text-sm'>
          In &apos;Custom Domains&apos;, add your Lightning Domain
        </li>
      </ol>
    </ScrollArea>
  );
}
