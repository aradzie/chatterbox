Start
  = rules:Rule* _ { return rules; }

Rule
  = _ name:Name _ "->" _ p:Alt _ ";" { return { name, p }; }

Name
  = [a-zA-Z0-9][-._a-zA-Z0-9]* { return text(); }

Alt
  = head:Seq tail:( _ "|" _ t:Seq { return t; } )*
  {
    if (tail.length > 0) {
      return { alt: [ head, ...tail ] };
    } else {
      return head;
    }
  }

Seq
  = head:Factor tail:( _ t:Factor { return t; } )*
  {
    if (tail.length > 0) {
      return { seq: [ head, ...tail ] };
    } else {
      return head;
    }
  }

Factor
  = "(" _ p:Alt _ ")" { return p; }
  / "[" _ p:Alt _ "]" { return { f: 0.5, opt: p }; }
  / "{" _ "class" _ "=" _ cls:Name _ p:Alt _ "}" { return { cls: cls, span: p }; }
  / ref:Ref { return ref; }
  / lit:Lit { return lit; }

Ref "ref"
  = "<" ref:Name ">" { return { ref }; }

Lit "literal"
  = string:string { return string; }

string "string"
  = '"' chars:char* '"' { return chars.join(""); }

char
  = unescaped
  / escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

unescaped      = [^\0-\x1F\x22\x5C]
escape         = "\\"

HEXDIG = [0-9a-fA-F]

_ "whitespace"
  = [ \t\n\r]*
