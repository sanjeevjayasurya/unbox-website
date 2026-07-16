"use client";

import RapidIcon from "../assets/icons/rapid.svg";
import TrendIcon from "../assets/icons/trend-up.svg";
import RocketIcon from "../assets/icons/rocket.svg";
import OmtegraIcon from "../assets/images/client/omtegra.svg";
import TrendyolIcon from "../assets/images/client/trendyol.svg";
import InditexIcon from "../assets/images/client/inditex.svg";
import BonzaiIcon from "../assets/images/client/bonzai.svg";
import DhlIcon from "../assets/images/client/dhl.svg";
import MyntraIcon from "../assets/images/client/myntra.svg";
import MondialIcon from "../assets/images/client/mondial.svg";
import InPostIcon from "../assets/images/client/inpost.svg";
import MiroglioIcon from "../assets/images/client/miroglio.svg";

import FlipcartLogo from "../assets/images/testimonial/flipkart.svg";
import MyntraLogo from "../assets/images/testimonial/myntra.svg";
import AmazonLogo from "../assets/images/testimonial/amazon.svg";
import {
  rapidImage,
  flipcartTestimonialImage,
  amazonTestimonialImage,
  myntraTestimonialImage,
  puneLocationImage,
  bangloreLocationImage,
  usaLocationImage,
  consolidationImage,
  sortationImage,
  collectImage,
  sortCenterImage,
  distributionImage,
  b2bImage,
  deliveryHubImage,
  ecommerceImage,
  retailImage,
  courierImage,
  thirdPartyImage,
  unboxsort1,
  unboxsort2,
  unboxsort3,
  unboxsort4,
  unboxsort5,
  unboxsort6,
  unboxsort7,
} from "./assets";

export const solutionMenuItems = [
  {
    id: 1,
    title: "UnboxSort",
    desc: "Vertical Robotic Sortation",
    link: "/solutions-unbox-sort",
  },
  // {
  //   id: 2,
  //   title: "Parcel Sortation",
  //   desc: "High-Speed Parcel Sortation Systems",
  //   link: "#",
  // },
  // {
  //   id: 1,
  //   title: "Order Consolidation",
  //   desc: "Efficient Order Consolidation Solutions",
  //   link: "#",
  // },
];

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export const sfOrgId = process.env.NEXT_PUBLIC_SF_ORG_ID;

export const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

export const ipInfoToken = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
export const ipInfoApiEndPoint = "https://ipinfo.io/json";
export const fetchCountryCallingCodeApiEndPoint =
  "https://restcountries.com/v3.1/alpha";

export const frontendUrl =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "https://unboxrobotics.com";
export const contactEmail = "sales@unboxrobotics.com";
export const instagramUrl = "https://www.instagram.com/lifeatunbox/";
export const linkedinUrl = "https://www.linkedin.com/company/unboxrobotics/";
export const xUrl = "https://x.com/RoboticsUnbox";
export const facebookUrl = "https://www.facebook.com/unboxrobotics/";
export const youtubeUrl = "https://www.youtube.com/@unboxrobotics";
export const base_url =
  process.env.NEXT_PUBLIC_BASE_URL || "https://unboxadmin.4tysixapplabs.com/api";
export const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://unboxadmin.4tysixapplabs.com";
/** WordPress site origin (no trailing slash). Blogs/case studies are read from the WP REST API. */
export const wpApiUrl = (process.env.NEXT_PUBLIC_WP_API_URL || "").replace(
  /\/$/,
  "",
);
export const normalizeVideoUrl = (url) => {
  if (!url) return url;
  return url.replace("http://68.178.169.107:5007", backendUrl);
};
/**
 * Resolve media for blogs/case studies.
 * Absolute URLs (WordPress) and local public paths pass through; legacy backend paths are prefixed.
 */
export const resolveMediaUrl = (assetPath) => {
  if (!assetPath) return "";
  if (/^https?:\/\//i.test(assetPath) || assetPath.startsWith("data:")) {
    return assetPath;
  }
  if (
    assetPath.startsWith("/images/") ||
    assetPath.startsWith("/sample-") ||
    assetPath.startsWith("/logo") ||
    assetPath.startsWith("/schema/")
  ) {
    return assetPath;
  }
  return `${backendUrl}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};
export const privacyPolicyApiEndPoint = "/privacy-policy";
export const termsApiEndPoint = "/terms-condition";
export const gdprApiEndPoint = "/gdpr-compliance";
export const dpaApiEndPoint = "/dpa";
export const contactApiEndPoint = "/contact";
export const eventFormApiEndPoint = "/event";
export const rsvpApiEndPoint = "/event/rsvp";

// Blog/case-study list+detail content comes from WordPress (see src/lib/wordpress.js).
// Lead capture for case-study PDF downloads still uses the legacy backend.
export const casestudyDownloadApiEndPoint = "/front/case-studies/download";

export const fetchWhitePaperApiEndPoint = "/front/white-papers";
export const fetchFeaturedWhitePaperApiEndPoint =
  "/front/white-papers/featured";
export const whitePaperDownloadApiEndPoint = "/front/white-papers/download";

export const fetchPrNewsApiEndPoint = "/front/pr-news";
export const fetchFeaturedPrNewsApiEndPoint = "/front/pr-news/featured";
export const fetchRecentPrNewsApiEndPoint = "/front/pr-news/recent";

export const fetchJobsApiEndPoint = "/front/jobs";

export const footerMenuList = [
  { id: 1, name: "Home", navigate: "/" },
  { id: 2, name: "Solutions", navigate: "/solutions-overview" },
  { id: 3, name: "Technology", navigate: "/technology" },
  { id: 4, name: "Industry", navigate: "/industry" },
  { id: 5, name: "About Us", navigate: "/about-us" },
  // { id: 6, name: "Careers", navigate: "/careers" },
  // { id: 7, name: "Blogs", navigate: "/blogs" },
  // { id: 8, name: "Case Study", navigate: "/case-study" },
  { id: 9, name: "FAQ", navigate: "/faqs" },
  // { id: 10, name: "White Paper", navigate: "/white-paper" },
];

export const faqData = [
  {
    id: 1,
    name: "What is Unbox Robotics?",
    desc: "Unbox Robotics is a warehouse automation company that designs and deploys intelligent robotic systems for parcel sortation and order consolidation. Its flagship solution, UnboxSort, is a vertical robotic sortation system built to deliver high throughput, space efficiency, and operational flexibility for modern logistics and fulfillment operations.",
    selected: false,
  },
  {
    id: 2,
    name: "What is UnboxSort?",
    desc: "UnboxSort is a modular, vertical robotic parcel sortation system that uses autonomous robots and intelligent software to sort parcels into destinations such as orders, routes, stores, or carriers. It is designed to operate in compact spaces while maintaining high accuracy and throughput.",
    selected: false,
  },
  {
    id: 3,
    name: "How does UnboxSort differ from traditional conveyor or cross-belt sorters?",
    desc: `Unlike traditional conveyor-based systems that rely heavily on floor space and fixed layouts, UnboxSort:

* Uses **vertical space**, reducing footprint by ~50–70%
* Is **modular and scalable**, not rigid or capacity-locked
* Deploys in **weeks instead of months**
* Adapts dynamically to changing destination counts and volumes

This makes UnboxSort more suitable for fast-growing, space-constrained warehouses.`,
  },
  {
    id: 4,
    name: "What types of warehouses can use UnboxSort?",
    desc: `UnboxSort can be deployed across:

* E-commerce fulfillment centres
* Sort centres and mid-mile hubs
* Distribution centres
* Urban delivery hubs
* B2B and store replenishment facilities

It works in both **greenfield and brownfield warehouses**, without major infrastructure changes.`,
    selected: false,
  },
  {
    id: 5,
    name: "What kind of parcels can UnboxSort handle?",
    desc: `UnboxSort is designed for conveyable parcels such as:

* Cartons
* Small to medium-sized boxes

The system supports varied parcel sizes and weights commonly seen in e-commerce, retail, and logistics operations.`,
    selected: false,
  },
  {
    id: 6,
    name: "What use cases does UnboxSort support?",
    desc: `UnboxSort supports a wide range of modern logistics workflows, including:

* Fulfillment center order consolidation
* Outbound parcel sortation
* Click & Collect (BOPIS) operations
* Mid-mile sortation at hub facilities
* Returns sortation
* B2B (store) order fulfillment
* Last-mile route-level sortation

`,
    selected: false,
  },
  {
    id: 7,
    name: "How scalable is UnboxSort?",
    desc: `UnboxSort is designed to scale incrementally. Operators can:

* Add or remove robots based on throughput needs
* Increase destinations without redesigning layouts
* Adapt to seasonal peaks without permanent infrastructure expansion

This allows warehouses to grow capacity as demand evolves.`,
    selected: false,
  },
  {
    id: 8,
    name: "How long does it take to deploy UnboxSort?",
    desc: `Typical UnboxSort deployments can go live in **weeks**, depending on system size and site readiness. This is significantly faster than traditional sortation systems, which often take several months to deploy.`,
    selected: false,
  },
  {
    id: 9,
    name: "Does UnboxSort integrate with existing WMS or IT systems?",
    desc: `Yes. UnboxSort is designed to integrate with existing **Warehouse Management Systems (WMS)** and enterprise IT infrastructure, supporting real-time data exchange for parcel information, destination logic, and operational reporting.`,
    selected: false,
  },
  {
    id: 10,
    name: "What level of sorting accuracy does UnboxSort provide?",
    desc: `UnboxSort delivers **up to 99.99% sorting accuracy**, supported by intelligent routing logic, automated scanning, and real-time system coordination.`,
    selected: false,
  },
  {
    id: 11,
    name: "How does UnboxSort ensure reliability at scale?",
    desc: `UnboxSort uses a **decentralized, swarm-enabled robotic architecture**. Each robot operates autonomously while coordinating with the system, ensuring:

* No single point of failure
* Stable throughput even at high robot density
* Continuous operation despite localized issues
`,
    selected: false,
  },
  {
    id: 12,
    name: "Is UnboxSort suitable for peak-season operations?",
    desc: "Yes. Its modular design allows operators to temporarily scale robot count and throughput to handle festive sales or promotional events without permanent infrastructure changes.",
    selected: false,
  },
  {
    id: 13,
    name: "What are the space requirements for UnboxSort?",
    desc: `UnboxSort is designed for **space efficiency**. By using vertical sortation and compact layouts, it typically requires **50–70% less floor space** compared to traditional conveyor-based systems handling similar throughput.`,
    selected: false,
  },
  {
    id: 14,
    name: "What kind of maintenance does UnboxSort require?",
    desc: "UnboxSort is designed for ease of maintenance, with modular components and intelligent system monitoring. This allows faster servicing, reduced downtime, and predictable performance over long-term operation.",
    selected: false,
  },
  {
    id: 15,
    name: "Is UnboxSort safe to operate alongside people?",
    desc: "Yes. UnboxSort includes safety mechanisms such as controlled robot zones and smart safety fencing that differentiate between human and robot movement, ensuring safe coexistence on the warehouse floor.",
    selected: false,
  },
  {
    id: 16,
    name: "How does UnboxSort support future warehouse expansion?",
    desc: "UnboxSort is built for evolving logistics networks. As destination counts, order profiles, or network complexity increase, the system can be reconfigured through software and modular expansion without rebuilding layouts.",
    selected: false,
  },
  {
    id: 17,
    name: "How can I evaluate if UnboxSort is right for my operation?",
    desc: "The best way to evaluate UnboxSort is through a detailed operational assessment. Unbox Robotics works with customers to understand parcel profiles, throughput needs, space constraints, and growth plans before recommending a system configuration.",
    selected: false,
  },
];

export const impactAccordionData = [
  {
    title: "OpEx Savings",
    content:
      "Drastically cut dependency on manual sorting, reallocating resources to higher-value tasks.",
    image: rapidImage,
    icon: <RapidIcon />,
  },
  {
    title: "Rapid Deployment",
    content:
      "Go live in few weeks, thanks to our self-deployable, modular system and simplified component assembly.",
    image: rapidImage,
    icon: <TrendIcon />,
  },
  {
    title: "Warehouse Optimization",
    content:
      "Our compact, vertical-friendly design requires significantly less physical floor space, allowing you to maximize storage and operational density.",
    image: rapidImage,
    icon: <RocketIcon />,
  },
];

export const clientInfo = [
  {
    id: 1,
    icon: <BonzaiIcon />,
  },
  {
    id: 2,
    icon: <DhlIcon />,
  },
  {
    id: 3,
    icon: <MyntraIcon />,
  },
  {
    id: 4,
    icon: <MondialIcon />,
  },
  {
    id: 5,
    icon: <InditexIcon />,
  },
  {
    id: 6,
    icon: <TrendyolIcon />,
  },
  {
    id: 7,
    icon: <MiroglioIcon />,
  },
];

export const testimonialData = [
  {
    id: 1,
    image: flipcartTestimonialImage,
    message: `“Automation delivers precision we never imagined. Our sorting accuracy has reached unprecedented levels.”`,
    clientInfo: {
      name: "Jayandran Venugopal",
      status: "CPTO, Flipkart",
      logo: <FlipcartLogo />,
    },
  },
  {
    id: 2,
    image: myntraTestimonialImage,
    message: `“Efficiency soars beyond our wildest expectations. UnboxSort robots have revolutionized how we process orders.”`,
    clientInfo: {
      name: "Nandita Sinha",
      status: "CEO, Myntra",
      logo: <MyntraLogo />,
    },
  },
  {
    id: 3,
    image: amazonTestimonialImage,
    message: `“Space-saving and highly efficient! Unbox Robotics’ technology allowed us to maximize output without expanding our facility. A true game-changer!”`,
    clientInfo: {
      name: "Amardeep Vishwakarma ",
      status: "Engineering Leader, Amazon",
      logo: <AmazonLogo />,
    },
  },
];

export const locationData = [
  {
    id: 1,
    name: "Headquarters in Pimpri-Chinchwad",
    locationInfo: {
      image: puneLocationImage,
      name: "Headquarters in Pimpri-Chinchwad",
      address: `<p>Unboxrobotics Labs Pvt Ltd. <br />C9-10(11),MIDC road,<br />T Block, MIDC,<br />Bhosari, Pimpri-Chinchwad,<br />Maharashtra 411026</p>`,
    },
  },
  {
    id: 2,
    name: "Manufacturing in Pune",
    locationInfo: {
      image: bangloreLocationImage,
      name: "Manufacturing in Pune",
      address: `<p>Unboxrobotics Labs Pvt Ltd.<br />Dangat Patil Nagar,<br />Shivane,Pune,<br />Maharashtra 411023</p>`,
    },
  },
  {
    id: 3,
    name: "Servicing across the globe",
    locationInfo: {
      image: usaLocationImage,
      name: "Servicing across the globe",
      address: null,
    },
  },
];

export const locationQuestion = [
  { id: 1, answer: "Fulfillment Centre- Order Consolidation" },
  { id: 2, answer: "Fulfillment Centre – Outbound Sortation" },
  { id: 3, answer: "Fulfillment Centre – Click & Collect" },
  { id: 4, answer: "Sort Centre – Mid-Mile Sortation" },
  { id: 5, answer: "Distribution Centre – Returns Sortation" },
  { id: 6, answer: "B2B (Store) Order Fulfillment" },
  { id: 7, answer: "Delivery Hub – Last-Mile Sortation" },
];

export const industryUserCasesData = [
  {
    id: 1,
    title: "E-commerce",
    desc: "The rapid rise of e-commerce offers many great opportunities, but demand is unpredictable and hard to keep up with. Our system scales up or down with ease, so you can stay on top of buying trends.",
    tags: ["Effortless Scaling", " Unmatched Accuracy", "Customer Loyalty"],
    image: ecommerceImage,
  },
  // {
  //   id: 2,
  //   title: "3PL (Third-Party Logistics)",
  //   desc: "For 3PL, the biggest risk isn't volume, it's the fluctuation. Managing dozens of clients means constant changes in volume, package types, and delivery speed. All while the cost per parcel (CPP) needs to drop. Unbox system adapts to your client demand in real-time.",
  //   tags: ["Modular Robots", "Minimal Infrastructure", "Precision Sortation"],
  //   image: thirdPartyImage,
  // },
  {
    id: 2,
    title: "Retail",
    desc: "Retail Industry deals with inventory that has a rapid expiration date, forcing high-pressure store allocation decisions and costly markdowns. Our system keeps inventory moving speedily and efficiently to keep your customers happy.",
    tags: ["Unified Fulfillment", "Minimize Stockouts", "Inventory Accuracy"],
    image: retailImage,
  },
  {
    id: 3,
    title: "Courier & Parcels",
    desc: " Modern consumer demand overwhelms traditional logistics; urban fulfillment requires smarter, integrated systems for Courier, Express, and Parcel (CEP) success. Find out how our system ensures rapid and optimized delivery for your complex last-mile schedules.",
    tags: ["PPH Maximization", "Zero Exceptions", "Route Optimization"],
    image: courierImage,
  },
];

export const unboxSuperPowerData = [
  {
    id: "consolidation",
    name: "Fulfillment Center- Order Consolidation",
    desc: "Sort parcels into live orders with high accuracy and dynamic binning.",
    image: unboxsort1,
  },
  {
    id: "sortation",
    name: "Fulfillment Center – Outbound Sortation",
    desc: "Sort parcels by carrier, route, or dispatch wave at high throughput.",
    image: unboxsort2,
  },
  {
    id: "collect",
    name: "Fulfillment Center – Click & Collect",
    desc: "Enable fast, store- or order-wise consolidation for BOPIS workflows.",
    image: unboxsort3,
  },
  {
    id: "sortation-mid-mile",
    name: "Sort Center – Mid-Mile Sortation",
    desc: "Handle high-volume hub sortation between origin and destination cities.",
    image: unboxsort4,
  },
  {
    id: "distribution",
    name: "Distribution Center – Returns Sortation",
    desc: "Automate returns classification by condition, category, or next action.",
    image: unboxsort5,
  },
  {
    id: "b2b",
    name: "B2B (Store) Order Fulfillment",
    desc: "Consolidate store-wise cartons and parcels for scheduled dispatch.",
    image: unboxsort6,
  },
  {
    id: "delivery-hub",
    name: "Delivery Hub – Last-Mile Sortation",
    desc: "Sort parcels by delivery route or pin-code at neighborhood hubs.",
    image: unboxsort7,
  },
];

export const unboxSuperPowerDataCards = [
  {
    id: "consolidation",
    title: "Fulfillment Center Order Consolidation",
    description:
      "Modern fulfillment centres process thousands of parallel orders across diverse SKUs and channels. UnboxSort enables seamless order consolidation by dynamically sorting parcels into live order destinations within a compact vertical layout.",
    list: [
      "High-speed consolidation for large order volumes",
      "Accurate order grouping across multiple fulfillment waves",
      "Scalable operations without increasing floor footprint",
    ],
    image: consolidationImage,
  },
  {
    id: "sortation",
    title: "Fulfillment Center Outbound Sortation",
    description:
      "Outbound sortation today must adapt continuously to changing carrier plans, dispatch waves, and delivery commitments. UnboxSort supports flexible outbound sortation by routing parcels by carrier, route, or shipment group in real time.",
    list: [
      "Consistent high-throughput outbound flows",
      "Reliable on-time dispatch across multiple lanes",
      "Rapid adaptation to changing dispatch requirements",
    ],
    image: sortationImage,
  },
  {
    id: "collect",
    title: "Fulfillment Center Click & Collect",
    description:
      "Click & Collect and store pickup models require fast, store-wise consolidation without disrupting core fulfillment operations. UnboxSort enables precise store- and order-level sortation, supporting efficient preparation for pickup and handover.",
    list: [
      "Faster preparation for in-store pickup",
      "Clear segregation of store-wise orders",
      "Streamlined omnichannel fulfillment workflows",
    ],
    image: collectImage,
  },
  {
    id: "sortation-mid-mile",
    title: "Sort Center Mid-Mile Sortation",
    description:
      "Mid-mile sort centres form the backbone of modern logistics networks. UnboxSort enables scalable, high-density sortation that adapts to shifting destination patterns and network expansion.",
    list: [
      "Stable throughput across varying load profiles",
      "Flexible destination mapping as networks evolve",
      "Compact sortation layouts suited for growing hubs",
    ],
    image: sortCenterImage,
  },
  {
    id: "distribution",
    title: "Distribution Center Returns Sortation",
    description:
      "Returns handling is now an integral part of modern fulfillment. UnboxSort enables structured, rule-based sortation of return parcels, supporting faster downstream processing and inventory flow.",
    list: [
      "Efficient classification of return parcels",
      "Faster movement toward inspection, restocking, or redistribution",
      "Improved visibility across reverse logistics flows",
    ],
    image: distributionImage,
  },
  {
    id: "b2b",
    title: "B2B (Store) Order Fulfillment",
    description:
      "Retail and wholesale networks rely on predictable, store-wise order fulfillment. UnboxSort supports structured B2B workflows by consolidating parcels and cartons by store, route, or delivery schedule.",
    list: [
      "Accurate store-wise order grouping",
      "Reliable replenishment cycles",
      "Scalable operations for expanding retail networks",
    ],
    image: b2bImage,
  },
  {
    id: "delivery-hub",
    title: "Delivery Hub Last-Mile Sortation",
    description:
      "Urban delivery hubs demand compact, high-accuracy sortation aligned with route-level operations. UnboxSort enables efficient last-mile sortation within constrained spaces, supporting faster and more organised dispatch.",
    list: [
      "Route- and pin-code-level sortation",
      "Faster morning dispatch readiness",
      "Improved delivery workforce productivity",
    ],
    image: deliveryHubImage,
  },
];

export const solutionIndustryFaqData = [
  {
    id: 1,
    name: "What is retail warehouse automation and how does it work?",
    desc: "Retail warehouse automation uses robotic sortation systems autonomous mobile robots coordinated by the RCS layer for fleet-level swarm intelligence  to sort garments, parcels and products across store codes, size codes and SKU variants automatically. Unbox uses 3D robotic sorting technology delivering accurate robotic sorting without manual intervention.",
    selected: false,
  },
  {
    id: 2,
    name: "Can Unbox handle omnichannel retail operations?",
    desc: "Yes. UnboxSort is flexible warehouse automation system handles store replenishment, e-commerce dispatch, and returns processing within a single deployment. Accurate robotic sorting across all channels means no separate infrastructure for each fulfillment stream.",
    selected: false,
  },
  {
    id: 3,
    name: "How does Unbox reduce warehouse footprint for retail DCs?",
    desc: "UnboxSort a vertical sortation system builds upward using cubic space up to 2.4m high rather than expanding horizontally. This reduces warehouse footprint by 50–70% versus conventional conveyor-based retail warehouse automation, freeing floor space for additional storage.",
  },
  {
    id: 4,
    name: "Is Unbox scalable for peak retail periods?",
    desc: "Yes. Modular warehouse automation system scales fleet capacity up or down without structural changes or shutdown. Fleet dynamically redistributes load and capable handling Black Friday sale, New Year’s sale, and End of Season sale spikes without additional headcount.",
  },
  {
    id: 5,
    name: "What is the warehouse automation ROI for retail deployments?",
    desc: "Retail operators typically achieve warehouse automation ROI within 1–2 years. Drivers include 40–60% reduction in sortation labor costs, elimination of store delivery error rework, and 2× productivity gain from automated parcel sorting at scale.",
  },
  {
    id: 6,
    name: "How does Unbox compare to other warehouse automation companies for retail?",
    desc: "Unlike generic warehouse robotics solutions adapted from grocery or pharma, UnboxSort is purpose-built for parcels upto 20kg with dimensions under 650×500×400mm the precise profile of retail, fashion and FMCG distribution. 3PL warehouse automation and retail are our primary focus.",
  },
];
export const IndustryECommerceFaqData = [
  {
    id: 1,
    name: "What is e-commerce sortation automation and how does it work?",
    desc: "E-commerce sortation automation uses robotic sortation systems. Autonomous mobile robots coordinated by the RCS layer for fleet-level swarm intelligence to automatically sort, consolidate and dispatch parcels across thousands of destinations. UnboxSort uses 3D robotic sorting technology that operates across multiple vertical levels, delivering accurate robotic sorting without manual intervention.",
    selected: false,
  },
  {
    id: 2,
    name: "How does Unbox reduce warehouse footprint for e-commerce operators?",
    desc: "The Unbox vertical sortation system builds upward using cubic warehouse space up to 2.4m high rather than expanding horizontally. This approach consistently reduces warehouse footprint by 50–70% compared to conventional conveyor-based warehouse automation, freeing recovered floor space for additional storage or operations.",
    selected: false,
  },
  {
    id: 3,
    name: "Is Unbox a scalable warehouse robotics solution for peak season?",
    desc: "Yes. The modular warehouse automation design allows operators to scale fleet capacity up or down without structural changes or operational shutdown. The RCS-coordinated fleet dynamically redistributes load across all robots handling Black Friday sale, New Year's sale, and End of Season sale spikes without additional headcount.",
  },
  {
    id: 4,
    name: "What is the warehouse automation ROI timeline for Unbox deployments?",
    desc: "Most Unbox customers achieve measurable warehouse automation ROI within 1–2 years of deployment. The primary drivers are a 40–60% reduction in sortation labor costs, elimination of mis-sort rework, and increased throughput from accurate robotic sorting at 99.99%+ accuracy. Flexible lease options are also available to reduce upfront capital commitment.",
  },
  {
    id: 5,
    name: "How does Unbox address the warehouse labor shortage?",
    desc: "The warehouse labor shortage is one of the primary reasons e-commerce operators choose Unbox. By replacing manual sortation with AI-powered warehouse sorting, operators reduce their sortation team to as few as 10 associates down from large manual crews. Operator-level maintenance means no specialist engineers are required, and training takes less than one day.",
  },
  {
    id: 6,
    name: "How does Unbox compare to other warehouse automation companies?",
    desc: "3PL warehouse automation and e-commerce fulfillment are our primary focus. Unlike generic warehouse robotics solutions adapted from grocery, pharmaceutical or manufacturing verticals, Unbox is purpose-built for parcels upto 20kg and dimensions under 650×500×400mm the precise profile of e-commerce, CEP and fashion fulfillment. The result is a reliable sorting solution engineered for your workflow, not adapted for it.",
  },
];
export const Industry3PLFaqData = [
  {
    id: 1,
    name: "What is 3PL warehouse automation and how does it work?",
    desc: "3PL warehouse automation uses robotic sortation systems, autonomous mobile robots coordinated by the RCS layer for fleet-level swarm intelligence, to handle multi-client parcel sorting simultaneously with 99.99%+ accuracy. Unbox RCS-orchestrated fleet processes 500–20,000 parcels per hour, self-healing at peak with zero downtime.",
    selected: false,
  },
  {
    id: 2,
    name: "Can Unbox handle simultaneous multi-client 3PL operations?",
    desc: "Yes. Unbox accurate robotic sorting segregates simultaneous multi-client flows within a single deployment no cross-contamination, no SLA penalty risk. Scalable warehouse robotics configures per client spec without hardware changes.",
    selected: false,
  },
  {
    id: 3,
    name: "How does Unbox reduce warehouse footprint for 3PL operators?",
    desc: "The Unbox vertical sortation system builds upward using cubic warehouse space up to 2.4m high reducing warehouse footprint by 50–70% versus conventional 3PL warehouse automation, allowing new client onboarding without facility expansion.",
  },
  {
    id: 4,
    name: "How fast can 3PL operators deploy and onboard new contracts?",
    desc: "Modular warehouse automation deploys in 6-9 weeks from contract to live operations, no civil works, no IT dependency, no shutdown. This allows 3PL operators to win and onboard new client contracts faster than competitors using conventional automated parcel sorting systems.",
  },
  {
    id: 5,
    name: "What is the warehouse automation ROI for 3PL deployments?",
    desc: "3PL operators typically achieve warehouse automation ROI within 1–2 years. Primary drivers are 40–60% reduction in sortation labor costs, elimination of SLA penalty costs from mis-sorts, and 2× throughput gain from automated parcel sorting.",
  },
  {
    id: 6,
    name: "How does Unbox compare to other warehouse automation companies for 3PL?",
    desc: "Unlike generic warehouse robotics solutions built for single-client environments, Unbox is purpose-built for the multi-client, multi-vertical complexity of 3PL warehouse automation. Flexible automation for warehouse environments that handles contract volatility without hardware changes.",
  },
];
export const FulfillmentConsolidationFaqData = [
  {
    id: 1,
    name: "How does UnboxSort handle multi-SKU order consolidation?",
    desc: "UnboxSort reads each parcel's SKU and order ID at inbound scan, assigns it to the correct wave in real time, and routes it via SR450 swarm robots to the exact consolidation destination. All items for one order group automatically 100% accuracy regardless of inbound sequence or SKU complexity.",
    selected: false,
  },
  {
    id: 2,
    name: "What throughput can UnboxSort achieve for order consolidation?",
    desc: "UnboxSort scales from 500 to 20,000 parcels per hour within the same deployment. For a typical mid-size fulfillment center, this covers both BAU daily volumes and Black Friday / Diwali peak cycles without adding headcount or hardware.",
    selected: false,
  },
  {
    id: 3,
    name: "How long does deployment take for order consolidation?",
    desc: "From contract to live operations: 3–6 weeks. WMS integration via standard API: 2–3 weeks. No civil works, no shutdown of live operations. Operator training: under one day.",
  },
  {
    id: 4,
    name: "Does UnboxSort integrate with our existing WMS?",
    desc: "Yes. UnboxSort integrates with all major WMS platforms via standard API SAP, Manhattan, Blue Yonder, and custom systems. No custom code required. No IT dependency.",
  },
  {
    id: 5,
    name: "How does Unbox reduce fulfillment center footprint?",
    desc: "The Unbox vertical sortation system builds upward using cubic space up to 2.4m high, recovering 50–70% of floor space compared to conventional conveyor-based consolidation systems. Operators consolidate more orders within their existing building without structural modification.",
  },
  {
    id: 6,
    name: "Can Unbox scale consolidation throughput for peak periods?",
    desc: "Yes. Modular warehouse automation scales fleet capacity from 500 to 20,000 parcels per hour within the same deployment. The swarm robotics system dynamically redistributes load — handling Black Friday, Diwali and end-of-sale spikes without additional headcount or shutdown.",
  },
  {
    id: 7,
    name: "What is the ROI timeline for fulfillment center order consolidation automation?",
    desc: "Fulfillment center operators typically achieve warehouse automation ROI within 6–9 months. Primary drivers include 40–60% reduction in sortation and consolidation labor costs, elimination of re-shipment costs from mis-consolidation, and a 2× throughput gain from automated parcel sorting.",
  },
];

export const ReturnsSortationFaqData = [
  {
    id: 1,
    name: "How does UnboxSort apply disposition rules to returned parcels?",
    desc: "Disposition rules are configured in UnboxSort software per SKU, return reason code and condition assessment outcome. When a return is inducted, the system reads the order ID and condition code, applies the matching rule and routes the parcel to the correct destination with restock, inspect, quarantine or redistribute handled automatically.",
    selected: false,
  },
  {
    id: 2,
    name: "Can UnboxSort handle returns from multiple clients or brands simultaneously?",
    desc: "Yes. UnboxSort handles simultaneous multi-client return flows with complete segregation where each client's returns are routed to dedicated disposition destinations with full traceability. Ideal for 3PL operators managing returns across multiple e-commerce clients.",
    selected: false,
  },
  {
    id: 3,
    name: "What visibility does UnboxSort provide into returns inventory?",
    desc: "The UnboxSort WMS integration provides a live returns dashboard showing processing status per SKU, condition and disposition path in real time. Finance, merchandising and customer service teams have instant visibility into returns inventory without waiting for manual processing completion.",
  },
  {
    id: 4,
    name: "How does UnboxSort handle post-festive return surges?",
    desc: "The modular design scales return processing capacity without structural changes or additional headcount. The same UnboxSort deployment that handles daily returns volume can manage 3–5x peak return surges by deploying additional robots within the existing system.",
  },
];

export const MidMileSortationFaqData = [
  {
    id: 1,
    name: "How does UnboxSort handle changing destination patterns in a mid-mile hub?",
    desc: "Destinations are software-defined in UnboxSort and adding, removing or changing routes requires no hardware modification. The operations team updates destination mapping via the dashboard. Robots reroute immediately on the next inbound parcel.",
    selected: false,
  },
  {
    id: 2,
    name: "What is the maximum destination density UnboxSort can handle?",
    desc: "UnboxSort handles 2,000+ simultaneous sort destinations within a compact vertical footprint. This covers the full destination range of most mid-mile sort centers including postal code, hub code and carrier lane combinations.",
    selected: false,
  },
  {
    id: 3,
    name: "How does UnboxSort perform during peak inbound surges?",
    desc: "The swarm dynamically load-balances across the entire robot fleet increasing or decreasing individual robot workload based on inbound rate. Throughput remains stable from 500 to 20,000 parcels per hour without manual intervention.",
  },
  {
    id: 4,
    name: "What happens if the sort center needs to expand its network coverage?",
    desc: "Network expansion is handled entirely through software. New destination codes, routes or hub connections are added via dashboard with no additional hardware, no structural changes and no shutdown.",
  },
];

export const OutboundSortationFaqData = [
  {
    id: 1,
    name: "How does UnboxSort handle real-time carrier plan changes?",
    desc: "UnboxSort reads carrier plan data directly from your WMS and TMS via API. When a carrier plan changes, the software automatically reassigns affected parcels to updated lanes in real time with no manual reprogram, no system downtime and no mis-routes.",
    selected: false,
  },
  {
    id: 2,
    name: "Can UnboxSort manage multiple carriers simultaneously?",
    desc: "Yes. UnboxSort manages simultaneous multi-carrier outbound lanes with independent fill rates and zero cross-contamination between carrier batches. Lane configurations are software-defined with no hardware changes required for different carrier setups.",
    selected: false,
  },
  {
    id: 3,
    name: "What happens if a robot fails during a dispatch window?",
    desc: "The UnboxSort swarm self-heals in under 2 seconds. If any robot goes offline, remaining robots reroute and redistribute the load automatically. No single robot is a single point of failure. Dispatch operations continue without interruption.",
  },
  {
    id: 4,
    name: "What is the throughput range for outbound sortation?",
    desc: "UnboxSort scales from 500 to 20,000 parcels per hour within the same deployment. For most fulfillment centers, this covers both daily BAU dispatch and peak season volumes without adding hardware or headcount.",
  },
];

export const ClickAndCollectFaqData = [
  {
    id: 1,
    name: "How does UnboxSort handle multiple pickup windows and store locations?",
    desc: "UnboxSort software groups orders by store and pickup window automatically — reading order data from your WMS. When a pickup window opens, relevant orders are pre-sorted and staged. Staff are notified via WMS integration. No manual grouping or staging required.",
    selected: false,
  },
  {
    id: 2,
    name: "Can UnboxSort run Click & Collect alongside core outbound fulfillment?",
    desc: "Yes. UnboxSort handles simultaneous C&C sortation and outbound fulfillment dispatch within the same deployment, with complete lane isolation between flows. No cross-contamination. No operational conflict.",
    selected: false,
  },
  {
    id: 3,
    name: "What store destinations can UnboxSort manage simultaneously?",
    desc: "Up to 2,000+ store and pickup destinations simultaneously within a compact vertical footprint. Software-defined destinations — adding new stores or pickup points requires no hardware changes.",
  },
  {
    id: 4,
    name: "How quickly can UnboxSort deploy in an existing DC?",
    desc: "3–6 weeks from contract to live operations. No civil works, no structural changes, no operational shutdown. WMS integration in 2–3 weeks via standard API.",
  },
];

export const B2BStoreFulfillmentFaqData = [
  {
    id: 1,
    name: "How does UnboxSort handle store-wise consolidation across hundreds of store codes?",
    desc: "Each store code is a software-defined destination in UnboxSort. Items are sorted to their exact store destination automatically based on order data from the WMS. Adding new stores requires only a software configuration with no hardware changes.",
    selected: false,
  },
  {
    id: 2,
    name: "Can UnboxSort align store replenishment to delivery schedules and vehicle routes?",
    desc: "Yes. Wave planning in UnboxSort is driven by delivery schedule and route data from the WMS. Store orders are consolidated and staged by vehicle and delivery window automatically so dispatch teams have route-ready batches without manual planning.",
    selected: false,
  },
  {
    id: 3,
    name: "How does UnboxSort handle SKU variants for fashion and apparel replenishment?",
    desc: "UnboxSort handles size, colour and variant sortation per store planogram requirement. Each variant is treated as a unique sort destination ensuring the exact mix of sizes and styles reaches each store as planned.",
  },
  {
    id: 4,
    name: "What scale of retail network can UnboxSort support?",
    desc: "UnboxSort supports 2,000+ simultaneous store destinations within a compact vertical footprint. Software-defined destination mapping means the system scales from 100 stores to 2,000+ as the retail network grows with no hardware changes required.",
  },
];

export const DeliveryHubLastMileFaqData = [
  {
    id: 1,
    name: "How does UnboxSort sort parcels by route and pin code in a delivery hub?",
    desc: "Each delivery route and pin-code area is a software-defined destination in UnboxSort. When parcels are inducted at hub inbound, delivery labels are scanned and each parcel is automatically routed to its driver and route staging destination by SR450 robots. No manual sortation required.",
    selected: false,
  },
  {
    id: 2,
    name: "Can UnboxSort run overnight pre-sort for morning dispatch?",
    desc: "Yes. UnboxSort operates continuously running inbound parcel sortation overnight so that when drivers arrive in the morning, route-sorted batches are already staged per driver and vehicle. Morning dispatch begins immediately with no sorting queue.",
    selected: false,
  },
  {
    id: 3,
    name: "How does UnboxSort fit within constrained urban hub footprints?",
    desc: "UnboxSort uses vertical 3D sortation building upward rather than expanding horizontally. This recovers 50–70% of hub floor footprint compared to conventional conveyor lane sortation. Most urban hubs can deploy UnboxSort within their existing building without structural changes.",
  },
  {
    id: 4,
    name: "What is the throughput range for last-mile hub sortation?",
    desc: "UnboxSort scales from 500 to 20,000 parcels per hub shift. For most urban delivery hubs, this covers both daily volume and seasonal peak surges as e-commerce parcel volumes grow 15–20% annually.",
  },
];

export const IndustryCEPFaqData = [
  {
    id: 1,
    name: "What is CEP sortation automation and how does it work?",
    desc: "CEP sortation automation uses robotic sortation systems — autonomous mobile robots coordinated by the RCS layer for fleet-level swarm intelligence — to automatically sort courier, express and parcel deliveries to last-mile destinations. UnboxSort AI-powered warehouse sorting processes 500–20,000 parcels per hour with zero single points of failure.",
    selected: false,
  },
  {
    id: 2,
    name: "How does Unbox handle last-mile hub operations for CEP networks?",
    desc: "Unbox 3D robotic sorting deploys within existing CEP hub footprints without civil works. Automated parcel sorting routes inbound line-haul parcels to 2,000+ last-mile destinations automatically — the RCS-orchestrated fleet self-heals in under 2 seconds if any robot goes offline.",
    selected: false,
  },
  {
    id: 3,
    name: "How does Unbox reduce CEP hub footprint?",
    desc: "The Unbox vertical sortation system uses cubic hub space up to 2.4m high rather than expanding horizontally reducing hub footprint by 50–70% versus conventional CEP sortation automation conveyor systems. Automated parcel sorting within existing building constraints.",
  },
  {
    id: 4,
    name: "Is Unbox a scalable sortation solution for CEP peak volumes?",
    desc: "Yes. Modular warehouse automation scales from 500 to 20,000 parcels per hour within the same hub deployment. The RCS-coordinated fleet dynamically redistributes parcel load handling Black Friday sale, New Year's sale, and End of Season sale volume spikes without additional headcount or shutdown.",
  },
  {
    id: 5,
    name: "What is the warehouse automation ROI timeline for CEP hub deployments?",
    desc: "CEP operators typically achieve warehouse automation ROI within 1–2 years. Primary drivers are 40–60% reduction in hub sortation labor costs, elimination of mis-delivery penalty costs from 99.99%+ robotic sorting accuracy, and 2× throughput capacity gain.",
  },
  {
    id: 6,
    name: "How does Unbox compare to conventional conveyor sortation systems for CEP?",
    desc: "Unlike legacy conveyor-based CEP sortation, Unbox is a modular warehouse automation system with no single point of failure. The RCS-orchestrated fleet self-heals instantly — legacy conveyors stop the entire operation when one component fails. Unbox also reduces hub footprint by 50–70% vs conventional systems.",
  },
];
