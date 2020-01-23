import test from "ava";
import { generate } from "./generate";

test("generate", (t) => {
  t.is(
    generate({
      rule: {
        start: "only",
      },
    }),
    "only",
  );
  t.is(
    generate({
      rule: {
        start: {
          seq: [{ ref: "a" }, { ref: "b" }],
        },
        a: "one",
        b: "two",
      },
    }),
    "onetwo",
  );
});
