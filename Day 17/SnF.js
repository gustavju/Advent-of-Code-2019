const fs = require('fs');
const inputData = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(Number);
const { IntCodeComp } = require('../Day 13/Game');

const buildMap = (arr, display = false) => {
  let tot = 0;
  for (let rowI = 0; rowI < arr.length; rowI++) {
    const row = arr[rowI];
    for (let col = 0; col < row.length; col++) {
      const char = row[col];
      let charToPrint = char;
      if (
        rowI > 0 &&
        rowI < arr.length - 1 &&
        col > 0 &&
        col < row.length - 1 &&
        char === '#' &&
        arr[rowI - 1][col] === '#' &&
        arr[rowI][col - 1] === '#' &&
        arr[rowI + 1][col] === '#' &&
        arr[rowI][col + 1] === '#'
      ) {
        charToPrint = 'O';
        tot += rowI * col;
      }
      display && process.stdout.write(charToPrint.toString());
    }
    display && process.stdout.write('\n');
  }
  return tot;
};

const config = {
  pointer: 0,
  relativeBase: 0,
  data: [...inputData],
  queue: [],
  done: false
};

const part1 = () => {
  let arr = [];
  let row = [];
  let output = IntCodeComp(config);
  // 35 means #, 46 means ., 10
  output.forEach(char => {
    if (char === 10) {
      arr.push(row);
      console.log(row.length);
      row = [];
    } else {
      row.push(String.fromCharCode(char));
    }
  });
  console.log(arr.length);
  console.log(row.length);
  let tot = buildMap(arr, true);
  console.log(tot);
};
//part1();
// 6024

const part2 = () => {
  const config = {
    pointer: 0,
    relativeBase: 0,
    data: [...inputData],
    queue: [],
    done: false
  };

  config.data[0] = 2;

  /*
  Dirty and handmade ;(
  L12 L6 L8 R6 L8 L8 R4 R6 R6 L12 L6 L8 R6 L8 L8 R4 R6 R6 L12 R6 L8 L12 R6 L8 L8 L8 R4 R6 R6 L12 L6 L8 R6 L8 L8 R4 R6 R6 L12 R6 L8
  A : L12
  B : L6
  C : L8
  D : R6
  E : R4
  A B C D C C E D D A B C D C C E D D A D C A D C C C E D D A B C D C C E D D A D C
  A B C D  = L,12,L,6,L,8,R,6 => X
  C C E D D = L,8,L,8,R,4,R,6,R,6 => Y
  A D C = L,12,R,6,L8 => Z
  X Y X Y Z Z Y X Y Z => A B A B C C B A B C
  */

  const toAscii = s => s.split('').map(c => c.charCodeAt(0));
  let seq = toAscii('A,B,A,B,C,C,B,A,B,C');
  let A = toAscii('L,12,L,6,L,8,R,6');
  let B = toAscii('L,8,L,8,R,4,R,6,R,6');
  let C = toAscii('L,12,R,6,L,8');
  config.queue = [...seq, 10, ...A, 10, ...B, 10, ...C, 10, 'n', 10];
  while (!config.done) {
    const output = IntCodeComp(config);
    console.log(output[output.length - 1]);
  }
};
part2();
// 897344
