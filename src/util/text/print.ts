import { Grammar, isAlt, isLit, isRef, isSeq, P } from "../../types";
import { Printer } from "./printer";

/**
 * Prints the given grammar in the human-readable form.
 */
export function print(grammar: Grammar): string {
  const printer = new Printer();
  for (const [name, rule] of Object.entries(grammar.rule)) {
    printer.print(`${name} ->\n`);
    printer.indent();
    printRule(rule, printer, true);
    printer.print(`\n;\n`);
    printer.unindent();
  }
  return printer.toString();
}

function printRule(p: P, printer: Printer, multiline: boolean): void {
  if (isLit(p)) {
    printer.print(JSON.stringify(p));
    return;
  }

  if (isSeq(p)) {
    let i = 0;
    for (const child of p.seq) {
      if (i++ > 0) {
        printer.print(" ");
      }
      if (isAlt(child)) {
        printer.print("( ");
        printRule(child, printer, false);
        printer.print(" )");
      } else {
        printRule(child, printer, multiline);
      }
    }
    return;
  }

  if (isAlt(p)) {
    let i = 0;
    for (const child of p.alt) {
      if (multiline) {
        if (i++ > 0) {
          printer.print("\n| ");
        } else {
          printer.print("  ");
        }
      } else {
        if (i++ > 0) {
          printer.print(" | ");
        }
      }
      printRule(child, printer, multiline);
    }
    return;
  }

  if (isRef(p)) {
    printer.print(`<${p.ref}>`);
    return;
  }

  throw new Error(); // Unreachable.
}
