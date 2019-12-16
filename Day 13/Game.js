const fs = require('fs');
const inputData = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(Number);

const runIntCodeComp = cfg => {
  const outputVal = [];
  const getIndex = (parameterMode, argIndex) => {
    // Parametermode 0 = positionMode, 1 = immediate mode, 2 = relativeMode;
    switch (parameterMode) {
      case '0':
        return cfg.data[argIndex];
      case '1':
        return argIndex;
      case '2':
        return cfg.relativeBase + cfg.data[argIndex];
    }
  };
  const getVal = index => (cfg.data[index] == undefined ? 0 : cfg.data[index]);

  while (cfg.pointer < cfg.data.length) {
    let opCode = cfg.data[cfg.pointer].toString();
    while (opCode.length < 5) {
      opCode = '0' + opCode;
    }
    const [mode3, mode2, mode1, op2, op1] = opCode.split('');
    if (op1 == 9 && op2 == 9) {
      cfg.done = true;
      return outputVal;
    }
    const p1 = getIndex(mode1, cfg.pointer + 1);
    const p2 = getIndex(mode2, cfg.pointer + 2);
    const p3 = getIndex(mode3, cfg.pointer + 3);

    switch (op1) {
      case '1':
        cfg.data[p3] = getVal(p1) + getVal(p2);
        cfg.pointer += 4;
        break;
      case '2':
        cfg.data[p3] = getVal(p1) * getVal(p2);
        cfg.pointer += 4;
        break;
      case '3':
        if (cfg.queue.length < 1) {
          return outputVal;
        }
        cfg.data[p1] = cfg.queue.shift();
        cfg.pointer += 2;
        break;
      case '4':
        outputVal.push(cfg.data[p1]);
        cfg.pointer += 2;
        break;
      case '5':
        cfg.pointer = getVal(p1) != 0 ? getVal(p2) : cfg.pointer + 3;
        break;
      case '6':
        cfg.pointer = getVal(p1) == 0 ? getVal(p2) : cfg.pointer + 3;
        break;
      case '7':
        cfg.data[p3] = getVal(p1) < getVal(p2) ? 1 : 0;
        cfg.pointer += 4;
        break;
      case '8':
        cfg.data[p3] = getVal(p1) == getVal(p2) ? 1 : 0;
        cfg.pointer += 4;
        break;
      case '9':
        cfg.relativeBase += getVal(p1);
        cfg.pointer += 2;
        break;
    }
  }
};

const Type = {
  EMPTY: 0,
  WALL: 1,
  BLOCK: 2,
  PADDLE: 3,
  BALL: 4
};

const part1 = () => {
  const config = {
    pointer: 0,
    relativeBase: 0,
    data: [...inputData],
    queue: []
  };
  const pixels = [];
  const output = runIntCodeComp(config);
  for (let i = 0; i < output.length; i += 3) {
    const [x, y, tile] = output.slice(i, i + 3);
    let pixel = pixels.find(p => p.x === x && p.y === y);
    if (pixel === undefined) {
      pixels.push({ x, y, tile });
    } else {
      pixel.tile = tile;
    }
  }
  console.log(pixels.filter(p => p.tile === 2).length);
};

const display = async (pixels, dims, score, delay) => {
  const tileChars = [' ', '\u2593', '\u2592', '\u2582', '\u25CF'];
  if (dims.x === undefined) {
    dims.x = {
      min: pixels.reduce((p, c) => (p.x < c.x ? p : c)).x,
      max: pixels.reduce((p, c) => (p.x > c.x ? p : c)).x
    };
    dims.y = {
      min: pixels.reduce((p, c) => (p.y < c.y ? p : c)).y,
      max: pixels.reduce((p, c) => (p.y > c.y ? p : c)).y
    };
  }
  process.stdout.write('\033c');
  for (let row = dims.y.min; row <= dims.y.max; row++) {
    for (let col = dims.x.min; col <= dims.x.max; col++) {
      const pixel = pixels.find(c => c.y == row && c.x == col);
      if (pixel) {
        process.stdout.write(tileChars[pixel.tile]);
      }
    }
    process.stdout.write('\n');
  }
  process.stdout.write(`Score: ${score}`);
  await sleep(delay);
};

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const part2 = async (withDisplay = false, delay = 50) => {
  inputData[0] = 2; // set free to play
  const config = {
    pointer: 0,
    relativeBase: 0,
    data: [...inputData],
    queue: [],
    done: false
  };
  let score = 0;
  const pixels = [];
  const dims = {};
  let ballX, paddleX;
  while (!config.done) {
    const output = runIntCodeComp(config);
    for (let i = 0; i < output.length; i += 3) {
      const [x, y, type] = output.slice(i, i + 3);
      if (x === -1 && y === 0) {
        score = type;
        continue;
      } else if (type == Type.BALL) {
        ballX = x;
      } else if (type == Type.PADDLE) {
        paddleX = x;
      }

      let pixel = pixels.find(p => p.x === x && p.y === y);
      if (pixel === undefined) {
        pixels.push({ x, y, tile: type });
      } else {
        pixel.tile = type;
      }
    }
    let input = 0;
    if (paddleX < ballX) {
      input = 1;
    } else if (paddleX > ballX) {
      input = -1;
    }
    config.queue.push(input);
    if (withDisplay) {
      await display(pixels, dims, score, delay);
    }
  }
  console.log(score);
};

module.exports.part2 = part2;
module.exports.part1 = part1;
module.exports.IntCodeComp = runIntCodeComp;
