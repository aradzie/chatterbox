import {
  Alt,
  Grammar,
  isAlt,
  isLit,
  isOpt,
  isRef,
  isSeq,
  isSpan,
  Opt,
  P,
  Ref,
  Seq,
  Span,
} from "../types";
import { Printer } from "./printer";
import { sort } from "./sort";

/**
 * Prints the given grammar in the human-readable form.
 */
export function print(grammar: Grammar): string {
  grammar = sort(grammar);
  const printer = new Printer();
  for (const [name, rule] of Object.entries(grammar.rule)) {
    printer.print(`${name} ->\n`);
    printer.indent();
    printRule(rule, true);
    printer.print(`\n;\n`);
    printer.unindent();
  }
  return printer.toString();

  function printRule(p: P, multiline: boolean): void {
    if (isSpan(p)) {
      printSpan(p);
      return;
    }

    if (isOpt(p)) {
      printOpt(p);
      return;
    }

    if (isSeq(p)) {
      printSeq(p, multiline);
      return;
    }

    if (isAlt(p)) {
      printAlt(p, multiline);
      return;
    }

    if (isRef(p)) {
      printRef(p);
      return;
    }

    if (isLit(p)) {
      printer.print(JSON.stringify(p));
      return;
    }

    throw new Error(); // Unreachable.
  }

  function printSpan(p: Span): void {
    printer.print(`{ class=${p.cls} `);
    printRule(p.span, false);
    printer.print(" }");
  }

  function printOpt(p: Opt): void {
    printer.print("[ ");
    if (p.f != 0.5) {
      printer.print(`f=${p.f} `);
    }
    printRule(p.opt, false);
    printer.print(" ]");
  }

  function printSeq(p: Seq, multiline: boolean): void {
    let i = 0;
    for (const child of p.seq) {
      if (i++ > 0) {
        printer.print(" ");
      }
      if (isAlt(child)) {
        printer.print("( ");
        printRule(child, false);
        printer.print(" )");
      } else {
        printRule(child, multiline);
      }
    }
  }

  function printAlt(p: Alt, multiline: boolean): void {
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
      printRule(child, multiline);
    }
  }

  function printRef(p: Ref): void {
    printer.print(`<${p.ref}>`);
  }
}
