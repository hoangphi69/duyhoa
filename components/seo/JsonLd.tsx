import { siteConfig } from '@/config/site';

/** Dùng ở trang chủ. */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'HardwareStore'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.brand.fullName,
    alternateName: siteConfig.brand.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.brand.logo}`,
    image: `${siteConfig.url}/og/og-default.png`,
    description: siteConfig.brand.description,
    slogan: siteConfig.brand.slogan,
    foundingDate: String(siteConfig.brand.foundedYear),
    taxID: siteConfig.brand.taxCode,
    vatID: siteConfig.brand.taxCode,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.addressLocality,
      addressRegion: siteConfig.contact.addressRegion,
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo.lat,
      longitude: siteConfig.contact.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '17:30',
      },
    ],
    telephone: siteConfig.contact.hotline || undefined,
    email: siteConfig.contact.email || undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: 'Kênh đại lý',
        telephone:
          siteConfig.contact.hotlineDaiLy || siteConfig.contact.hotline,
        areaServed: siteConfig.region.provinces,
        availableLanguage: ['vi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: 'Kênh dự án – công trình',
        telephone: siteConfig.contact.hotlineDuAn || siteConfig.contact.hotline,
        areaServed: 'VN',
        availableLanguage: ['vi'],
      },
    ],
    areaServed: siteConfig.region.provinces.map((p) => ({
      '@type': 'AdministrativeArea',
      name: p,
    })),
    brand: siteConfig.brands.all.map((b) => ({ '@type': 'Brand', name: b })),
    knowsAbout: [
      'Dây và cáp điện',
      'Thiết bị chiếu sáng LED',
      'Ống nhựa uPVC, PPR, HDPE',
      'Thiết bị vệ sinh',
      'Vật tư điện nước công trình',
    ],
    sameAs: siteConfig.links.social.map((s) => s.href).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Danh mục sản phẩm Duy Hoà 68',
      itemListElement: siteConfig.categories.map((c) => ({
        '@type': 'OfferCatalog',
        name: c.name,
        url: `${siteConfig.url}/product#${c.slug}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.brand.fullName,
    inLanguage: 'vi-VN',
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Dùng ở các trang con để tạo breadcrumb trên kết quả tìm kiếm. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Trang chủ', href: '/' }, ...items].map(
      (item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${siteConfig.url}${item.href}`,
      }),
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Dùng ở các trang có faq section */
export function FAQJsonLd({
  faqs,
}: {
  faqs: {
    question: string;
    answer: string;
  }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
