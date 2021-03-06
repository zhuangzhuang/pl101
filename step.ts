var thunk = function (f) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    return { tag: "thunk", func: f, args: args };
};

var thunkValue = function (x) {
    return { tag: "value", val: x };
};

var trampolineCounter = function (thk) {
    var cnt = 0;
    while (true) {
        if (thk.tag === "value") {
            return { value: thk.val, count: cnt };
        } else if (thk.tag === "thunk") {
            thk = thk.func.apply(null, thk.args);
            cnt++;
        } else {
            throw new Error("Bad thunk");
        }
    }
};

var stepStart = function (expr, env) {
    return { 
        data: evalExpr(expr, env, thunkValue),
        done: false
    };
};

var evalFull = function (expr, env) {
    var state = stepStart(expr, env);
    while(!state.done) {
        step(state);
    }
    return state.data;
};


var trampoline = function (thk) {
    while (true) {
        if (thk.tag === "value") {
            return thk.val;
        } else if (thk.tag === "thunk") {
            thk = thk.func.apply(null, thk.args);
        } else {
            throw new Error("Bad thunk");
        }
    }
};

// http://nathansuniversity.com/step1.html`
var evalExpr = function(expr, env, cont) {
    if(typeof expr === 'number') {
        return thunk(cont, expr);
    }
    switch(expr[0]) {
        case '+':
            return thunk(
                evalExpr, expr[1], env,
                function(v1) {
                    return thunk(
                        evalExpr, expr[2], env,
                        function(v2) {
                            return thunk(cont, v1 + v2);
                        }
                    );
                }
            );
        case '*':
            return thunk(
                evalExpr, expr[1], env,
                function(v1) {
                    return thunk(
                        evalExpr, expr[2], env,
                        function(v2) {
                            return thunk(cont, v1 * v2);
                        }
                    );
                }
            );        
        default:
            throw new Error("Unknown form");
    }
};

// http://nathansuniversity.com/step2.html
var step = function(state){
    var data = state.data;
    var done = state.done;
    if(done) 
        return;   
    if(data.tag === 'value') {
        state.data = data.val;
        state.done = true;
        return;
    }
    data = data.func.apply(null, data.args);
    state.data = data;    
}

// http://nathansuniversity.com/step3.html
var evalTwo = function (expr0, expr1, env) {
    var state1 = stepStart(expr0, env);
    var state2 = stepStart(expr1, env);
    while(!state1.done || !state2.done) {
        if(!state1.done) {
            step(state1);
        }
        if(!state2.done){
            step(state2);
        }
    }    
};

// http://nathansuniversity.com/step4.html
var evalDiv = function (top, bottom, env, cont, xcont) {
    // Here's the code for addition
    // to help you get going.
    return thunk(
        evalExpr, top, env,
        function(v1) {
            return thunk(
                evalExpr, bottom, env,
                function(v2) {
                    if(v2 !== 0){
                        return thunk(cont, v1 / v2);
                    }else{
                        return thunk(xcont, 'EXCEPTION!');
                    }
            }, xcont);
    }, xcont);
};