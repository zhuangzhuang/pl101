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

var compileEnvironment = function (env) {
    var res = [], item;
    for(var i = 0; i < env.length; i++){
        item = env[i];
        res.push('var ' + item[0] + '=' + item[1].toString());
    }
    return res.join(';');
};


// ----------- test --------
var env2 = [
    ['x', 7],
    ['f', function(x) { return 2 * x; }] ];
var res = compileEnvironment(env2);
console.log(res);
