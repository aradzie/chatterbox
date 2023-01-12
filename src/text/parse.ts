import type { Grammar } from "../types";
import { parse as peggyParse, SyntaxError } from "./peggy-parser"; // eslint-disable-line import/named

export { SyntaxError };

export function parse(input: string): Grammar {
  const rules = peggyParse(input);
  return {
    rule: Object.fromEntries(rules.map(({ name, p }) => [name, p])),
  };
}
