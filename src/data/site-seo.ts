export type Breadcrumb = { name: string; path: string };
export type ServiceMetadata = { name: string; description: string; category: string };

export const siteUrl = "https://www.fisiosalute.it/";
export const siteName = "FisioSalute di Erika Voltan";
export const socialImage = {
  url: new URL("og.webp", siteUrl).href,
  width: 1200,
  height: 630,
  alt: "Palestra riabilitativa di FisioSalute a Sondrio, con Reformer e attrezzature per l’esercizio terapeutico",
};

export function pageStructuredData({
  canonical, title, description, breadcrumbs = [], service,
}: {
  canonical: string;
  title: string;
  description: string;
  breadcrumbs?: Breadcrumb[];
  service?: ServiceMetadata;
}) {
  const clinicId = `${siteUrl}#clinic`;
  const websiteId = `${siteUrl}#website`;
  const pageId = `${canonical}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "MedicalClinic",
      "@id": clinicId,
      name: siteName,
      legalName: "FisioSalute di Erika Voltan S.r.l. unipersonale",
      url: siteUrl,
      telephone: "+393494011847",
      email: "info@fisiosalute.it",
      logo: new URL("brand/FisioSalute_logo-1.webp", siteUrl).href,
      image: socialImage.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Brigata Alpina Orobica 41/C",
        postalCode: "23100",
        addressLocality: "Sondrio",
        addressRegion: "SO",
        addressCountry: "IT",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00", description: "Solo su appuntamento" },
      ],
    },
    {
      "@type": "WebSite", "@id": websiteId,
      name: siteName, url: siteUrl, inLanguage: "it-IT",
      publisher: { "@id": clinicId },
    },
    {
      "@type": "WebPage", "@id": pageId,
      url: canonical, name: title, description, inLanguage: "it-IT",
      isPartOf: { "@id": websiteId },
      about: { "@id": clinicId },
      primaryImageOfPage: {
        "@type": "ImageObject", url: socialImage.url,
        width: socialImage.width, height: socialImage.height, caption: socialImage.alt,
      },
      ...(breadcrumbs.length > 1 ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } } : {}),
      ...(service ? { mainEntity: { "@id": `${canonical}#service` } } : {}),
    },
  ];
  if (breadcrumbs.length > 1) graph.push({
    "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem", position: index + 1,
      name: item.name, item: new URL(item.path, siteUrl).href,
    })),
  });
  if (service) graph.push({
    "@type": "Service", "@id": `${canonical}#service`,
    name: service.name, description: service.description, serviceType: service.category,
    url: canonical, provider: { "@id": clinicId },
    areaServed: { "@type": "City", name: "Sondrio" },
    mainEntityOfPage: { "@id": pageId },
  });
  return { "@context": "https://schema.org", "@graph": graph };
}
