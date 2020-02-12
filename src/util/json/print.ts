import {
  Alt,
  Grammar,
  isAlt,
  isLit,
  isOpt,
  isRef,
  isSeq,
  isSpan,
  Opt,
  P,
  Ref,
  RuleMap,
  Seq,
  Span,
} from "../../types";

/**
 * Takes the given machine-processable grammar and converts it
 * to a human-readable form with embedded DSL fragments for simpler editing.
 *
 * This function performs the opposite of `parse()`.
 */
export function print(grammar: Grammar): Grammar {
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

  if (isRef(p)) {
    return visitRef(p);
  }

  if (isLit(p)) {
    return p;
  }

  throw new Error(); // Unreachable.
}

function visitSpan(p: Span): P {
  const { cls, span } = p;
  return { cls, span: visit(span) };
}

function visitOpt(p: Opt): P {
  const { f, opt } = p;
  return { f, opt: visit(opt) };
}

function visitSeq(p: Seq): P {
  const seq: P[] = [];
  for (const item of p.seq.map(visit)) {
    if (isLit(item) && seq.length > 0 && isLit(seq[seq.length - 1])) {
      seq.push(seq.pop() + item);
    } else {
      seq.push(item);
    }
  }
  if (seq.length == 1) {
    return seq[0];
  } else {
    return { ...p, seq };
  }
}

function visitAlt(p: Alt): P {
  const { alt } = p;
  if (alt.every(isRef)) {
    return `<${(alt as Ref[]).map(({ ref }) => ref).join("|")}>`;
  } else {
    return { ...p, alt: alt.map(visit) };
  }
}

function visitRef(p: Ref): P {
  return `<${p.ref}>`;
}
