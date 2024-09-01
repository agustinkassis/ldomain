import { ScrollArea } from "@/components/ui/scroll-area";

export default function NextJsContent() {
  return (
    <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
      <h3 className='text-lg font-semibold mb-4'>Next.js Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Install the vercel CLI: npm i -g vercel</li>
        <li className='text-sm'>
          Run &apos;vercel&apos; in your project directory
        </li>
        <li className='text-sm'>Choose &apos;Configure project&apos;</li>
        <li className='text-sm'>Select &apos;Other&apos; as your framework</li>
        <li className='text-sm'>
          Set the build command to &apos;next build&apos;
        </li>
        <li className='text-sm'>
          Set the output directory to &apos;.next&apos;
        </li>
        <li className='text-sm'>
          Modify your next.config.js to include redirects (see example below)
        </li>
        <li className='text-sm'>Deploy with &apos;vercel --prod&apos;</li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>next.config.js Example:</h4>
        <pre className='rounded-md text-sm'>
          <code className='language-javascript'>
            {`// next.config.js
  module.exports = {
    async redirects() {
      return [
        {
          source: '/old-page',
          destination: '/new-page',
          permanent: true,
        },
        {
          source: '/legacy/:slug',
          destination: '/new/:slug',
          permanent: false,
        },
      ]
    },
  }`}
          </code>
        </pre>
      </div>
    </ScrollArea>
  );
}
