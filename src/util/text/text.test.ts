import test from "ava";
import { grammars } from "../../grammar";
import { parse } from "./parse";
import { print } from "./print";

for (const { name, grammar } of [grammars[0]]) {
  test(`print and parse [${name}]`, (t) => {
    const copy = parse(print(grammar));
    t.deepEqual(copy, grammar);
  });
}
