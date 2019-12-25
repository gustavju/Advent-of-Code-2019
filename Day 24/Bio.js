let data = require('fs')
  .readFileSync('./input.txt', 'UTF-8')
  .split('\n')
  .map(l => l.split(''));

const dir = {
  North: { x: 0, y: -1 },
  South: { x: 0, y: 1 },
  West: { x: -1, y: 0 },
  East: { x: 1, y: 0 }
};

const part1 = () => {
  let base = JSON.parse(JSON.stringify(data));
  let states = [];
  let found = false;
  while (!found) {
    base = JSON.parse(JSON.stringify(base));
    let copy = JSON.parse(JSON.stringify(base));
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        let current = base[row][col];
        let adjacentBug = 0;
        for (const key in dir) {
          let currDir = dir[key];
          let r = base[row + currDir.y];
          if (r == undefined) continue;
          let cell = r[col + currDir.x];
          if (cell !== undefined && cell === '#') {
            adjacentBug++;
          }
        }
        if (current === '#' && adjacentBug !== 1) {
          copy[row][col] = '.';
        } else if (current === '.' && (adjacentBug == 1 || adjacentBug == 2)) {
          copy[row][col] = '#';
        }
      }
    }
    base = copy;
    let str = base.map(r => r.join('')).join('');
    if (states.includes(str)) {
      found = true;
    }
    states.push(str);
  }
  console.log(base);
  console.log(calcDiversity(base));
};

const calcDiversity = grid => {
  let base = 1;
  let res = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '#') res += base;
      base *= 2;
    }
  }
  return res;
};

part1();
