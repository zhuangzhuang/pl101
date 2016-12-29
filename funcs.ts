// http://nathansuniversity.com/funcs.html

interface IEnv{
    bindings: Object
    outer: IEnv
}

var lookup = function (env:IEnv, v) {
    var r = env.bindings[v];
    if(r === undefined){
        return env.bindings[v];
    }
    return lookup(env.outer, v);
};

// http://nathansuniversity.com/funcs1.html
var evalScheem = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    // Strings are variable references
    if (typeof expr === 'string') {
        return lookup(env, expr);
    }
    // Look at head of list for operation
    switch (expr[0]) {
        case '+':
            return evalScheem(expr[1], env) +
                   evalScheem(expr[2], env);
        case 'let-one':
            var bindings = {};
            bindings[expr[1]] = evalScheem(expr[2], env);
            var newEnv = {
                bindings: bindings,
                outer: env
            };
            return evalScheem(expr[3], newEnv);
    }
};
