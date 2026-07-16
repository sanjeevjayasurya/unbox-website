/**
 * Parse a TipTap document stored as WordPress JSON metadata.
 *
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
