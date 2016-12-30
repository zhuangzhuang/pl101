// http://nathansuniversity.com/types1.html
var prettyType = function (type) {
    if(type.tag === 'basetype'){
        return type.name;
    }
    return "(" + prettyType(type.left) + " -> " + prettyType(type.right) + ")";
};

// http://nathansuniversity.com/types2.html
var app2 = function(f){
    return function(x){
        return function(y){
            return f(x)(y);
        };
    };
};

// http://nathansuniversity.com/types3.html
var sameType = function (a, b) {
    var taga = a.tag;
    var tagb = b.tag;
    if(taga !== tagb){
        return false;
    }
    if(taga == 'basetype'){
        return a.name === b.name;
    }
    return sameType(a.left, b.left) && sameType(a.right, b.right);
};

// http://nathansuniversity.com/types4.html
var typeExprTester = function (context) {
    // Your code here
    return typeExpr(["f", "x"],context);
};

// http://nathansuniversity.com/types5.html
var typeExprIf = function (expr, context) {
    var cond = expr[1];
    var A = expr[2];
    var B = expr[3];
    var cond_type = typeExpr(cond, context);
    if(!sameType(cond_type, base('bool'))){
        throw new Error('Cond error type');
    }
    var A_type = typeExpr(A, context);
    var B_type = typeExpr(B, context);
    if(!sameType(A_type, B_type)){
        throw new Error('Miss type');    
    }
    return A_type;
};

// http://nathansuniversity.com/types6.html
var typeExprLambdaOne = function (expr, context) {
    var var_name = expr[1];
    var var_type = expr[2];

    var new_context = {
        bindings: {},
        outer: context
    };
    new_context.bindings[var_name] = var_type;
    var body_type = typeExpr(expr[3], new_context);
    return arrow(var_type, body_type);
};
