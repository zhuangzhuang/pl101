

type Tag = 'note' | 'seq' | 'par' | 'rest' | 'repeat'

interface IMusic {
    tag: Tag
    //seq|par
    left?: IMusic
    right?:  IMusic
    
    //note
    pitch?: string
    dur?: number

    //rest:
    duration?: number

    //repeat
    section?: IMusic
    count?: number
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
// http://nathansuniversity.com/music14.html

function compile(musxpr: IMusic): Array<ILinearMusic>{
    function innerCompile(expr: IMusic, time: number, res: Array<ILinearMusic>) {
        if(!expr){
            return 0;
        }
        var tag = expr.tag, t1, t2;
        if(tag === 'note'){
            var new_expr = {
                tag: 'note',
                pitch: expr.pitch,
                start: time,
                dur: expr.dur                
            };
            res.push(new_expr);
            return expr.dur + time;
        }
        if(tag === 'seq'){
            t1 = innerCompile(expr.left, time, res);
            t2 = innerCompile(expr.right, t1, res);
            return t2;
        }
        if(tag === 'par'){
            t1 = innerCompile(expr.left, time, res);
            t2 = innerCompile(expr.right, time, res);
            return t1 > t2? t1 : t2;
        }
        if(tag === 'repeat'){
            t1 = time;
            for(var i = 0; i < expr.count; i++){
                t1 = innerCompile(expr.section, t1, res);
            }
            return t1;
        }
    }
    var res = []
    innerCompile(musxpr, 0, res);
    return res;
}

// http://nathansuniversity.com/music4.html
var playMUS = function(expr) {
    return playNOTE(compile(expr));
};

// http://nathansuniversity.com/music13.html
function convertPitch(pitch: string): number {
    //sample: c4 => 60
    var map = {
        C: 0,
        D: 2,
        B: 11
    };
    return 12 + 12 * parseInt(pitch[1]) + map[pitch[0]];
}


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
// console.log(res);