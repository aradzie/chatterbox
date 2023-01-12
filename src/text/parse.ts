import type { Grammar } from "../types.js";
import { parse as peggyParse, SyntaxError } from "./peggy-parser.js";

export { SyntaxError };

export function parse(input: string): Grammar {
  const rules = peggyParse(input);
  return {
    rule: Object.fromEntries(rules.map(({ name, p }) => [name, p])),
  };
}
