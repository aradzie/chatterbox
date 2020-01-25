import test from "ava";
import { parse } from "./parser";

test("parse empty", (t) => {
  t.deepEqual(parse(``), { rule: {} });
  t.deepEqual(parse(` `), { rule: {} });
});

test("parse literal", (t) => {
  t.deepEqual(parse(`start -> "literal";`), { rule: { start: "literal" } });
});

test("parse ref", (t) => {
  t.deepEqual(parse(`start -> <id>;`), { rule: { start: { ref: "id" } } });
});

test("parse seq", (t) => {
  t.deepEqual(parse(`start -> "a" "b" "c";`), { rule: { start: { seq: ["a", "b", "c"] } } });
});

test("parse alt", (t) => {
  t.deepEqual(parse(`start -> "a" | "b" | "c";`), { rule: { start: { alt: ["a", "b", "c"] } } });
});

test("priorities", (t) => {
  t.deepEqual(parse(`start -> ("a" | "b") "c";`), {
    rule: { start: { seq: [{ alt: ["a", "b"] }, "c"] } },
  });
  t.deepEqual(parse(`start -> "a" ("b" | "c");`), {
    rule: { start: { seq: ["a", { alt: ["b", "c"] }] } },
  });
  t.deepEqual(parse(`start -> ( ( "a" | ( "b" | "c" ) ) );`), {
    rule: { start: { alt: ["a", { alt: ["b", "c"] }] } },
  });
});

test("parse rules", (t) => {
  t.deepEqual(parse(` a -> "a" ; b -> "b" ; `), {
    rule: {
      a: "a",
      b: "b",
    },
  });
});
