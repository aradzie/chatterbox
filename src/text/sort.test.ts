import test from "ava";
import { sort } from "./sort.js";

test("trivial", (t) => {
  t.deepEqual(sort({ rule: {} }), { rule: {} });
  t.deepEqual(sort({ rule: { start: "a" } }), { rule: { start: "a" } });
  t.deepEqual(sort({ rule: { start: "a", other: "b" } }), {
    rule: { start: "a", other: "b" },
  });
});

test("sort topologically", (t) => {
  const grammar = { rule: { other: "a", start: { ref: "other" } } };
  const sorted = sort(grammar);
  t.deepEqual(sorted, grammar);
  t.deepEqual(Object.keys(grammar.rule), ["other", "start"]);
  t.deepEqual(Object.keys(sorted.rule), ["start", "other"]);
});

test("with cycle", (t) => {
  const grammar = {
    rule: { start: { ref: "other" }, other: { ref: "start" } },
  };
  const sorted = sort(grammar);
  t.deepEqual(sorted, grammar);
});
