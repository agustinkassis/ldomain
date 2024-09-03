import { useEffect } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "../../../styles/prism-local.css";

export default function RemixContent() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>Remix Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Open your server file</li>
        <li className='text-sm'>Add express middleware</li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>package.json Example:</h4>
        <div className='w-full overflow-x-auto'>
          <pre className='rounded-md w-full'>
            <code className='language-javascript !text-xs'>
              {`const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Add this to your server file
app.use(
  '/.well-known',
  createProxyMiddleware({
    target: 'https://lightningdomain.io',
    changeOrigin: true,
    pathRewrite: {
      '^/\\.well-known': '/rewrite',
    },
  })
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
