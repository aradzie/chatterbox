import test from "ava";
import { format } from "./format";

test("join seq literals and refs", (t) => {
  t.deepEqual(
    format({
      rule: {
        start: {
          seq: [{ ref: "a" }, "-", { ref: "b" }, "-", { seq: [{ ref: "c" }] }],
        },
      },
    }),
    {
      rule: {
        start: "<a>-<b>-<c>",
      },
    },
  );
});

test("join alt refs", (t) => {
  t.deepEqual(
    format({
      rule: {
        start: {
          alt: [{ ref: "a" }, { ref: "b" }, { ref: "c" }],
        },
      },
    }),
    {
      rule: {
        start: "<a|b|c>",
      },
    },
  );
});
