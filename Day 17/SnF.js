const fs = require('fs');
const inputData = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(Number);
const comp = require('../Day 13/Game');

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
  let output = comp.IntCodeComp(config);
  // 35 means #, 46 means ., 10
  output.forEach(char => {
    if (char === 10) {
      arr.push(row);
      row = [];
    } else {
      row.push(String.fromCharCode(char));
    }
  });
  let tot = 0;
  for (let rowI = 1; rowI < arr.length - 1; rowI++) {
    const row = arr[rowI];
    for (let col = 1; col < row.length - 1; col++) {
      const char = row[col];
      if (
        char === '#' &&
        arr[rowI - 1][col] === '#' &&
        arr[rowI][col - 1] === '#' &&
        arr[rowI + 1][col] === '#' &&
        arr[rowI][col + 1] === '#'
      ) {
        process.stdout.write('O');
        tot += rowI * col;
      } else {
        process.stdout.write(char.toString());
      }
    }
    process.stdout.write('\n');
  }
  console.log(tot);
};

// part1();
// 6024
