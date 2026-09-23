import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO } from '../../constants/businessInfo';
import { getLocalSEOMeta } from '../../utils/localSEO';

interface LocalSEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const LocalSEOHead: React.FC<LocalSEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage
}) => {
  const seoMeta = getLocalSEOMeta(title);
  const fullTitle = `${title} | ${BUSINESS_INFO.name}`;
  const finalDescription = description || seoMeta.description;
  const finalKeywords = keywords || seoMeta.keywords;
  const finalCanonical = canonicalUrl || BUSINESS_INFO.website.url;
  const finalOgImage = ogImage || `${BUSINESS_INFO.website.url}/og-image.jpg`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />

      {/* Geo Tags */}
      <meta name="geo.region" content={seoMeta.geo.region} />
      <meta name="geo.placename" content={seoMeta.geo.placename} />
      <meta name="geo.position" content={seoMeta.geo.position} />
      <meta name="ICBM" content={seoMeta.geo.position} />

      {/* Language and Locale */}
      <meta name="language" content="fr" />
      <meta httpEquiv="content-language" content="fr-BE" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={seoMeta.openGraph.type} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:locale" content={seoMeta.openGraph.locale} />
      <meta property="og:site_name" content={seoMeta.openGraph.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Business Information */}
      <meta name="author" content={`${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}`} />
      <meta name="contact" content={BUSINESS_INFO.contact.email} />
      <meta name="coverage" content={BUSINESS_INFO.seo.areaServed.join(', ')} />

      {/* Mobile */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="HandheldFriendly" content="true" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

export default LocalSEOHead;
