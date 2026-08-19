import { Helmet } from 'react-helmet-async';
import { SITE } from '../../lib/seo';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
  jsonLd?: object[];
}

const stripSuffix = (title: string) =>
  title.replace(/ \| SimbaCoach$/, '').replace(/ - SimbaCoach$/, '');

export const Seo = ({
  title,
  description,
  path = '/',
  image = SITE.image,
  keywords,
  ogType = 'website',
  noindex = false,
  jsonLd = [],
}: SeoProps) => {
  const url = `${SITE.url}${path}`;
  const ogTitle = stripSuffix(title);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_KE" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...schema })}</script>
      ))}
    </Helmet>
  );
};

export default Seo;