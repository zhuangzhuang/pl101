// http://nathansuniversity.com/scheem.html
// var evalScheem = function (expr) {
//     // Numbers evaluate to themselves
//     if (typeof expr === 'number') {
//         return expr;
//     }
//     // Look at head of list for operation
//     switch (expr[0]) {
//         case '+':
//             return evalScheem(expr[1]) + evalScheem(expr[2]);
//         case '-':
//             return evalScheem(expr[1]) - evalScheem(expr[2]);
//         case '*':
//             return evalScheem(expr[1]) * evalScheem(expr[2]);
//         case '/':
//             return evalScheem(expr[1]) / evalScheem(expr[2]);
//     }
// };

// http://nathansuniversity.com/scheem1.html
// var evalScheem = function (expr, env) {
//     // Numbers evaluate to themselves
//     if (typeof expr === 'number') {
//         return expr;
//     }
//     // Strings are variable references
//     if (typeof expr === 'string') {
//         return env[expr];
//     }
//     // Look at head of list for operation
//     switch (expr[0]) {
//         case '+':
//             return evalScheem(expr[1], env) +
//                    evalScheem(expr[2], env);
//         case '-':
//             return evalScheem(expr[1], env) -
//                    evalScheem(expr[2], env);
//         case '*':
//             return evalScheem(expr[1], env) *
//                    evalScheem(expr[2], env);
//         case '/':
//             return evalScheem(expr[1], env) /
//                    evalScheem(expr[2], env);
//     }
// };


// http://nathansuniversity.com/scheem2.html

// var evalScheem = function (expr, env) {
//     // Numbers evaluate to themselves
//     if (typeof expr === 'number') {
//         return expr;
//     }
//     // Strings are variable references
//     if (typeof expr === 'string') {
//         return env[expr];
//     }
//     // Look at head of list for operation
//     switch (expr[0]) {
//         case '+':
//             return evalScheem(expr[1], env) +
//                    evalScheem(expr[2], env);
//         case 'define':
//             env[expr[1]] = evalScheem(expr[2], env); //??
//             return 0;
//         case 'set!':
//             env[expr[1]] = evalScheem(expr[2], env);
//             return 0;
//     }
// };

// http://nathansuniversity.com/scheem3.html

// var evalScheem = function (expr, env) {
//     // Numbers evaluate to themselves
//     if (typeof expr === 'number') {
//         return expr;
//     }
//     // Strings are variable references
//     if (typeof expr === 'string') {
//         return env[expr];
//     }
//     // Look at head of list for operation
//     switch (expr[0]) {
//         case '+':
//             return evalScheem(expr[1], env) +
//                    evalScheem(expr[2], env);
//         case 'set!':
//             env[expr[1]] = evalScheem(expr[2], env);
//             return 0;
//         case 'begin':
//             var res;
//             for(var i = 1; i < expr.length; i++){
//                 res = evalScheem(expr[i], env);
//             }
//             return res;
//     }
// };


// http://nathansuniversity.com/scheem4.html

// var evalScheem = function (expr, env) {
//     // Numbers evaluate to themselves
//     if (typeof expr === 'number') {
//         return expr;
//     }
//     // Look at head of list for operation
//     switch (expr[0]) {
//         case '+':
//             return evalScheem(expr[1], env) +
//                    evalScheem(expr[2], env);
//         case 'quote':
//             return expr[1];
//     }
// };

// http://nathansuniversity.com/scheem5.html
// var evalScheem = function (expr, env) {
//     // Numbers evaluate to themselves
//     if (typeof expr === 'number') {
//         return expr;
//     }
//     // Look at head of list for operation
//     switch (expr[0]) {
//         case '+':
//             return evalScheem(expr[1], env) +
//                    evalScheem(expr[2], env);
//         case '<':
//             var r = 
//                 (evalScheem(expr[1], env) < evalScheem(expr[2], env));
//             if(r)
//                 return '#t';
//             return '#f';
//     }
// };

// http://nathansuniversity.com/scheem6.html
// var evalScheem = function (expr, env) {
//     // Numbers evaluate to themselves
//     if (typeof expr === 'number') {
//         return expr;
//     }
//     // Look at head of list for operation
//     switch (expr[0]) {
//         case 'quote':
//             return expr[1];
//         case 'cons':
//             var rest = evalScheem(expr[2], env);
//             var head = evalScheem(expr[1], env);
//             return rest.splice(0, 0, head);
//         case 'car':
//             return evalScheem(expr[1], env)[0];
//         case 'cdr':
//             return evalScheem(expr[1], env).slice(1);        
//     }
// };

// http://nathansuniversity.com/scheem7.html
var evalScheem = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    if (expr === 'error') throw('Error');
    // Look at head of list for operation
    switch (expr[0]) {
        case '=':
            var eq =
                (evalScheem(expr[1], env) ===
                 evalScheem(expr[2], env));
            if (eq) return '#t';
            return '#f';
        case 'if':
            var b = evalScheem(expr[1], env);
            if(b === '#t'){
                return evalScheem(expr[2], env);
            }else{
                return evalScheem(expr[4], env);
            }            
    }
};



