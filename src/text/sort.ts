import { Grammar, isAlt, isOpt, isRef, isSeq, isSpan, P } from "../types";

/**
 * Sorts grammar rules topologically.
 */
export function sort(grammar: Grammar): Grammar {
  const rules = new Map<string, Rule>();
  for (const [name, p] of Object.entries(grammar.rule)) {
    const rule = new Rule(name, p);
    rules.set(rule.name, rule);
  }
  for (const rule of rules.values()) {
    const refs = new Set<string>();
    collectRefs(rule.p, refs);
    for (const ref of refs) {
      const other = getRule(ref);
      rule.outgoing.add(other);
      other.incoming.add(rule);
    }
  }
  const list: Rule[] = [];
  for (const rule of rules.values()) {
    visit(rule);
  }
  return { rule: Object.fromEntries(list.map(({ name, p }) => [name, p])) };

  function visit(rule: Rule): void {
    if (rule.permanent) {
      return; // Ok.
    }
    if (rule.temporary) {
      return; // Not a DAG!
    }
    rule.temporary = true;
    for (const other of rule.outgoing) {
      visit(other);
    }
    rule.temporary = false;
    rule.permanent = true;
    list.unshift(rule);
  }

  function getRule(name: string): Rule {
    const rule = rules.get(name);
    if (rule == null) {
      throw new Error(`Unknown rule ${name}`);
    }
    return rule;
  }
}

class Rule {
  readonly outgoing = new Set<Rule>();
  readonly incoming = new Set<Rule>();

  permanent = false;
  temporary = false;

  constructor(readonly name: string, readonly p: P) {}
}

function collectRefs(p: P, refs: Set<string>): void {
  if (isSpan(p)) {
    collectRefs(p.span, refs);
    return;
  }

  if (isOpt(p)) {
    collectRefs(p.opt, refs);
    return;
  }

  if (isSeq(p)) {
    for (const c of p.seq) {
      collectRefs(c, refs);
    }
    return;
  }

  if (isAlt(p)) {
    for (const c of p.alt) {
      collectRefs(c, refs);
    }
    return;
  }

  if (isRef(p)) {
    refs.add(p.ref);
    return;
  }
}
