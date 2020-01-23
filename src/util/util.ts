import { isAlt, isSeq, P } from "../types";

export function isSimple(p: P): boolean {
  if (isSeq(p)) {
    return p.chance == null && p.cls == null;
  }

  if (isAlt(p)) {
    return p.chance == null;
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
