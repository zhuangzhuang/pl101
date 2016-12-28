

type Tag = 'note' | 'seq' | 'par'

interface IMusic {
    tag: Tag
    left?: IMusic
    right?:  IMusic
    
    pitch?: string
    dur?: number
}


// http://nathansuniversity.com/music.html
function prelude(expr: IMusic) : IMusic{
    var data = {
        tag: 'seq',
        left: {
            tag: 'note',
            pitch: 'd4',
            dur: 500
        },
        right: expr
    }
    return data;
}

// http://nathansuniversity.com/music1.html
function reverse(expr: IMusic): IMusic {
    if(expr.tag === 'note'){
        return expr;
    }
    var new_expr = {
        tag: 'seq',
        left: reverse(expr.right),
        right: reverse(expr.left)
    }
    return new_expr;
}

// http://nathansuniversity.com/music2.html
function endTime(time: number, expr: IMusic): number {
    // function innerSum(expr: IMusic) : number{
    //     if(expr.tag === 'note'){
    //         return expr.dur;
    //     }else{
    //         return innerSum(expr.left) + innerSum(expr.right);
    //     }
    // }
    // return time + innerSum(expr);
    if(expr.tag === 'note')
        return time + expr.dur;
    return endTime(endTime(time, expr.left), expr.right);
}

interface ILinearMusic {
    tag: string
    pitch: string
    start: number
    dur: number
}

// http://nathansuniversity.com/music3.html
// http://nathansuniversity.com/music6.html

function compile(musxpr: IMusic): Array<ILinearMusic>{
    function innerCompile(expr: IMusic, time: number, res: Array<ILinearMusic>) {
        if(!expr){
            return 0;
        }
        var tag = expr.tag;
        if(tag === 'note'){
            var new_expr = {
                tag: 'note',
                pitch: expr.pitch,
                start: time,
                dur: expr.dur,                
            };
            res.push(new_expr);
            return expr.dur + time;
        }
        if(tag === 'seq'){
            var t1 = innerCompile(expr.left, time, res);
            var t2 = innerCompile(expr.right, t1, res);
            return t2;
        }
        var t1 = innerCompile(expr.left, time, res);
        var t2 = innerCompile(expr.right, time, res);
        return t1 > t2? t1 : t2;
    }
    var res = []
    innerCompile(musxpr, 0, res);
    return res;
}

// http://nathansuniversity.com/music4.html
var playMUS = function(expr) {
    return playNOTE(compile(expr));
};



// ------------- test --------------
var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'par',
         left: { tag: 'note', pitch: 'c3', dur: 250 },
         right: { tag: 'note', pitch: 'g4', dur: 500 } },
      right:
       { tag: 'par',
         left: { tag: 'note', pitch: 'd3', dur: 500 },
         right: { tag: 'note', pitch: 'f4', dur: 250 } } };

var res = compile(melody2_mus);
console.log(res);