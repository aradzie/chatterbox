#!/usr/bin/env node

// Run this script with a grammar name, e.g.:
//
//   $ ./example.js kant
//
// where grammar name is one of the file names found in the `grammar` directory.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { generate, parse, validate } from "./lib/index.js";

loadGrammar(process.argv[2] || "thanks").catch((err) => {
  console.error(err);
});

async function loadGrammar(name) {
  const dir = fileURLToPath(new URL(".", import.meta.url));
  const file = join(dir, "grammar", name + ".grammar");
  const content = await readFile(file, "utf8");
  const grammar = parse(content);
  validate(grammar);
  console.log(generate(grammar));
}
