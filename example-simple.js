#!/usr/bin/env node

import { generate, parse, validate } from "./lib/index.js";

const grammar = parse(`
start ->
    "The " <noun> " is " <adj> "."
  | "A " <adj> " " <noun> "."
  ;
noun ->
    "house"
  | "cat"
  ;
adj ->
    "green"
  | "big"
  ;
`);

validate(grammar);

console.log(generate(grammar));
