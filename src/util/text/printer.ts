export class Printer {
  private readonly indentWidth: number;
  private content = "";
  private level = 0;
  private filler = "";
  private nl = true;

  constructor(options: { indentWidth?: number } = {}) {
    const { indentWidth = 2 } = options;
    this.indentWidth = indentWidth;
  }

  indent(): this {
    this.level += 1;
    this.filler = "".padEnd(this.level * this.indentWidth);
    return this;
  }

  unindent(): this {
    if (this.level == 0) {
      throw new Error();
    }
    this.level -= 1;
    this.filler = "".padEnd(this.level * this.indentWidth);
    return this;
  }

  print(value: string): this {
    if (value == "") {
      return this;
    }
    let pos = 0;
    while (pos < value.length) {
      const index = value.indexOf("\n", pos);
      let substring;
      let nl;
      if (index == -1) {
        substring = value.substring(pos);
        nl = false;
        pos = value.length;
      } else {
        substring = value.substring(pos, index);
        nl = true;
        pos = index + 1;
      }
      if (substring.length > 0) {
        if (this.nl) {
          this.content += this.filler;
        }
        this.content += substring;
      }
      if (nl) {
        this.content += "\n";
      }
      this.nl = nl;
    }
    return this;
  }

  toString(): string {
    return this.content;
  }
}
