import test from "ava";
import { parse, SyntaxError } from "./parse";

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

test("parse opt", (t) => {
  t.deepEqual(parse(`start -> [ "a" ];`), { rule: { start: { f: 0.5, opt: "a" } } });
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
  t.deepEqual(parse(`start -> [("a" | "b") "c"];`), {
    rule: { start: { f: 0.5, opt: { seq: [{ alt: ["a", "b"] }, "c"] } } },
  });
  t.deepEqual(parse(`start -> (["a" | "b"]) "c";`), {
    rule: { start: { seq: [{ f: 0.5, opt: { alt: ["a", "b"] } }, "c"] } },
  });
  t.deepEqual(parse(`start -> (["a"] | "b") "c";`), {
    rule: { start: { seq: [{ alt: [{ f: 0.5, opt: "a" }, "b"] }, "c"] } },
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

test("syntax error", (t) => {
  const { location } = t.throws<SyntaxError>(
    () => {
      parse(" a -> ");
    },
    {
      name: "SyntaxError",
      message: 'Expected "(", "[", literal, or ref but end of input found.',
    },
  );
  t.deepEqual(location, {
    start: {
      line: 1,
      column: 7,
      offset: 6,
    },
    end: {
      line: 1,
      column: 7,
      offset: 6,
    },
  });
});
