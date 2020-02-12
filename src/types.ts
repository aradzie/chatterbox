export interface Grammar {
  readonly rule: RuleMap;
}

export interface RuleMap {
  readonly [name: string]: P;
}

export type P = Span | Opt | Seq | Alt | Ref | string;

export interface Span {
  readonly cls: string;
  readonly span: P;
}

export interface Opt {
  readonly f: number;
  readonly opt: P;
}

export interface Seq {
  readonly seq: readonly P[];
}

export interface Alt {
  readonly alt: readonly P[];
}

export interface Ref {
  readonly ref: string;
}

export function isSpan(v: P): v is Span {
  return typeof v == "object" && "span" in v;
}

export function isOpt(v: P): v is Opt {
  return typeof v == "object" && "opt" in v;
}

export function isSeq(v: P): v is Seq {
  return typeof v == "object" && "seq" in v;
}

export function isAlt(v: P): v is Alt {
  return typeof v == "object" && "alt" in v;
}

export function isRef(v: P): v is Ref {
  return typeof v == "object" && "ref" in v;
}

export function isLit(v: P): v is string {
  return typeof v == "string";
}
