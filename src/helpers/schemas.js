import { faqData } from "./config";

const BASE_URL = "https://unboxrobotics.com";

const organization = {
  "@type": "Organization",
  "name": "Unbox Robotics",
  "url": BASE_URL,
  "logo": `${BASE_URL}/nav-logo.png`,
  "sameAs": [
    "https://www.linkedin.com/company/unboxrobotics/",
    "https://x.com/RoboticsUnbox",
    "https://www.facebook.com/unboxrobotics/",
    "https://www.instagram.com/lifeatunbox/",
    "https://www.youtube.com/@unboxrobotics"
  ]
};

// ── Home ──────────────────────────────────────────────────────────────────────
export const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Unbox Robotics",
    "url": BASE_URL,
    "description": "Unleash blazing fast sortation & order consolidation through swarm robotics. Reach your customers faster via scalable automation that adapts to your business needs.",
    "publisher": organization
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...organization,
    "description": "Unbox Robotics is a warehouse automation company that designs and deploys intelligent robotic systems for parcel sortation and order consolidation.",
    "foundingLocation": {
      "@type": "Place",
      "name": "Pimpri-Chinchwad, Maharashtra, India"
    },
    "areaServed": "Worldwide",
    "knowsAbout": ["Warehouse Automation", "Robotic Sortation", "Swarm Robotics", "Parcel Logistics"]
  }
];

// ── About Us ──────────────────────────────────────────────────────────────────
export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Unbox Robotics",
  "url": `${BASE_URL}/about-us`,
  "description": "Learn about Unbox Robotics — the team, mission, and technology behind the world's first vertical mobile robotic sortation system.",
  "publisher": organization
};

// ── Technology ────────────────────────────────────────────────────────────────
export const technologySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Swarm Robotics Technology — Unbox Robotics",
  "url": `${BASE_URL}/technology`,
  "description": "Explore the swarm robotics technology powering UnboxSort — decentralised, AI-driven robots that sort parcels with 99.9%+ accuracy in 3D vertical space.",
  "publisher": organization,
  "about": {
    "@type": "Thing",
    "name": "Swarm Robotics",
    "description": "Autonomous robot fleets coordinated by the RCS layer for fleet-level swarm intelligence in warehouse sortation."
  }
};

// ── Solutions Overview ────────────────────────────────────────────────────────
export const solutionOverviewSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Warehouse Automation Solutions — Unbox Robotics",
  "url": `${BASE_URL}/solutions-overview`,
  "description": "Discover Unbox Robotics' full portfolio of warehouse automation solutions — from vertical robotic sortation to order consolidation and mid-mile hub automation.",
  "publisher": organization
};

// ── UnboxSort Product ─────────────────────────────────────────────────────────
export const unboxSortSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "UnboxSort",
  "url": `${BASE_URL}/solutions-unbox-sort`,
  "description": "UnboxSort is a modular, vertical robotic parcel sortation system that uses autonomous swarm robots to sort parcels into 2000+ destinations with 99.9%+ accuracy.",
  "brand": organization,
  "manufacturer": organization,
  "category": "Warehouse Automation",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "url": `${BASE_URL}/get-in-touch`
  },
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Sort Destinations", "value": "2000+" },
    { "@type": "PropertyValue", "name": "Accuracy", "value": "99.9%+" },
    { "@type": "PropertyValue", "name": "Space Saving", "value": "50-70%" },
    { "@type": "PropertyValue", "name": "Deployment Time", "value": "6-9 weeks" }
  ]
};

// ── Industry (overview) ───────────────────────────────────────────────────────
export const industrySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Industries We Serve — Unbox Robotics",
  "url": `${BASE_URL}/industry`,
  "description": "Unbox Robotics serves e-commerce, retail, 3PL, and CEP industries with AI-powered robotic sortation systems tailored to each sector's logistics needs.",
  "publisher": organization
};

// ── Industry: Retail ──────────────────────────────────────────────────────────
export const industryRetailSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Retail Warehouse Automation — Unbox Robotics",
  "url": `${BASE_URL}/industry/retail`,
  "description": "UnboxSort for retail: automate store replenishment, omnichannel fulfilment, and returns sortation with 50-70% less floor space and 99.9%+ accuracy.",
  "publisher": organization,
  "about": { "@type": "Thing", "name": "Retail Warehouse Automation" }
};

// ── Industry: E-Commerce ──────────────────────────────────────────────────────
export const industryECommerceSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "E-Commerce Sortation Automation — Unbox Robotics",
  "url": `${BASE_URL}/industry/e-commerce`,
  "description": "Purpose-built robotic sortation for e-commerce fulfilment centres. Handle 500–20,000 parcels/hour with zero single point of failure.",
  "publisher": organization,
  "about": { "@type": "Thing", "name": "E-Commerce Warehouse Automation" }
};

// ── Industry: 3PL ─────────────────────────────────────────────────────────────
export const industry3PLSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "3PL Warehouse Automation — Unbox Robotics",
  "url": `${BASE_URL}/industry/3pl`,
  "description": "Multi-client robotic sortation for 3PL operators. Scale capacity without structural changes. Deploy in 6-9 weeks.",
  "publisher": organization,
  "about": { "@type": "Thing", "name": "3PL Warehouse Automation" }
};

// ── Industry: CEP ─────────────────────────────────────────────────────────────
export const industryCEPSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "CEP Sortation Automation — Unbox Robotics",
  "url": `${BASE_URL}/industry/cep`,
  "description": "Courier, Express & Parcel sortation automation for high-volume hubs. RCS-orchestrated swarm robotics with self-healing in under 2 seconds.",
  "publisher": organization,
  "about": { "@type": "Thing", "name": "CEP Sortation Automation" }
};

// ── Get In Touch ──────────────────────────────────────────────────────────────
export const getInTouchSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Unbox Robotics",
  "url": `${BASE_URL}/get-in-touch`,
  "description": "Get in touch with Unbox Robotics to discuss your warehouse automation needs. Book a demo or request a consultation with our team.",
  "publisher": organization,
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales",
    "email": "sales@unboxrobotics.com",
    "areaServed": "Worldwide",
    "availableLanguage": "English"
  }
};

// ── FAQs ──────────────────────────────────────────────────────────────────────
export const faqsSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Frequently Asked Questions — Unbox Robotics",
  "url": `${BASE_URL}/faqs`,
  "mainEntity": faqData.map((faq) => ({
    "@type": "Question",
    "name": faq.name,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.desc
    }
  }))
};

// ── Blogs ─────────────────────────────────────────────────────────────────────
export const blogsSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Unbox Robotics Blog",
  "url": `${BASE_URL}/blogs`,
  "description": "Insights, industry news, and thought leadership on warehouse automation, robotic sortation, and logistics from the Unbox Robotics team.",
  "publisher": organization
};

// ── Case Study listing ────────────────────────────────────────────────────────
export const caseStudyListingSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Case Studies — Unbox Robotics",
  "url": `${BASE_URL}/case-study`,
  "description": "Real-world case studies showing how UnboxSort has transformed fulfilment centres across e-commerce, retail, 3PL, and CEP industries worldwide.",
  "publisher": organization
};

// ── PR & News listing ─────────────────────────────────────────────────────────
export const prNewsListingSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "PR & News — Unbox Robotics",
  "url": `${BASE_URL}/pr-news`,
  "description": "Press releases, company milestones, product announcements and coverage from across the world of warehouse automation.",
  "publisher": organization
};

// ── Events listing ────────────────────────────────────────────────────────────
export const eventsListingSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "News & Events — Unbox Robotics",
  "url": `${BASE_URL}/events`,
  "description": "Stay up to date with Unbox Robotics at global logistics events, trade shows, and industry conferences.",
  "publisher": organization
};

// ── LogiMAT 2026 ──────────────────────────────────────────────────────────────
export const logimat2026Schema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Unbox Robotics at LogiMAT 2026",
  "startDate": "2026-03-24",
  "endDate": "2026-03-26",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Messe Stuttgart",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Messepiazza 1",
      "addressLocality": "Stuttgart",
      "postalCode": "70629",
      "addressCountry": "DE"
    }
  },
  "description": "Experience UnboxSort live at LogiMAT 2026. See full automated parcel workflow — from Delta robotic induction to 3D vertical sortation. Hall 8, Stand 8A37.",
  "organizer": organization
};

// ── Use Cases ─────────────────────────────────────────────────────────────────
export const useCaseOrderConsolidationSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Fulfillment Center Order Consolidation — UnboxSort",
  "url": `${BASE_URL}/use-cases/fulfillment-center-order-consolidation`,
  "description": "Automate multi-SKU order consolidation with UnboxSort. Dynamic sortation into live order destinations within a compact vertical layout.",
  "publisher": organization
};

export const useCaseClickAndCollectSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Fulfillment Center Click & Collect — UnboxSort",
  "url": `${BASE_URL}/use-cases/fulfillment-center-click-and-collect`,
  "description": "Enable fast, store-wise BOPIS consolidation with UnboxSort robotic sortation — without disrupting core fulfilment operations.",
  "publisher": organization
};

export const useCaseOutboundSortationSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Fulfillment Center Outbound Sortation — UnboxSort",
  "url": `${BASE_URL}/use-cases/fulfillment-center-outbound-sortation`,
  "description": "Sort parcels by carrier, route, or dispatch wave at high throughput with UnboxSort's flexible outbound sortation system.",
  "publisher": organization
};

export const useCaseMidMileSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sort Center Mid-Mile Sortation — UnboxSort",
  "url": `${BASE_URL}/use-cases/sort-center-mid-mile-sortation`,
  "description": "Scalable, high-density mid-mile hub sortation that adapts to shifting destination patterns and network expansion.",
  "publisher": organization
};

export const useCaseReturnsSortationSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Distribution Center Returns Sortation — UnboxSort",
  "url": `${BASE_URL}/use-cases/distribution-center-returns-sortation`,
  "description": "Automate returns classification and sortation by condition, category, or next action with UnboxSort.",
  "publisher": organization
};

export const useCaseB2BSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "B2B Store Order Fulfillment — UnboxSort",
  "url": `${BASE_URL}/use-cases/b2b-store-order-fulfillment`,
  "description": "Consolidate store-wise cartons and parcels for scheduled dispatch with UnboxSort's B2B fulfillment automation.",
  "publisher": organization
};

export const useCaseDeliveryHubSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Delivery Hub Last-Mile Sortation — UnboxSort",
  "url": `${BASE_URL}/use-cases/delivery-hub-last-mile-sortation`,
  "description": "Sort parcels by delivery route or pin-code at neighborhood hubs with UnboxSort compact vertical sortation.",
  "publisher": organization
};

// ── Legal pages ───────────────────────────────────────────────────────────────
export const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service — Unbox Robotics",
  "url": `${BASE_URL}/terms-of-services`,
  "description": "Terms of Service for Unbox Robotics products and services.",
  "publisher": organization
};

export const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy — Unbox Robotics",
  "url": `${BASE_URL}/privacy-policy`,
  "description": "Privacy Policy governing how Unbox Robotics collects, uses, and protects your personal data.",
  "publisher": organization
};

export const gdprSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "GDPR Compliance — Unbox Robotics",
  "url": `${BASE_URL}/gdpr-compliance`,
  "description": "Unbox Robotics GDPR compliance information and your rights under the General Data Protection Regulation.",
  "publisher": organization
};

export const dpaSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Data Processing Agreement — Unbox Robotics",
  "url": `${BASE_URL}/data-processing-agreement`,
  "description": "Data Processing Agreement outlining how Unbox Robotics processes personal data on behalf of customers.",
  "publisher": organization
};

// ── DELIVER Europe 2026 ───────────────────────────────────────────────────────
export const deliverEurope2026Schema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Unbox Robotics at DELIVER Europe 2026",
  "startDate": "2026-06-03",
  "endDate": "2026-06-04",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "TAETS Event Park",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hemweg 8",
      "addressLocality": "Amsterdam",
      "postalCode": "1013 ED",
      "addressCountry": "NL"
    }
  },
  "image": `${BASE_URL}/og-deliver-europe-2026.jpg`,
  "description": "Meet UnboxSort at DELIVER Europe 2026 — World's First Vertical Mobile Sortation. Join us at Booth C66, TAETS Event Park, Amsterdam, June 3–4, 2026.",
  "organizer": organization,
  "performer": {
    "@type": "Person",
    "name": "Lukasz Banachowicz",
    "jobTitle": "Sales Director – EMEA",
    "worksFor": organization
  },
  "subEvent": {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "World's First Vertical Mobile Sortation: Redefining Warehouse Physics in Three Dimensions",
    "startDate": "2026-06-04T14:00:00+02:00",
    "endDate": "2026-06-04T14:25:00+02:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "TAETS Event Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hemweg 8",
        "addressLocality": "Amsterdam",
        "postalCode": "1013 ED",
        "addressCountry": "NL"
      }
    },
    "description": "Lukasz Banachowicz, Sales Director – EMEA at Unbox Robotics, presents how vertical mobile sortation is redefining warehouse physics in three dimensions.",
    "performer": {
      "@type": "Person",
      "name": "Lukasz Banachowicz",
      "jobTitle": "Sales Director – EMEA",
      "worksFor": organization
    },
    "organizer": organization
  }
};

// ── CeMAT Australia 2026 ──────────────────────────────────────────────────────
export const cematAustralia2026Schema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Unbox Robotics at CeMAT Australia 2026",
  "startDate": "2026-06-23",
  "endDate": "2026-06-25",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Melbourne Convention and Exhibition Centre (MCEC)",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 Convention Centre Place",
      "addressLocality": "South Wharf",
      "addressRegion": "VIC",
      "postalCode": "3006",
      "addressCountry": "AU"
    }
  },
  "image": `${BASE_URL}/og-cemat-australia-2026.jpg`,
  "description":
    "Meet UnboxSort at CeMAT Australia 2026 — vertical robotic sortation for fulfilment, 3PL, and omnichannel DCs. Visit us at Booth IT24, MCEC Melbourne, June 23–25, 2026.",
  "organizer": organization
};

// ── Dynamic schema builders ───────────────────────────────────────────────────
export const createBlogSchema = (blog, slug) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "description": blog.description,
  "url": `${BASE_URL}/blogs/${slug}`,
  "image": blog.image || `${BASE_URL}/nav-logo.png`,
  "datePublished": blog.createdAt,
  "dateModified": blog.updatedAt || blog.createdAt,
  "author": {
    "@type": "Organization",
    ...organization
  },
  "publisher": organization
});

export const createCaseStudySchema = (item, slug) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": item.title,
  "description": item.description,
  "url": `${BASE_URL}/case-study/${slug}`,
  "image": item.image || `${BASE_URL}/nav-logo.png`,
  "datePublished": item.createdAt,
  "dateModified": item.updatedAt || item.createdAt,
  "author": {
    "@type": "Organization",
    ...organization
  },
  "publisher": organization
});

export const createPrNewsSchema = (item, slug) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": item.title,
  "description": item.description,
  "url": `${BASE_URL}/pr-news/${slug}`,
  "image": item.media || item.thumbnail_url || `${BASE_URL}/nav-logo.png`,
  "articleSection": item.category,
  "datePublished": item.date || item.createdAt,
  "dateModified": item.updatedAt || item.createdAt,
  "author": {
    "@type": "Organization",
    ...organization
  },
  "publisher": organization
});
