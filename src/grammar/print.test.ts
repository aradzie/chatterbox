import test from "ava";
import { print } from "./print.js";

test("print", (t) => {
  t.snapshot(
    print({
      rule: {
        start: "only",
      },
    }),
  );

  t.snapshot(
    print({
      rule: {
        start: { seq: ["a", "b"] },
      },
    }),
  );

  t.snapshot(
    print({
      rule: {
        start: { alt: ["a", "b"] },
      },
    }),
  );

  t.snapshot(
    print({
      rule: {
        start: { seq: [{ alt: ["a", "b"] }, { alt: ["c", "d"] }] },
      },
    }),
  );

  t.snapshot(
    print({
      rule: {
        start: {
          cls: "xyz",
          span: { seq: [{ alt: ["a", "b"] }, { alt: ["c", "d"] }] },
        },
      },
    }),
  );
});
