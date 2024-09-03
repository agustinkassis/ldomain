import { useEffect } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "../../../styles/prism-local.css";

export default function ApacheContent() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>Apache Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Ensure you have the following mods</li>
        <pre className='rounded-md w-full'>
          <code className='language-bash !text-xs'>
            {`sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo systemctl restart apache2`}
          </code>
        </pre>
        <li className='text-sm'>
          Edit the file <b>/etc/apache2/sites-available/yourdomain.conf</b>.
        </li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>yourdomain.conf Example:</h4>
        <div className='w-full overflow-x-auto'>
          <pre className='rounded-md w-full'>
            <code className='language-apache !text-xs'>
              {`<VirtualHost *:80>
    ServerName yourdomain.com

    # Ensure .htaccess and mod_rewrite are working
    <Directory /var/www/html>
        AllowOverride All
    </Directory>

    # Proxy requests from /.well-known/ to the external service
    RewriteEngine On
    RewriteCond %{REQUEST_URI} ^/\.well-known/(.*)$
    RewriteRule ^/\.well-known/(.*)$ https://lightningdomain.io/rewrite/$1 [P,L]

    # Proxy settings
    ProxyPreserveHost On
    ProxyPassReverse / https://lightningdomain.io/rewrite/

    # Other configurations...
</VirtualHost>
`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
