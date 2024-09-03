import { useEffect } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "../../../styles/prism-local.css";

export default function SveltekitContent() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>SvelteKit Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Open svelte.config.js</li>
        <li className='text-sm'>Add rewrite rules</li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>
          svelte.config.js Example:
        </h4>
        <div className='w-full overflow-x-auto'>
          <pre className='rounded-md w-full'>
            <code className='language-javascript !text-xs'>
              {`// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter(),
    vite: {
      server: {
        proxy: {
          '/.well-known': {
            target: 'https://lightningdomain.io',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/\.well-known/, '/rewrite'),
          },
        },
      },
    },
  },
}`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
