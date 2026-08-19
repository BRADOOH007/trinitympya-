export const SITE = {
  name: 'SimbaCoach',
  fullName: 'SimbaCoach Bus',
  url: 'https://simba-coach-bus.online',
  logo: 'https://simba-coach-bus.online/assets/logo.webp',
  image: 'https://simba-coach-bus.online/assets/simba-hero.webp',
  description: 'Book bus tickets online for Kenya & East Africa. VIP, Executive & Standard fares across 150+ routes.',
  email: 'info@simbacoach.com',
  phone: '+254781346337',
  whatsapp: '254735893829',
  address: {
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  sameAs: [],
};

export const pushJsonLd = (...objects: object[]) => objects.map((o) => ({
  '@context': 'https://schema.org',
  ...o,
}));

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.fullName,
  url: SITE.url,
  logo: SITE.logo,
  image: SITE.image,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.addressLocality,
    addressCountry: SITE.address.addressCountry,
  },
  sameAs: SITE.sameAs,
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: 'en',
  publisher: { "@id": `${SITE.url}/#organization` },
};

export const breadcrumbJsonLd = (items: { name: string; path?: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE.url}${item.path ?? '/'}`,
  })),
});