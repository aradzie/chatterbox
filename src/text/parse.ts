import type { Grammar } from "../ast.js";
import { parse as peggyParse, SyntaxError } from "./parser.js";

export { SyntaxError };

export function parse(input: string): Grammar {
  const rules = peggyParse(input);
  return {
    rule: Object.fromEntries(rules.map(({ name, p }) => [name, p])),
  };
}
