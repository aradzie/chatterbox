import { Grammar, P } from "../../types";
import { parse as pegjs, SyntaxError } from "./pegjs-parser";

export { SyntaxError };

export function parse(input: string): Grammar {
  const rules: Rule[] = pegjs(input, {});
  return {
    rule: Object.fromEntries(rules.map(({ name, p }) => [name, p])),
  };
}

interface Rule {
  readonly name: string;
  readonly p: P;
}
