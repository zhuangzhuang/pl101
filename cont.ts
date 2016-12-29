// http://nathansuniversity.com/cont1.html

var factorialCPS = function (n, cont) {
    if (n <= 1) {
        cont(1);
    } else {
        var new_cont = function (v) {
            return cont(n * v);
        };
        return factorialCPS(n-1, new_cont);
    }
};


// var a = { tag: "thunk",
//   func: f,
//   args: [1, 2] }

var thunk = function (f, lst) {
    return { tag: "thunk", func: f, args: lst };
};

// http://nathansuniversity.com/cont2.html
var factorialThunk = function (n, cont) {
    if (n <= 1) {
        return thunk(cont, [1]); // update
    } else {
        var new_cont = function (v) {
            return thunk(cont, [n * v]); // update
        };
        return thunk(factorialThunk, [n - 1, new_cont]); // update
    }
};

// http://nathansuniversity.com/cont3.html
var bigSum = function (n) {
    var sum_t = sumThunk(n, thunkValue});
    return trampoline(sum_t);
};