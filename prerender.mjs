/**
 * Prerender script — runs after `vite build` to generate static HTML for each route.
 * This gives Google full HTML content without needing to execute JavaScript.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// All routes to prerender
const routes = [
  '/',
  '/routes',
  '/routes/nairobi-kampala',
  '/routes/nairobi-kigali',
  '/routes/nairobi-juba',
  '/routes/nairobi-dar-es-salaam',
  '/about',
  '/contact',
  '/fleet',
  '/help',
  '/blog/nairobi-to-kampala-bus-travel-guide',
  '/blog/nairobi-to-kigali-bus-travel-guide',
  '/blog/nairobi-to-juba-bus-travel-guide',
  '/blog/nairobi-to-dar-es-salaam-bus-travel-guide',
  '/blog/kisumu-to-kampala-bus-travel-guide',
  '/blog/kisumu-to-kigali-bus-travel-guide',
  '/blog/eldoret-to-kampala-bus-travel-guide',
  '/blog/eldoret-to-kigali-bus-travel-guide',
  '/blog/nakuru-to-kampala-bus-travel-guide',
  '/blog/simba-bus-review',
  '/privacy-policy',
  '/terms',
];

// Read the built index.html template
const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');

// Import the server entry (built by vite ssr build)
const { render } = await import('./dist/server/entry-server.js');

for (const url of routes) {
  try {
    const { html: appHtml, helmet } = render(url);

    // Inject helmet tags into <head>
    let pageHtml = template
      .replace('<title></title>', helmet?.title?.toString() ?? '')
      .replace('<!--helmet-meta-->', [
        helmet?.meta?.toString() ?? '',
        helmet?.link?.toString() ?? '',
        helmet?.script?.toString() ?? '',
      ].join('\n'))
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Write to dist directory
    const filePath = url === '/'
      ? toAbsolute('dist/index.html')
      : toAbsolute(`dist${url}/index.html`);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, pageHtml);
    console.log(`✓ Prerendered: ${url}`);
  } catch (e) {
    console.error(`✗ Failed to prerender ${url}:`, e.message);
  }
}

console.log('\nPrerendering complete.');
