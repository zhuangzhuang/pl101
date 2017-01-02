// repeat(18) {
//     right(20);
//     repeat(36) {
//         forward(20);
//         right(10);
//     }
// }



// http://nathansuniversity.com/turtle4.html
var evalExpr = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    // Look at tag to see what to do
    switch(expr.tag) {
        case '+':
            return evalExpr(expr.left, env) +
                   evalExpr(expr.right, env);
        case 'ident':
            return lookup(env, expr.name);
    }
};

// http://nathansuniversity.com/turtle5.html
var evalStatement = function (stmt, env) {
    // Statements always have tags
    switch(stmt.tag) {
        // A single expression
        case 'ignore':
            return evalExpr(stmt.body, env);
        // Repeat
        case 'repeat':
            var n = evalExpr(stmt.expr,  env);
            var res = null;
            for(var i=0; i<n;i++){
                res = evalStatements(stmt.body);
            }
            return res;
    }
};