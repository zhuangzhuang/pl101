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
    l: lowercase+ 
    {return l.join("");}

upper_word = 
    l: uppercase+
    {return l.join("");}    

word =
    lower_word
    /upper_word

// http://nathansuniversity.com/pegs3.html
start =
    wordlist

spacedword = 
    ' '
    {return []}

wordlist =
    
    