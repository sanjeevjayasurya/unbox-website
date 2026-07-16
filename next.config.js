function getWordpressImagePattern() {
  const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!wpApiUrl) return null;
  try {
    const { protocol, hostname, port } = new URL(wpApiUrl);
    return {
      protocol: protocol.replace(":", ""),
      hostname,
      ...(port ? { port } : {}),
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

const wordpressImagePattern = getWordpressImagePattern();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The original CRA app did not render inside React.StrictMode. Strict Mode's
  // double-invoked effects spin up duplicate Lenis smooth-scroll instances /
  // RAF loops in dev, which makes scrolling laggy. Keep parity with the source app.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unboxadmin.4tysixapplabs.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "68.178.169.107",
        port: "5007",
        pathname: "/**",
      },
      ...(wordpressImagePattern ? [wordpressImagePattern] : []),
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/about/", destination: "/about-us", permanent: true },
      { source: "/solutions", destination: "/solutions-overview", permanent: true },
      { source: "/solutions/", destination: "/solutions-overview", permanent: true },
      { source: "/case-studies", destination: "/case-study", permanent: true },
      { source: "/case-studies/", destination: "/case-study", permanent: true },
      { source: "/terms-of-uses", destination: "/terms-of-services", permanent: true },
      { source: "/terms-of-uses/", destination: "/terms-of-services", permanent: true },
      { source: "/contact", destination: "/get-in-touch", permanent: true },
      { source: "/contact/", destination: "/get-in-touch", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/", destination: "/blogs", permanent: true },
      { source: "/open-postion-details", destination: "/careers", permanent: true },
      { source: "/open-postion-form", destination: "/careers", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        // Keep the viewBox so inline SVGs scale to any CSS
                        // width/height. SVGO strips it when width/height are
                        // present, which crops logos on smaller screens.
                        removeViewBox: false,
                        // Do NOT minify ids to a/b/... SVGO would give every
                        // SVG the same ids, so multiple inline SVGs on one page
                        // collide (e.g. every client logo painted Bonzai's
                        // embedded image via the shared url(#a) reference).
                        cleanupIds: false,
                      },
                    },
                  },
                  {
                    // Namespace ids per source file so internal
                    // pattern/image/mask references stay unique across logos.
                    name: "prefixIds",
                    params: {
                      delim: "_",
                      prefix: (_node, info) => {
                        const filePath = (info && info.path) || "";
                        const base = filePath
                          .split("/")
                          .pop()
                          .replace(/\.svg$/i, "");
                        return "svg_" + base.replace(/[^a-zA-Z0-9]/g, "");
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: "asset/resource",
    });

    return config;
  },
};

module.exports = nextConfig;
