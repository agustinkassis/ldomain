import { useEffect } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "../../../styles/prism-local.css";

export default function NginxContent() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>NGINX Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>
          Open <b>/etc/nginx/nginx.conf</b>
        </li>
        <li className='text-sm'>
          Alternatively, you might have a site-specific configuration in{" "}
          <b>/etc/nginx/sites-available/yourdomain.com</b> or{" "}
          <b>/etc/nginx/conf.d/yourdomain.conf</b>.
        </li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>nginx.conf Example:</h4>
        <div className='w-full overflow-x-auto'>
          <pre className='rounded-md w-full'>
            <code className='language-javascript !text-xs'>
              {`server {
    listen 80;
    server_name yourdomain.com;

    location /.well-known/ {
        proxy_pass https://lightningdomain.io/rewrite/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Optional: Disable SSL certificate validation for the backend (use with caution)
        # proxy_ssl_verify off;
    }

    # Other server configurations...
}
`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
