import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initGoogleTags } from './lib/gtag';

initGoogleTags();

const rootEl = document.getElementById('root')!;

// If the root was server-rendered (prerendered), hydrate instead of render
if (rootEl.innerHTML.trim() !== '') {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
