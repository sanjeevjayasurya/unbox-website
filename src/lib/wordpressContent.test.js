import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseContentJson } from "./wordpressContent.js";

describe("parseContentJson", () => {
  it("parses the TipTap document stored in WordPress content_json meta", () => {
    const document = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Loaded blog content" }],
        },
      ],
    };

    assert.deepEqual(parseContentJson(JSON.stringify(document)), document);
  });

  it("rejects empty, malformed, and non-document content", () => {
    assert.equal(parseContentJson(""), null);
    assert.equal(parseContentJson("not-json"), null);
    assert.equal(parseContentJson('{"type":"paragraph"}'), null);
  });
});
