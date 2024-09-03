import { useEffect } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "../../../styles/prism-local.css";

export default function GatsbyContent() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>Gatsby Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Open gatsby-config.js</li>
        <li className='text-sm'>Add rewrite rules</li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>
          gatsby-config.js Example:
        </h4>
        <div className='w-full overflow-x-auto'>
          <pre className='rounded-md w-full'>
            <code className='language-javascript !text-xs'>
              {`// gatsby-config.js
const proxy = require('http-proxy-middleware');

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.well-known',
      proxy({
        target: 'https://lightningdomain.io',
        pathRewrite: { '^/\\.well-known': '/rewrite' },
        changeOrigin: true,
      })
    );
  },
}`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
