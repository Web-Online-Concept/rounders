import Head from "next/head";
import { useRouter } from "next/router";

const SEOHead = ({ 
  title, 
  description, 
  keywords = "stake, affiliation, casino, crypto, commissions, bonus, rounders",
  image = "/images/og-image.jpg",
  type = "website" 
}) => {
  const router = useRouter();
  const siteUrl = "https://rounders.pro";
  const currentUrl = `${siteUrl}${router.asPath}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // Déterminer la locale pour og:locale
  const locale = router.locale || 'fr';
  const ogLocale = {
    'fr': 'fr_FR',
    'en': 'en_US',
    'es': 'es_ES',
    'ru': 'ru_RU'
  }[locale] || 'fr_FR';

  return (
    <Head>
      {/* Meta de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rounders.pro" />
      <meta property="og:locale" content={ogLocale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@rounders_pro" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Langue alternative pour SEO multilingue */}
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr${router.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${router.pathname}`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es${router.pathname}`} />
      <link rel="alternate" hrefLang="ru" href={`${siteUrl}/ru${router.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${router.pathname}`} />
    </Head>
  );
};

export default SEOHead;