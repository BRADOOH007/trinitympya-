import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import logo from './assets/favicon.jpeg'

// Set favicon dynamically
const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
(link as HTMLLinkElement).type = 'image/png';
(link as HTMLLinkElement).rel = 'icon';
(link as HTMLLinkElement).href = logo;
document.getElementsByTagName('head')[0].appendChild(link);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
