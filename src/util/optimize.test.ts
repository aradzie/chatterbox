import test from "ava";
import { optimize } from "./optimize";

test("flatten seqs", (t) => {
  t.deepEqual(
    optimize({
      rule: {
        start: {
          chance: 0.5,
          seq: ["a", "b", { seq: ["c", "d", { chance: 0.5, seq: ["e", "f"] }, "g", "h"] }],
        },
      },
    }),
    {
      rule: {
        start: {
          chance: 0.5,
          seq: ["abcd", { chance: 0.5, seq: ["ef"] }, "gh"],
        },
      },
    },
  );
});

test("flatten alts", (t) => {
  t.deepEqual(
    optimize({
      rule: {
        start: {
          chance: 0.5,
          alt: ["a", "b", { alt: ["c", "d", { chance: 0.5, alt: ["e", "f"] }, "g", "h"] }],
        },
      },
    }),
    {
      rule: {
        start: {
          chance: 0.5,
          alt: ["a", "b", "c", "d", { chance: 0.5, alt: ["e", "f"] }, "g", "h"],
        },
      },
    },
  );
});

test("flatten trivial nested seqs and alts", (t) => {
  t.deepEqual(
    optimize({
      rule: {
        start: {
          chance: 0.5,
          seq: [{ alt: [{ seq: [{ alt: [{ ref: "a" }] }] }] }],
        },
      },
    }),
    {
      rule: {
        start: {
          chance: 0.5,
          seq: [{ ref: "a" }],
        },
      },
    },
  );
});

test("remove empty seqs and alts", (t) => {
  t.deepEqual(
    optimize({
      rule: {
        start: {
          seq: [{ seq: [{ seq: [] }] }, { seq: [] }, { alt: [{ alt: [] }] }, { alt: [] }],
        },
      },
    }),
    {
      rule: {
        start: {
          seq: [],
        },
      },
    },
  );
});
