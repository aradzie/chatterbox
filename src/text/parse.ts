import { Grammar } from "../types";
import { parse as pegjs, SyntaxError } from "./pegjs-parser"; // eslint-disable-line import/named

export { SyntaxError };

export function parse(input: string): Grammar {
  const rules = pegjs(input);
  return {
    rule: Object.fromEntries(rules.map(({ name, p }) => [name, p])),
  };
}
