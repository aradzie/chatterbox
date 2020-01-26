import test from "ava";
import { grammars } from "../../grammar";
import { parse } from "./parse";
import { print } from "./print";

test(`print and parse example grammar`, (t) => {
  const { grammar } = grammars[0];
  const copy = parse(print(grammar));
  t.deepEqual(copy, grammar);
});

for (const { name, grammar } of grammars) {
  test.skip(`print and parse grammar [${name}]`, (t) => {
    const copy = parse(print(grammar));
    t.deepEqual(copy, grammar);
  });
}
