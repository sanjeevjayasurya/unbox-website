const PLACEHOLDER_IMAGE = "/images/resource-placeholder.svg";
const SAMPLE_PDF = "/sample-case-study.pdf";

const LOREM_HTML = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h2>Key takeaways</h2>
<p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
<ul>
  <li>Integer in mauris eu nibh euismod gravida.</li>
  <li>Duis ac tellus et risus vulputate vehicula.</li>
  <li>Donec vitae dolor nulla malesuada.</li>
</ul>
<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
`.trim();

const LOREM_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const MOCK_BLOGS = [
  {
    id: "mock-blog-1",
    slug: "lorem-ipsum-robotic-sortation",
    title: "Lorem Ipsum: Scaling Robotic Sortation",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    image: PLACEHOLDER_IMAGE,
    category: "Technology",
    type: "Technology",
    date: "2026-03-12T10:00:00.000Z",
    createdAt: "2026-03-12T10:00:00.000Z",
    updatedAt: "2026-03-12T10:00:00.000Z",
    quoteMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit — automation that adapts with growth.",
    quoteOwner: "Alex Morgan",
    quoteOwnerImage: PLACEHOLDER_IMAGE,
    quoteRole: "VP of Operations",
    redirectUrl: "",
    featured: true,
  },
  {
    id: "mock-blog-2",
    slug: "dolor-sit-warehouse-efficiency",
    title: "Dolor Sit Amet: Warehouse Efficiency Playbook",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    image: PLACEHOLDER_IMAGE,
    category: "Operations",
    type: "Operations",
    date: "2026-02-28T10:00:00.000Z",
    createdAt: "2026-02-28T10:00:00.000Z",
    updatedAt: "2026-02-28T10:00:00.000Z",
    quoteMessage: "",
    quoteOwner: "",
    quoteOwnerImage: "",
    quoteRole: "",
    redirectUrl: "",
    featured: false,
  },
  {
    id: "mock-blog-3",
    slug: "consectetur-last-mile-insights",
    title: "Consectetur: Last-Mile Sortation Insights",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    image: PLACEHOLDER_IMAGE,
    category: "Logistics",
    type: "Logistics",
    date: "2026-01-18T10:00:00.000Z",
    createdAt: "2026-01-18T10:00:00.000Z",
    updatedAt: "2026-01-18T10:00:00.000Z",
    quoteMessage: "",
    quoteOwner: "",
    quoteOwnerImage: "",
    quoteRole: "",
    redirectUrl: "",
    featured: false,
  },
  {
    id: "mock-blog-4",
    slug: "adipiscing-fulfillment-trends",
    title: "Adipiscing Elit: Fulfillment Trends for 2026",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    image: PLACEHOLDER_IMAGE,
    category: "Insights",
    type: "Insights",
    date: "2025-12-05T10:00:00.000Z",
    createdAt: "2025-12-05T10:00:00.000Z",
    updatedAt: "2025-12-05T10:00:00.000Z",
    quoteMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    quoteOwner: "Jordan Lee",
    quoteOwnerImage: PLACEHOLDER_IMAGE,
    quoteRole: "Head of Supply Chain",
    redirectUrl: "",
    featured: false,
  },
  {
    id: "mock-blog-5",
    slug: "tempor-incididunt-automation",
    title: "Tempor Incididunt: Automation Without Disruption",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    image: PLACEHOLDER_IMAGE,
    category: "Product",
    type: "Product",
    date: "2025-11-20T10:00:00.000Z",
    createdAt: "2025-11-20T10:00:00.000Z",
    updatedAt: "2025-11-20T10:00:00.000Z",
    quoteMessage: "",
    quoteOwner: "",
    quoteOwnerImage: "",
    quoteRole: "",
    redirectUrl: "",
    featured: false,
  },
];

export const MOCK_CASE_STUDIES = [
  {
    id: "mock-cs-1",
    slug: "lorem-ipsum-3pl-transformation",
    title: "Lorem Ipsum: 3PL Throughput Transformation",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    media: PLACEHOLDER_IMAGE,
    mediaType: "image",
    thumbnail_url: PLACEHOLDER_IMAGE,
    image: PLACEHOLDER_IMAGE,
    type: "3PL",
    tags: "3PL",
    date: "2026-03-01T10:00:00.000Z",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
    clientName: "Acme Logistics",
    clientMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our sortation throughput improved while footprint stayed the same.",
    clientImage: PLACEHOLDER_IMAGE,
    pdf: SAMPLE_PDF,
    read_time: 8,
    totalPages: 12,
    featured: true,
  },
  {
    id: "mock-cs-2",
    slug: "dolor-sit-ecommerce-fulfillment",
    title: "Dolor Sit: E-commerce Fulfillment at Peak",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    media: PLACEHOLDER_IMAGE,
    mediaType: "image",
    thumbnail_url: PLACEHOLDER_IMAGE,
    image: PLACEHOLDER_IMAGE,
    type: "E-commerce",
    tags: "Retail",
    date: "2026-02-10T10:00:00.000Z",
    createdAt: "2026-02-10T10:00:00.000Z",
    updatedAt: "2026-02-10T10:00:00.000Z",
    clientName: "Northstar Retail",
    clientMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    clientImage: PLACEHOLDER_IMAGE,
    pdf: SAMPLE_PDF,
    read_time: 6,
    totalPages: 10,
    featured: false,
  },
  {
    id: "mock-cs-3",
    slug: "consectetur-returns-sortation",
    title: "Consectetur: Returns Sortation Case Study",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    media: PLACEHOLDER_IMAGE,
    mediaType: "image",
    thumbnail_url: PLACEHOLDER_IMAGE,
    image: PLACEHOLDER_IMAGE,
    type: "Returns",
    tags: "Returns",
    date: "2026-01-08T10:00:00.000Z",
    createdAt: "2026-01-08T10:00:00.000Z",
    updatedAt: "2026-01-08T10:00:00.000Z",
    clientName: "Parcel Hub Co.",
    clientMessage: "Excepteur sint occaecat cupidatat non proident.",
    clientImage: PLACEHOLDER_IMAGE,
    pdf: SAMPLE_PDF,
    read_time: 7,
    totalPages: 9,
    featured: false,
  },
  {
    id: "mock-cs-4",
    slug: "adipiscing-delivery-hub",
    title: "Adipiscing: Delivery Hub Last-Mile Wins",
    description: LOREM_DESCRIPTION,
    content: LOREM_HTML,
    media: PLACEHOLDER_IMAGE,
    mediaType: "image",
    thumbnail_url: PLACEHOLDER_IMAGE,
    image: PLACEHOLDER_IMAGE,
    type: "Last Mile",
    tags: "Delivery",
    date: "2025-12-15T10:00:00.000Z",
    createdAt: "2025-12-15T10:00:00.000Z",
    updatedAt: "2025-12-15T10:00:00.000Z",
    clientName: "SwiftLast Mile",
    clientMessage: "Sed ut perspiciatis unde omnis iste natus error sit.",
    clientImage: PLACEHOLDER_IMAGE,
    pdf: SAMPLE_PDF,
    read_time: 5,
    totalPages: 8,
    featured: false,
  },
];

function paginate(items, page = 1, limit = 3) {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Number(limit) || 3);
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / safeLimit));
  const start = (safePage - 1) * safeLimit;
  return {
    items: items.slice(start, start + safeLimit),
    page: safePage,
    pages,
    total,
  };
}

export function getMockBlogs(page = 1, limit = 3) {
  const { items, page: currentPage, pages, total } = paginate(
    MOCK_BLOGS,
    page,
    limit,
  );
  return { blogs: items, page: currentPage, pages, total };
}

export function getMockBlogBySlug(slug) {
  const blog = MOCK_BLOGS.find((item) => item.slug === slug);
  return blog ? { blog } : null;
}

export function getMockFeaturedBlog() {
  const blog = MOCK_BLOGS.find((item) => item.featured) || MOCK_BLOGS[0];
  return { blog };
}

export function getMockRecentBlogs(excludeSlug) {
  const recentBlogs = MOCK_BLOGS.filter((item) => item.slug !== excludeSlug).slice(
    0,
    3,
  );
  return { recentBlogs };
}

export function getMockCaseStudies(page = 1, limit = 3) {
  const { items, page: currentPage, pages, total } = paginate(
    MOCK_CASE_STUDIES,
    page,
    limit,
  );
  return { caseStudies: items, page: currentPage, pages, total };
}

export function getMockCaseStudyBySlug(slug) {
  const caseStudy = MOCK_CASE_STUDIES.find((item) => item.slug === slug);
  return caseStudy ? { caseStudy } : null;
}

export function getMockFeaturedCaseStudy() {
  const caseStudy =
    MOCK_CASE_STUDIES.find((item) => item.featured) || MOCK_CASE_STUDIES[0];
  return { caseStudy };
}
