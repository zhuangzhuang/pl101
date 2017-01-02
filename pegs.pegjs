// http://nathansuniversity.com/pegs.html
start =
    uppercase
digit =
    [0-9]    
uppercase  = 
    [A-Z]

// http://nathansuniversity.com/pegs1.html
start =
    countrycode

lowercase = 
    [a-z]

countrycode =    
    first:lowercase second: lowercase
    {return first + second}

// http://nathansuniversity.com/pegs2.html

start =
    word

lowercase = 
    [a-z]

uppercase = 
    [A-Z]    

lower_word = 
    l: uppercase+
    {return l.join("");} 

upper_word = 
    l: lowercase+
    {return l.join("");}    

word =
    lower_word
    /upper_word

// http://nathansuniversity.com/pegs3.html
start =
    words: wordlist

spacedword = 
    ' '+
    {return [];}

lower_word = 
    l: [a-z]+
    {return [l.join("")];} 

wordlist =
    s: (spacedword / lower_word)+
    {
        var res = []; 
        for(var i =0; i < s.length;i++){
            res = res.concat(s[i]);
        }
        return res;
    }

// http://nathansuniversity.com/pegs4.html  ???
start =
    expression

validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    chars:validchar+
        { return chars.join(""); }

spacedword = 
    ' '+
    {return null;}

expression =
    '(' e: (spacedword / expression)* ')'
    {
        var res = [];
        for(var i=0; i < e.length;i++){
            if(e[i] != null){
                res.push(e[i]);
            }
        }
        return res;
    } / atom


// http://nathansuniversity.com/pegs6.html
start =
    commic

commic = 
    left:additive "," right:additive
        {return {tag: ',', left: left, right: right}}
    / additive

additive =
    left:multiplicative "+" right:additive
        { return {tag: "+", left:left, right:right}; }
  / multiplicative

multiplicative =
    left:primary "*" right:multiplicative
        { return {tag: "*", left:left, right:right}; }
  / primary

primary =
    integer
  / "(" additive:additive ")"
      { return additive; }

integer =
    digits:[0-9]+
        { return parseInt(digits.join(""), 10); }