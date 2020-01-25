import { Grammar } from "../types";
import { parse } from "../util/json/parse";
import * as exampleGrammar from "./example.json";
import * as husserlGrammar from "./husserl.json";
import * as kantGrammar from "./kant.json";
import * as thanksGrammar from "./thanks.json";

export interface NamedGrammar {
  readonly name: string;
  readonly grammar: Grammar;
}

export const grammars: readonly NamedGrammar[] = [
  { name: "example", grammar: parse(exampleGrammar) },
  { name: "husserl", grammar: parse(husserlGrammar) },
  { name: "kant", grammar: parse(kantGrammar) },
  { name: "thanks", grammar: parse(thanksGrammar) },
];
