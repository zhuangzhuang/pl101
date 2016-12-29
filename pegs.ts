// from:
// "x = 1 + 2 * 3;"
// to:
// { tag: 'assign',
//   dest: 'x',
//   expr: { tag: 'plus',
//           left: { tag: 'num', val: 1 },
//           right: { tag: 'times',
//                    left: { tag: 'num', val: 2 },
//                    right: { tag: 'num', val: 3 }}}}





