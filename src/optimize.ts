import {
  type Alt,
  type Grammar,
  isAlt,
  isLit,
  isOpt,
  isSeq,
  isSpan,
  type Opt,
  type P,
  type RuleMap,
  type Seq,
  type Span,
} from "./ast.js";

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
  const { rule } = grammar;
  const result: RuleMap = Object.fromEntries(
    Object.entries(rule).map(([name, rule]) => [name, visit(rule)]),
  );
  return { rule: result };
}

function visit(p: P): P {
  if (isSpan(p)) {
    return visitSpan(p);
  }

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

function visitSpan(v: Span): P {
  const { cls, span } = v;
  return { cls, span: visit(span) };
}

function visitOpt(v: Opt): P {
  const { f, opt } = v;
  if (f === 1) {
    return visit(opt);
  } else {
    return { f, opt: visit(opt) };
  }
}

function visitSeq(v: Seq): P {
  const seq: P[] = [];
  step(v);
  if (seq.length === 1) {
    return seq[0];
  } else {
    return { ...v, seq };
  }

  function step(p: Seq): void {
    for (const child of p.seq) {
      if (isSeq(child)) {
        step(child);
      } else {
        push(visit(child));
      }
    }
  }

  function push(p: P): void {
    if (!isEmpty(p)) {
      if (isLit(p) && seq.length > 0 && isLit(seq[seq.length - 1])) {
        seq.push(String(seq.pop()) + p);
      } else {
        seq.push(p);
      }
    }
  }
}

function visitAlt(v: Alt): P {
  const alt: P[] = [];
  step(v);
  if (alt.length === 1) {
    return alt[0];
  } else {
    return { ...v, alt };
  }

  function step(p: Alt): void {
    for (const child of p.alt) {
      if (isAlt(child)) {
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

export function isEmpty(p: P): boolean {
  if (isSeq(p)) {
    return p.seq.length === 0;
  }

  if (isAlt(p)) {
    return p.alt.length === 0;
  }

  return false;
}
