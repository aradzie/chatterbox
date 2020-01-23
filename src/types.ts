export interface Grammar {
  readonly rule: RuleMap;
  readonly start?: string;
}

export interface RuleMap {
  readonly [name: string]: P;
}

export type P = string | Seq | Alt | Ref;

export interface Seq {
  readonly chance?: number;
  readonly cls?: string;
  readonly seq: readonly P[];
}

export interface Alt {
  readonly chance?: number;
  readonly alt: readonly P[];
}

export interface Ref {
  readonly chance?: number;
  readonly ref: string;
}

export function isLit(v: P): v is string {
  return typeof v == "string";
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
