import { Alt, Grammar, isAlt, isLit, isOpt, isSeq, Opt, P, RuleMap, Seq } from "../types";
import { isEmpty, isSimple } from "./util";

/**
 * Returns an optimized copy of the given grammar.
 *
 * - Empty `seq`s are removed.
 * - Empty `alts`s are removed.
 * - Consecutive `seq`s are joined.
 * - Nested `seq`s are flattened.
 * - Nested `alt`s are flattened.
 * - Deterministic `opt`s are removed.
 */
export function optimize(grammar: Grammar): Grammar {
  const { rule, start } = grammar;
  const result: RuleMap = Object.fromEntries(
    Object.entries(rule).map(([name, rule]) => [name, visit(rule)]),
  );
  if (start != null) {
    return { rule: result, start };
  } else {
    return { rule: result };
  }
}

function visit(p: P): P {
  if (isOpt(p)) {
    return visitOpt(p);
  }

  if (isSeq(p)) {
    return visitSeq(p);
  }

  if (isAlt(p)) {
    return visitAlt(p);
  }

  return p;
}

function visitOpt(v: Opt): P {
  const { f, opt } = v;
  if (f == 1) {
    return visit(opt);
  } else {
    return { f, opt: visit(opt) };
  }
}

function visitSeq(v: Seq): P {
  const seq: P[] = [];
  step(v);
  if (isSimple(v) && seq.length == 1) {
    return seq[0];
  } else {
    return { ...v, seq };
  }

  function step(p: Seq): void {
    for (const child of p.seq) {
      if (isSeq(child) && isSimple(child)) {
        step(child);
      } else {
        push(visit(child));
      }
    }
  }

  function push(p: P): void {
    if (!isEmpty(p)) {
      if (isLit(p) && seq.length > 0 && isLit(seq[seq.length - 1])) {
        seq.push(seq.pop() + p);
      } else {
        seq.push(p);
      }
    }
  }
}

function visitAlt(v: Alt): P {
  const alt: P[] = [];
  step(v);
  if (isSimple(v) && alt.length == 1) {
    return alt[0];
  } else {
    return { ...v, alt };
  }

  function step(p: Alt): void {
    for (const child of p.alt) {
      if (isAlt(child) && isSimple(child)) {
        step(child);
      } else {
        push(visit(child));
      }
    }
  }

  function push(p: P): void {
    if (!isEmpty(p)) {
      alt.push(p);
    }
  }
}
