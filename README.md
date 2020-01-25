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
