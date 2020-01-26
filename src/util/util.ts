import { isAlt, isSeq, P } from "../types";

export function isSimple(p: P): boolean {
  if (isSeq(p)) {
    return p.cls == null;
  }

  return true;
}

export function isEmpty(p: P): boolean {
  if (isSeq(p)) {
    return p.seq.length == 0;
  }

  if (isAlt(p)) {
    return p.alt.length == 0;
  }

  return false;
}
