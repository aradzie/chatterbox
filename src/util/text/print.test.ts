import test from "ava";
import { print } from "./print";

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
});
