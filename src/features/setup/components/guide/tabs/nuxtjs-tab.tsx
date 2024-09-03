import { useEffect } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "../../../styles/prism-local.css";

export default function NuxtJsContent() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>NuxtJs Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Open nuxt.config.js</li>
        <li className='text-sm'>Add rewrite rules</li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>nuxt.config.js Example:</h4>
        <div className='w-full overflow-x-auto'>
          <pre className='rounded-md w-full'>
            <code className='language-javascript !text-xs'>
              {`// nuxt.config.js
export default {
  modules: ['@nuxtjs/proxy'],
  proxy: {
    '/.well-known': {
      target: 'https://lightningdomain.io',
      pathRewrite: { '^/\\.well-known': '/rewrite' },
      changeOrigin: true,
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
