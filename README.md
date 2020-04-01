# Chatterbox

Generates text based on a context-free grammar.

For example, given this grammar:

```text
start -> "The " <noun> " is " <adj> "." | "A " <adj> " " <noun> "." ;
noun -> "house" | "cat" ;
adj -> "green" | "big" ;

```

will generate one of the following:

```text
The house is green.
The house is big.
The cat is green.
The cat is big.
A big house.
A big cat.
A green house.
A green cat.
```

The full example listing:

```javascript
const { parse, validate, generate } = require("@aradzie/chatterbox");

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
```

This project is based on book `Dive Into Python` which included an example of how to generate
mock philosophy based on a context-free grammar. I had a good laugh reading mock Kant passages:

> The noumena are the clue to the discovery of, therefore,our judgements.
> I assert, certainly, that the architectonic of human reason is just as necessary as, therefore,
> our concepts; still, the things in themselves are the clue to the discovery of, in the case of
> necessity, the never-ending regress in the series of empirical conditions.
> It must not be supposed that the paralogisms, irrespective of all empirical conditions,
> can be treated like the thing in itself, as is shown in the writings of Galileo.
> In the case of the transcendental aesthetic, the Categories are just as necessary as,
> in other words, our faculties, by virtue of pure reason.
> (The phenomena can not take account of the Ideal of practical reason, and the Ideal of practical
> reason is a representation of time.)
> Necessity would thereby be made to contradict, in the case of the thing in itself,
> the thing in itself, yet the transcendental unity of apperception constitutes the whole content
> for philosophy.

I ported the original grammar XML files to a new syntax which is more readable.
The files are available in the [grammar](./grammar) directory.
