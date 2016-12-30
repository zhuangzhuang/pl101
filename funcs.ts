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


// http://nathansuniversity.com/funcs2.html
var update = function (env, v, val) {
    // Your code here
    if(env.bindings.hasOwnProperty(v)){
        env.bindings[v] = val;
        return;
    }
    update(env.outer, v, val);
};


// http://nathansuniversity.com/funcs3.html
var evalScheem = function (expr, env) {
    if (typeof expr === 'number') {
        return expr;
    }
    if (typeof expr === 'string') {
        return lookup(env, expr);
    }
    // Look at head of list for operation
    switch (expr[0]) {
        case '+':
            return evalScheem(expr[1], env) +
                   evalScheem(expr[2], env);
        case 'quote':
            return expr[1];
        default:
            var fun_name = expr[0];
            var fun = lookup(env, fun_name);
            var param = evalScheem(expr[1], env);
            return fun(param);
    }
};


// http://nathansuniversity.com/funcs4.html
var evalScheem = function (expr, env) {
    if (typeof expr === 'number') {
        return expr;
    }
    if (typeof expr === 'string') {
        return lookup(env, expr);
    }
    // Look at head of list for operation
    switch (expr[0]) {
        case '+':
            return evalScheem(expr[1], env) +
                   evalScheem(expr[2], env);
        case 'lambda-one':
            var varname = expr[1];
            var body = expr[2];
            return function(arg){
                var newenv = {
                    bindings: {},
                    outer: env
                };
                newenv.bindings[varname] = arg;
                return evalScheem(body, newenv);
            };
        default:
            // Simple application
            var func = evalScheem(expr[0], env);
            var arg = evalScheem(expr[1], env);
            return func(arg);
    }
};


// http://nathansuniversity.com/funcs5.html
var add_binding = function (env, v, val) {
    env.bindings[v] = val;
};
