import { useEffect } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "../../../styles/prism-local.css";

export default function WordPressContent() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>WordPress Configuration</h3>
      <ol className='list-decimal pl-5 space-y-3'>
        <li className='text-sm'>Open your theme&apos;s functions.php file</li>
        <li className='text-sm'>
          Add the following code to the file and Save it
        </li>
      </ol>
      <div className='mt-6'>
        <h4 className='text-md font-semibold mb-2'>functions.php Example:</h4>
        <div className='w-full overflow-x-auto'>
          <pre className='rounded-md w-full'>
            <code className='language-javascript !text-xs'>
              {`// functions.php

add_action('init', 'custom_rewrite_rule');
add_action('template_redirect', 'proxy_request_to_external_service');

function custom_rewrite_rule() {
    add_rewrite_rule(
        '^\.well-known/(.*)?',
        'index.php?proxy_path=$matches[1]',
        'top'
    );
}

function proxy_request_to_external_service() {
    $proxy_path = get_query_var('proxy_path');
    
    if ($proxy_path) {
        $external_url = 'https://lightningdomain.io/rewrite/' . $proxy_path;

        $response = wp_remote_get($external_url);

        if (is_wp_error($response)) {
            status_header(502);
            echo 'Bad Gateway';
            exit;
        }

        $body = wp_remote_retrieve_body($response);
        $content_type = wp_remote_retrieve_header($response, 'content-type');

        if ($content_type) {
            header('Content-Type: ' . esc_html($content_type));
        }

        echo $body;
        exit;
    }
}

add_filter('query_vars', 'add_custom_query_vars');
function add_custom_query_vars($vars) {
    $vars[] = 'proxy_path';
    return $vars;
}

add_action('wp_loaded', 'flush_rewrite_rules_on_activation');
function flush_rewrite_rules_on_activation() {
    if (get_option('rewrite_rules_flushed') != true) {
        flush_rewrite_rules();
        update_option('rewrite_rules_flushed', true);
    }
}
`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
