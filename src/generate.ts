import { Grammar, isAlt, isLit, isOpt, isRef, isSeq, P } from "./types";

export interface Options {
  readonly random?: () => number;
}

/**
 * Generates text from the given context-free grammar.
 */
export function generate(grammar: Grammar, options: Options = {}): string {
  const { random = (): number => Math.random() } = options;

  const { rule, start = "start" } = grammar;
  const rulesByName = new Map(Object.entries(rule));
  const result: string[] = [];
  visit(getRule(start));
  return result.join("");

  function visit(p: P): void {
    if (isLit(p)) {
      result.push(p);
      return;
    }

    if (isSeq(p)) {
      for (const child of p.seq) {
        visit(child);
      }
      return;
    }

    if (isAlt(p)) {
      visit(choose(p.alt));
      return;
    }

    if (isRef(p)) {
      visit(getRule(p.ref));
      return;
    }

    if (isOpt(p)) {
      const { f = 1 } = p;
      if (f == 1 || f > random()) {
        visit(p.opt);
      }
      return;
    }

    throw new Error(); // Unreachable.
  }

  function getRule(name: string): P {
    const rule = rulesByName.get(name);
    if (rule == null) {
      throw new Error(`Unknown rule [${name}]`);
    }
    return rule;
  }

  function choose(a: readonly P[]): P {
    return a[Math.floor(random() * a.length)];
  }
}
