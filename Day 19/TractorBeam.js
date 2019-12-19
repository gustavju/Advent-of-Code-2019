const { IntCodeComp } = require('../Day 13/Game');
const fs = require('fs');
const inputData = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(Number);

const STATE = {
  NonBeam: 0,
  Beam: 1
};

const display = grid => {
  const blockChars = ['0', '1'];
  let dims = {
    x: {
      min: grid.reduce((p, c) => (p.x < c.x ? p : c)).x,
      max: grid.reduce((p, c) => (p.x > c.x ? p : c)).x
    },
    y: {
      min: grid.reduce((p, c) => (p.y < c.y ? p : c)).y,
      max: grid.reduce((p, c) => (p.y > c.y ? p : c)).y
    }
  };
  for (let row = dims.y.min; row <= dims.y.max; row++) {
    for (let col = dims.x.min; col <= dims.x.max; col++) {
      const cell = grid.find(c => c.y == row && c.x == col);
      if (cell) {
        process.stdout.write(blockChars[cell.state]);
      }
      //else {process.stdout.write(blockChars[0]);}
    }
    process.stdout.write('\n');
  }
};

const part1 = () => {
  const grid = [];
  const baseConfig = {
    pointer: 0,
    relativeBase: 0,
    data: [...inputData],
    queue: [],
    done: false
  };
  for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 50; col++) {
      let deepCopy = JSON.parse(JSON.stringify(baseConfig));
      deepCopy.queue.push(row);
      deepCopy.queue.push(col);
      let output = IntCodeComp(deepCopy);
      grid.push({ x: col, y: row, state: output[0] });
    }
  }
  let beams = grid.filter(c => c.state === STATE.Beam);
  display(grid);
  console.log(beams.length);
};

part1();
