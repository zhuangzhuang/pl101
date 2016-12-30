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

        