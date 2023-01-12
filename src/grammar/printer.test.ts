import test from "ava";
import { Printer } from "./printer.js";

test("intially is empty", (t) => {
  t.is(String(new Printer()), "");
  t.is(String(new Printer().indent()), "");
  t.is(String(new Printer().indent().print("")), "");
});

test("print lines", (t) => {
  const p = new Printer();

  p.print("a ");
  t.is(String(p), "a ");

  p.print("b ");
  t.is(String(p), "a b ");

  p.print("\n  \n");
  t.is(String(p), "a b \n  \n");

  p.print("c");
  t.is(String(p), "a b \n  \nc");

  p.print("\n1\n2\n3\n");
  t.is(String(p), "a b \n  \nc\n1\n2\n3\n");
});

test("print indented lines", (t) => {
  const p = new Printer();

  p.indent();

  p.print("");
  t.is(String(p), "");

  p.print("a");
  t.is(String(p), "  a");

  p.print("b");
  t.is(String(p), "  ab");

  p.print("\nc\n\n");
  t.is(String(p), "  ab\n  c\n\n");

  p.print("\nd\ne\n");
  t.is(String(p), "  ab\n  c\n\n\n  d\n  e\n");
});
