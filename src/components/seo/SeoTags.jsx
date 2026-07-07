import JsonLd from "./JsonLd";

/**
 * Server component that emits per-page SEO side-effects that the Next.js
 * Metadata API cannot express: JSON-LD structured data and an LCP image
 * preload. React hoists the <link> into <head>.
 */
export default function SeoTags({ meta }) {
  if (!meta) return null;

  return (
    <>
      <JsonLd schema={meta.schema} />
      {meta.lcpImage ? (
        <link
          rel="preload"
          as="image"
          href={meta.lcpImage}
          fetchPriority="high"
        />
      ) : null}
    </>
  );
}
