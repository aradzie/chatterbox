import { type P } from "../types.js";

declare class SyntaxError extends Error {
  readonly location: Location;
}

declare interface Location {
  readonly start: Position;
  readonly end: Position;
}

declare interface Position {
  readonly column: number;
  readonly line: number;
  readonly offset: number;
}

declare interface Rule {
  readonly name: string;
  readonly p: P;
}

declare function parse(input: string): readonly Rule[];
