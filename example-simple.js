#!/usr/bin/env node

import { generate, parse, validate } from "./lib/index.js";

const grammar = parse(`
start ->
    "The" _ <noun> _ "is" _ <adj> "."
  | "A" _ <adj> _ <noun> "."
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
