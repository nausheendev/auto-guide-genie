import { useEffect } from "react";

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface LocalBusiness {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaMarkupProps {
  type: 'howto' | 'localbusiness' | 'breadcrumb' | 'faq' | 'service';
  data: {
    // HowTo Schema
    name?: string;
    description?: string;
    estimatedCost?: { min: number; max: number };
    totalTime?: string;
    steps?: HowToStep[];
    tools?: string[];
    supplies?: string[];
    
    // LocalBusiness Schema
    businesses?: LocalBusiness[];
    
    // Breadcrumb Schema
    breadcrumbs?: Array<{ name: string; url: string }>;
    
    // FAQ Schema
    faqs?: FAQItem[];
    
    // Service Schema
    serviceType?: string;
    city?: string;
    state?: string;
    areaServed?: string;
    provider?: string;
  };
}

export const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  useEffect(() => {
    const generateSchema = () => {
      switch (type) {
        case 'howto':
          return {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": data.name,
            "description": data.description,
            "estimatedCost": data.estimatedCost ? {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "minValue": data.estimatedCost.min,
              "maxValue": data.estimatedCost.max
            } : undefined,
            "totalTime": data.totalTime,
            "tool": data.tools?.map(tool => ({
              "@type": "HowToTool",
              "name": tool
            })),
            "supply": data.supplies?.map(supply => ({
              "@type": "HowToSupply",
              "name": supply
            })),
            "step": data.steps?.map((step, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": step.name,
              "text": step.text,
              "image": step.image,
              "url": step.url
            }))
          };

        case 'localbusiness':
          return data.businesses?.map(business => ({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": business.name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": business.address,
              "addressLocality": business.city,
              "addressRegion": business.state,
              "postalCode": business.zip
            },
            "telephone": business.phone,
            "priceRange": business.priceRange || "$$",
            "aggregateRating": business.rating ? {
              "@type": "AggregateRating",
              "ratingValue": business.rating,
              "reviewCount": business.reviewCount || 0
            } : undefined
          }));

        case 'breadcrumb':
          return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": data.breadcrumbs?.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": `${window.location.origin}${crumb.url}`
            }))
          };

        case 'faq':
          return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.faqs?.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          };

        case 'service':
          return {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": data.serviceType,
            "provider": {
              "@type": "AutoRepair",
              "name": data.provider || "AutoGos",
              "areaServed": {
                "@type": "City",
                "name": data.city,
                "containedInPlace": {
                  "@type": "State",
                  "name": data.state
                }
              }
            },
            "areaServed": data.areaServed
          };

        default:
          return null;
      }
    };

    const schema = generateSchema();
    if (!schema) return;

    const scriptId = `schema-${type}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schema);

    return () => {
      const element = document.getElementById(scriptId);
      if (element) element.remove();
    };
  }, [type, data]);

  return null;
};
