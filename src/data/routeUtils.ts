import { simbaRoutes, StaticRoute } from './simbaRoutes';

export interface ParsedRoute {
  origin: string;
  destination: string;
  price: number;
  executivePrice: number;
  vipPrice: number;
  currency: string;
  duration: string;
  departures: string[];
}

const CURRENCIES: Record<string, string> = {
  KSh: 'KES',
  UGX: 'UGX',
  RWF: 'RWF',
  TZS: 'TZS',
};

export function parseAmount(str: string): number {
  return parseFloat(String(str).replace(/[^0-9.]/g, '')) || 0;
}

export function parseCurrency(str: string): string {
  const m = String(str).match(/([A-Za-z]+)/);
  return (m && CURRENCIES[m[1]]) || (m ? m[1].toUpperCase() : 'KES');
}

export function formatPrice(currency: string, amount: number): string {
  return `${currency} ${amount.toLocaleString()}`;
}

export function toParsedRoute(r: StaticRoute): ParsedRoute {
  return {
    origin: r.origin,
    destination: r.destination,
    price: parseAmount(r.price),
    executivePrice: parseAmount(r.executive_price),
    vipPrice: parseAmount(r.vip_price),
    currency: parseCurrency(r.price),
    duration: r.duration,
    departures: r.departures,
  };
}

export function findRoute(origin: string, destination: string): ParsedRoute | null {
  const r = simbaRoutes.find(
    (x) => x.origin.toLowerCase() === origin.toLowerCase() && x.destination.toLowerCase() === destination.toLowerCase()
  );
  return r ? toParsedRoute(r) : null;
}

export function findClosestRoute(origin: string, destination: string): ParsedRoute | null {
  const exact = findRoute(origin, destination);
  if (exact) return exact;
  const anyFrom = simbaRoutes.find((x) => x.origin.toLowerCase() === origin.toLowerCase());
  if (anyFrom) return toParsedRoute(anyFrom);
  return null;
}

export function uniqueCities(): { name: string; country: string }[] {
  const map = new Map<string, string>();
  simbaRoutes.forEach((r) => {
    map.set(r.origin, r.country_origin);
    map.set(r.destination, r.country_dest);
  });
  return Array.from(map.entries())
    .map(([name, country]) => ({ name, country }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const REGIONAL_DESTINATIONS: { name: string; country: string }[] = [
  { name: 'Kampala', country: 'UG' },
  { name: 'Kigali', country: 'RW' },
  { name: 'Juba', country: 'SS' },
  { name: 'Dar es Salaam', country: 'TZ' },
  { name: 'Arusha', country: 'TZ' },
  { name: 'Bujumbura', country: 'BI' },
];

export function cityOptions(): { name: string; country: string }[] {
  return [
    ...uniqueCities().filter((c) => !REGIONAL_DESTINATIONS.some((r) => r.name === c.name)),
    ...REGIONAL_DESTINATIONS,
  ];
}

export function depMinutes(time: string): number {
  const m = String(time).match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10) % 12;
  if (/PM/i.test(m[3])) h += 12;
  return h * 60 + parseInt(m[2], 10);
}

export function popularRoutes(limit = 24): ParsedRoute[] {
  const priority = [
    ['Nairobi', 'Mombasa'],
    ['Nairobi', 'Kampala'],
    ['Nairobi', 'Kisumu'],
    ['Nairobi', 'Eldoret'],
    ['Nairobi', 'Nakuru'],
    ['Nairobi', 'Kitale'],
    ['Nairobi', 'Kigali'],
    ['Nairobi', 'Juba'],
    ['Nairobi', 'Malindi'],
    ['Nairobi', 'Busia'],
    ['Mombasa', 'Nairobi'],
    ['Kisumu', 'Nairobi'],
    ['Nairobi', 'Dar es Salaam'],
  ];
  const out: ParsedRoute[] = [];
  priority.forEach(([o, d]) => {
    const r = findRoute(o, d);
    if (r) out.push(r);
  });
  if (out.length < limit) {
    simbaRoutes.forEach((r) => {
      if (out.length >= limit) return;
      const key = `${r.origin}→${r.destination}`;
      if (!out.some((x) => `${x.origin}→${x.destination}` === key)) {
        out.push(toParsedRoute(r));
      }
    });
  }
  return out.slice(0, limit);
}

export function allRoutesFor(origin: string, destination?: string): ParsedRoute[] {
  return simbaRoutes
    .filter((r) => {
      if (r.origin.toLowerCase() !== origin.toLowerCase()) return false;
      return !destination || r.destination.toLowerCase() === destination.toLowerCase();
    })
    .map(toParsedRoute)
    .slice(0, 20);
}