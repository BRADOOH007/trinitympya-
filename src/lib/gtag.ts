declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim() || '';
const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined)?.trim() || '';

export const isTrackingEnabled = () => Boolean(GA_ID || GTM_ID);

/**
 * Loads Google Analytics 4 (gtag.js). No-op unless VITE_GA_ID is set in .env.
 */
export function initGoogleTags() {
  if (!isTrackingEnabled()) return;

  window.dataLayer = window.dataLayer || [];

  if (GA_ID) {
    const gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
    (window as unknown as Record<string, unknown>).gtag = gtag;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  if (GTM_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!isTrackingEnabled() || typeof window === 'undefined') return;
  const gtag = (window as unknown as Record<string, unknown>).gtag as
    | ((...args: unknown[]) => void)
    | undefined;
  if (gtag) gtag('event', eventName, params);
}