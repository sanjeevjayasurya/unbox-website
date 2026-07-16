/**
 * Parse TipTap JSON from WP meta (string or object).
 * @param {unknown} raw
 * @returns {{ type: "doc", content?: unknown[] } | null}
 */
export function parseContentJson(raw) {
  if (raw == null || raw === "") return null;

  let value = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return null;
    }
  }

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    value.type === "doc"
  ) {
    return value;
  }

  return null;
}

/**
 * Flatten TipTap doc text nodes for excerpts / SEO fallbacks.
 * @param {unknown} doc
 * @returns {string}
 */
export function tiptapToPlainText(doc) {
  if (!doc || typeof doc !== "object") return "";

  const parts = [];

  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node.text === "string") {
      parts.push(node.text);
    }
    if (node.content) walk(node.content);
  };

  walk(doc);
  return parts.join("").replace(/\s+/g, " ").trim();
}
