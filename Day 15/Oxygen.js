const { IntCodeComp } = require('../Day 13/Game');
const fs = require('fs');
const inputData = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(Number);

const dir = {
  North: { code: 1, x: 0, y: -1 },
  South: { code: 2, x: 0, y: 1 },
  West: { code: 3, x: -1, y: 0 },
  East: { code: 4, x: 1, y: 0 }
};

const blocks = {
  Wall: 0,
  Empty: 1,
  OxygenSystem: 2
};

const baseConfig = {
  pointer: 0,
  relativeBase: 0,
  data: [...inputData],
  queue: [],
  done: false
};

const display = grid => {
  const blockChars = ['\u2593\u2593', '  ', 'XX'];
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
      if (row === 0 && col === 0) {
        process.stdout.write('🤖🤖');
      } else {
        const cell = grid.find(c => c.y == row && c.x == col);
        if (cell) {
          process.stdout.write(blockChars[cell.block]);
        } else {
          process.stdout.write(blockChars[0]);
        }
      }
    }
    process.stdout.write('\n');
  }
};

const buildGrid = () => {
  const grid = [{ x: 0, y: 0, block: 1 }];
  let start = { x: 0, y: 0 };
  let queue = [];
  queue.push({
    config: baseConfig,
    coords: start,
    steps: 1
  });
  while (queue.length) {
    let { config, coords, steps } = queue.shift();
    for (const key in dir) {
      const currDir = dir[key];
      const x = coords.x + currDir.x;
      const y = coords.y + currDir.y;

      let isVisited = grid.find(pos => pos.x === x && pos.y === y);
      if (isVisited) continue;

      const dirConfig = JSON.parse(JSON.stringify(config));
      dirConfig.queue.push(currDir.code);
      let block = IntCodeComp(dirConfig)[0];

      grid.push({ x, y, block, steps: steps });
      if (block === blocks.Empty) {
        queue.push({
          config: JSON.parse(JSON.stringify(dirConfig)),
          coords: { x, y },
          steps: steps + 1
        });
      }
    }
  }
  return grid;
};

const part1 = (withDisplay = false) => {
  const grid = buildGrid();
  if (withDisplay) {
    display(grid);
  }
  let oxygenSystem = grid.find(c => c.block === blocks.OxygenSystem);
  console.log(oxygenSystem.steps);
};

part1();
// 216

const countGrid = grid => {
  let oxygenSystem = grid.find(c => c.block === blocks.OxygenSystem);
  oxygenSystem.steps = 0;
  let queue = [oxygenSystem];
  while (queue.length) {
    let cell = queue.shift();
    for (const key in dir) {
      let x = cell.x + dir[key].x;
      let y = cell.y + dir[key].y;
      let nextCell = grid.find(pos => pos.x === x && pos.y === y);
      if (
        nextCell &&
        nextCell.block === blocks.Empty &&
        nextCell.steps > cell.steps + 1
      ) {
        nextCell.steps = cell.steps + 1;
        queue.push(nextCell);
      }
    }
  }
  return grid;
};

const part2 = () => {
  grid = buildGrid();
  grid.forEach(c => (c.steps = Infinity)); // clear steps from Robot
  grid = countGrid(grid);
  let max = grid
    .filter(c => c.block === blocks.Empty)
    .reduce((p, c) => (p.steps > c.steps ? p : c)).steps;
  console.log(max);
};

part2();
// 326
