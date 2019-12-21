const { IntCodeComp } = require('../Day 13/Game');
const inputData = require('fs')
  .readFileSync('./input.txt', 'UTF-8')
  .split(',')
  .map(Number);

const toAscii = s => s.split('').map(c => c.charCodeAt(0));

const run = () => {
  const baseConfig = {
    pointer: 0,
    relativeBase: 0,
    data: [...inputData],
    queue: [],
    done: false
  };

  let cmds = [
    'NOT A J',
    'NOT B T',
    'OR T J',
    'NOT C T',
    'OR T J',
    'AND D J',
    //'RUN'
    // Part 2
    'NOT I T',
    'NOT T T',
    'OR F T',
    'AND E T',
    'OR H T',
    'AND T J',
    'RUN'
  ];
  cmds.forEach(cmd => {
    baseConfig.queue.push(...toAscii(cmd), 10);
  });
  let out = IntCodeComp(baseConfig);
  out.forEach(c => {
    if (c < 255) {
      process.stdout.write(String.fromCharCode(c));
    } else {
      console.log(c);
    }
  });
};

run();
