// http://nathansuniversity.com/turtle1.html

start
    = number
number_frac
    = "." chars:[0-9]*
        { return "." + chars.join(''); }
number
    = chars:[0-9]+ frac:number_frac?
        { return parseFloat(chars.join('') + frac); }
        / "-" chars:[0-9]+ frac:number_frac?
        { return -parseFloat(chars.join('') + frac); }


// http://nathansuniversity.com/turtle2.html
expression = "EXPR" / primary

number
    = chars:[0-9]+
        { return parseFloat(chars.join('')); }

identifier
    = chars:[a-z]+
        { return chars.join(''); }

primary
    = number
    / "(" expr:expression ")"
        { return expr; }
    / ident: identifier
        {return {tag: 'ident', name: ident}}

// http://nathansuniversity.com/turtle3.html
start = statement

expression = "EXPR"

identifier
    = chars:[a-z]+
        { return chars.join(''); }

statements = statement*

statement
    = v:identifier ":=" expr:expression ";"
        { return { tag:":=", left:v, right:expr }; }
      /var_statement
      /if_statement
      /repeat_statement


var_statement 
    = 'var' ' ' name:identifier ';' //...
        {
            return {tag: 'var', name: name};
        }
if_statement 
    = 'if'  '(' expr:expression  ')'  '{' body: statements  '}' 
        {
            return {tag: 'if', expr: expr, body: body};
        }
repeat_statement 
    = 'repeat'  '(' expr:expression  ')'  '{'  body: statements  '}' 
        {
            return {tag: 'repeat', expr: expr, body: body};
        }