import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  parseContentJson,
  tiptapToPlainText,
} from "./wordpressContent.js";

describe("parseContentJson", () => {
  it("returns null for empty input", () => {
    assert.equal(parseContentJson(null), null);
    assert.equal(parseContentJson(""), null);
  });

  it("parses a TipTap doc string", () => {
    const doc = {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Hi" }] }],
    };
    assert.deepEqual(parseContentJson(JSON.stringify(doc)), doc);
  });

  it("accepts an already-parsed TipTap doc object", () => {
    const doc = { type: "doc", content: [] };
    assert.deepEqual(parseContentJson(doc), doc);
  });

  it("rejects non-doc JSON", () => {
    assert.equal(parseContentJson('{"type":"paragraph"}'), null);
    assert.equal(parseContentJson("not-json"), null);
  });
});

describe("tiptapToPlainText", () => {
  it("walks text nodes", () => {
    const doc = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Hello" },
            { type: "text", text: " world" },
          ],
        },
      ],
    };
    assert.equal(tiptapToPlainText(doc), "Hello world");
  });

  it("returns empty string for non-objects", () => {
    assert.equal(tiptapToPlainText(null), "");
    assert.equal(tiptapToPlainText("<p>Hi</p>"), "");
  });
});
