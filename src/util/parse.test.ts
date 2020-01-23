import test from "ava";
import { parse } from "./parse";

test("parse literals and refs", (t) => {
  t.deepEqual(
    parse({
      rule: {
        start: "(<a>-<b>-<c>)",
        a: "a",
        b: "b",
        c: "c",
      },
    }),
    {
      rule: {
        start: {
          seq: ["(", { ref: "a" }, "-", { ref: "b" }, "-", { ref: "c" }, ")"],
        },
        a: "a",
        b: "b",
        c: "c",
      },
    },
  );

  t.deepEqual(
    parse({
      rule: {
        start: {
          chance: 0.5,
          seq: ["-<a>"],
        },
        a: "a",
      },
    }),
    {
      rule: {
        start: {
          chance: 0.5,
          seq: [
            "-",
            {
              ref: "a",
            },
          ],
        },
        a: "a",
      },
    },
  );
});

test("parse literals and ref alts", (t) => {
  t.deepEqual(
    parse({
      rule: {
        start: "x<a|b>y",
        a: "a",
        b: "b",
      },
    }),
    {
      rule: {
        start: {
          seq: ["x", { alt: [{ ref: "a" }, { ref: "b" }] }, "y"],
        },
        a: "a",
        b: "b",
      },
    },
  );
});

test("parse refs", (t) => {
  t.deepEqual(
    parse({
      rule: {
        start: {
          alt: ["<a>", "<b>"],
        },
        a: "a",
        b: "b",
      },
    }),
    {
      rule: {
        start: {
          alt: [{ ref: "a" }, { ref: "b" }],
        },
        a: "a",
        b: "b",
      },
    },
  );
});
