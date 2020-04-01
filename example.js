#!/usr/bin/env node

const { parse, validate, generate } = require(".");

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
