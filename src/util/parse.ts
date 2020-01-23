import { Grammar, isAlt, isLit, isRef, isSeq, P, RuleMap } from "../types";
import { optimize } from "./optimize";
import { validate } from "./validate";

/**
 * Takes the given grammar with embedded human-readable DSL fragments
 * and expands these fragments to machine-processable form.
 *
 * This function performs the opposite of `format()`.
 */
export function parse(grammar: Grammar): Grammar {
  return validate(optimize(parseImpl(grammar)));
}

function parseImpl(grammar: Grammar): Grammar {
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
  if (isLit(p)) {
    return visitLiteral(p);
  }

  if (isSeq(p)) {
    return { ...p, seq: p.seq.map(visit) };
  }

  if (isAlt(p)) {
    return { ...p, alt: p.alt.map(visit) };
  }

  if (isRef(p)) {
    return p;
  }

  throw new Error(); // Unreachable.
}

function visitLiteral(p: string): P {
  const result: P[] = [];
  const regex = /<([^>]+)>/g;
  let pos = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(p)) != null) {
    if (match.index > pos) {
      result.push(p.substring(pos, match.index));
    }
    const ref = match[1].split("|");
    if (ref.length == 1) {
      result.push({ ref: ref[0] });
    } else {
      result.push({ alt: ref.map((v) => ({ ref: v })) });
    }
    pos = regex.lastIndex;
  }
  if (p.length > pos) {
    result.push(p.substring(pos));
  }
  if (result.length > 1) {
    return { seq: result };
  } else {
    return result[0];
  }
}
