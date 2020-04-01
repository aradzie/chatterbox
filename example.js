#!/usr/bin/env node

// Run this script with a grammar name, e.g.:
//
//   $ ./example.js kant
//
// where grammar name is one of the file names found in the `grammar` directory.

const { parse, validate, generate } = require(".");

const path = require("path");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

loadGrammar(process.argv[2] || "thanks");

function loadGrammar(name) {
  const file = path.join(__dirname, "grammar", name + ".grammar");

  readFile(file, "utf8")
    .then(parse)
    .then((grammar) => {
      validate(grammar);
      console.log(generate(grammar));
    })
    .catch((err) => {
      console.error(err);
    });
}
