import { ScrollArea } from "@/components/ui/scroll-area";

export default function ViteContent() {
  return (
    <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
      <h3 className='text-lg font-semibold mb-4'>Vite Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Build your Vite project: npm run build</li>
        <li className='text-sm'>Install the vercel CLI: npm i -g vercel</li>
        <li className='text-sm'>
          Run &apos;vercel&apos; in your project directory
        </li>
        <li className='text-sm'>Choose &apos;Configure project&apos;</li>
        <li className='text-sm'>Select &apos;Other&apos; as your framework</li>
        <li className='text-sm'>
          Set the build command to &apos;npm run build&apos;
        </li>
        <li className='text-sm'>
          Set the output directory to &apos;dist&apos;
        </li>
        <li className='text-sm'>Deploy with &apos;vercel --prod&apos;</li>
      </ol>
    </ScrollArea>
  );
}
