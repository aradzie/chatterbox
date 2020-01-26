import {
  Alt,
  Grammar,
  isAlt,
  isLit,
  isOpt,
  isRef,
  isSeq,
  Opt,
  P,
  Ref,
  RuleMap,
  Seq,
} from "../../types";
import { isSimple } from "../util";

/**
 * Takes the given machine-processable grammar and converts it
 * to a human-readable form with embedded DSL fragments for simpler editing.
 *
 * This function performs the opposite of `parse()`.
 */
export function print(grammar: Grammar): Grammar {
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

  if (isRef(p)) {
    return visitRef(p);
  }

  if (isLit(p)) {
    return p;
  }

  throw new Error(); // Unreachable.
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
  if (isSimple(p) && seq.length == 1) {
    return seq[0];
  } else {
    return { ...p, seq };
  }
}

function visitAlt(p: Alt): P {
  const { alt } = p;
  if (isSimple(p) && alt.every(isRef)) {
    return `<${(alt as Ref[]).map(({ ref }) => ref).join("|")}>`;
  } else {
    return { ...p, alt: alt.map(visit) };
  }
}

function visitRef(p: Ref): P {
  if (isSimple(p)) {
    return `<${p.ref}>`;
  } else {
    return p;
  }
}
