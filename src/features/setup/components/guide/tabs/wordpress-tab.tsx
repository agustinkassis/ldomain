import { ScrollArea } from "@/components/ui/scroll-area";

export default function WordPressContent() {
  return (
    <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
      <h3 className='text-lg font-semibold mb-4'>WordPress Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>
          Install and activate the Vercel for WordPress plugin
        </li>
        <li className='text-sm'>
          In the WordPress admin, go to Vercel &gt; Settings
        </li>
        <li className='text-sm'>Connect your Vercel account</li>
        <li className='text-sm'>Choose your team and project</li>
        <li className='text-sm'>Configure your build settings</li>
        <li className='text-sm'>Deploy your WordPress site to Vercel</li>
        <li className='text-sm'>In Vercel, go to your project settings</li>
        <li className='text-sm'>
          Add your Lightning Domain in the &apos;Domains&apos; section
        </li>
      </ol>
    </ScrollArea>
  );
}
