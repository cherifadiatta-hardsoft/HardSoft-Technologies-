import { Helmet } from 'react-helmet-async';
import { WHATSAPP_NUMBER } from '../config';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
}

export default function SEO({ title, description, name = 'HardSoft Technologies', type = 'website', url = 'https://hardsoft-technologies.net/', image = 'https://hardsoft-technologies.net/og-image.jpg' }: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": name,
    "image": image,
    "@id": url,
    "url": url,
    "telephone": `+${WHATSAPP_NUMBER}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dakar",
      "addressLocality": "Dakar",
      "addressRegion": "Dakar",
      "addressCountry": "SN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 14.6928,
      "longitude": -17.4467
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$"
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      {/* Twitter metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
