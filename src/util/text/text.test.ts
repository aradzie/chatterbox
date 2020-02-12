import test from "ava";
import { grammars } from "../../grammar";
import { parse } from "./parse";
import { print } from "./print";

for (const { name, grammar } of grammars) {
  test(`print and parse grammar [${name}]`, (t) => {
    const copy = parse(print(grammar));
    t.deepEqual(copy, grammar);
  });
}
