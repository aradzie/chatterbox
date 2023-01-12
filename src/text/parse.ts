import type { Grammar } from "../types";
import { parse as peggyParse, SyntaxError } from "./peggy-parser";

export { SyntaxError };

export function parse(input: string): Grammar {
  const rules = peggyParse(input);
  return {
    rule: Object.fromEntries(rules.map(({ name, p }) => [name, p])),
  };
}
