// http://nathansuniversity.com/compiler1.html
var compileExpr = function (expr) {
    if (typeof expr === 'number') {
        return expr.toString();
    }
    switch(expr.tag) {
        case '+':
            return '(' + compileExpr(expr.left) + ')+(' +
                         compileExpr(expr.right) + ')';
        case '*':
            return '(' + compileExpr(expr.left) + ')*(' +
                         compileExpr(expr.right) + ')';
        case '-':
            return '(' + compileExpr(expr.left) + ')-(' +
                         compileExpr(expr.right) + ')';
        case '<':
            return '(' + compileExpr(expr.left) + ')<(' +
                         compileExpr(expr.right) + ')';
                         
        default:
            throw new Error('Unknown tag ' + expr.tag);
    }
};

// http://nathansuniversity.com/compiler2.html
var compileEnvironment = function (env) {
    var res = [];
    for(var i = 0; i < env.length; i++){
        var item = env[i];
        var line = 'var ' + item[0] + ' = ' + item[1].toString() + ';';
        res.push(line);
    }
    return res.join('\n');
};


// http://nathansuniversity.com/compiler3.html
var compileExpr = function (expr) {
    if (typeof expr === 'number') {
        return expr.toString();
    }
    switch(expr.tag) {
        case '+':
            return '(' + compileExpr(expr.left) + ')+(' +
                         compileExpr(expr.right) + ')';
        case 'ident':
            return expr.name;
        case 'call':
            var fn = expr.name;            
            var args = [];
            var fn_args = expr.args;
            if(fn_args){
                for(var i  = 0; i < fn_args.length; i++){
                    var item = fn_args[i];
                    var arg = compileExpr(item);
                    args.push(arg);
                }           
            } 
            return fn + '(' + args.join(',')  +')';
        default:
            throw new Error('Unknown tag ' + expr.tag);
    }
};

// http://nathansuniversity.com/compiler4.html
var compileStatements = function (stmts, is_funcbody) {
    var res = '';
    var i;
    res += 'var _res; ';
    for(i = 0; i < stmts.length; i++) {
        res += compileStatement(stmts[i]);
    }
    if(is_funcbody) res += 'return _res; ';
    return res;
};

// http://nathansuniversity.com/compiler5.html
var compileRepeat = function (stmt) {
    // Your code here
    return 'var _res; _res = repeat(' + compileExpr(stmt.expr)+ ', function(){'+ compileStatements(stmt.body, true) +'});';
};

// ----------- test --------
var env2 = [
    ['x', 7],
    ['f', function(x) { return 2 * x; }] ];
var res = compileEnvironment(env2);
console.log(res);
