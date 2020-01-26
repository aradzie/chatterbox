import { Grammar, P } from "../types";

/**
 * Merges multiple grammar into one, from left to right, the later rules overwrite the former.
 */
export function merge(
  grammars: readonly Grammar[],
  onDuplicate: "throw" | "replace" = "replace",
): Grammar {
  if (grammars.length == 0) {
    throw new Error();
  }
  if (grammars.length == 1) {
    return grammars[0];
  }
  const map = new Map<string, P>();
  let start;
  for (const grammar of grammars) {
    for (const [name, rule] of Object.entries(grammar.rule)) {
      if (onDuplicate == "throw" && map.has(name)) {
        throw new Error(`Duplicate rule "${name}"`);
      }
      map.set(name, rule);
    }
    start = grammar.start;
  }
  if (start != null) {
    return { rule: Object.fromEntries(map), start };
  } else {
    return { rule: Object.fromEntries(map) };
  }
}
