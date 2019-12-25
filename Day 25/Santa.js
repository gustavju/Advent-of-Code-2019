const indata = require('fs')
  .readFileSync('./input.txt', 'UTF-8')
  .split(',')
  .map(Number);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { IntCodeComp } = require('../Day 13/Game');

const toAscii = s => s.split('').map(c => c.charCodeAt(0));

let cmds = [
  'south',
  'take spool of cat6',
  'west',
  'take space heater',
  'south',
  'take shell',
  'north',
  'north',
  'take weather machine',
  'north',
  'west',
  'west',
  'take whirled peas',
  'east',
  'east',
  'south',
  'west',
  'south',
  'east',
  'take candy cane',
  'west',
  'south',
  'take space law space brochure',
  'west',
  'east',
  'north',
  'north',
  'east',
  'south',
  'east',
  'east',
  'south',
  'take hypercube',
  'south',
  'south',
  'drop spool of cat6',
  // =======
  //'drop weather machine',
  //'drop candy cane',
  //'drop shell',
  'drop space law space brochure',
  'drop space heater',
  'drop whirled peas',
  // ======
  'east'
];

let items = [
  'weather machine',
  'candy cane',
  'shell',
  'space law space brochure',
  'space heater',
  'whirled peas',
  'hypercube', //<- this
  'spool of cat6' // <- not this
];

let asciiCMDS = [];
cmds.forEach(c => {
  asciiCMDS.push(...toAscii(c), 10);
});

const baseConfig = {
  pointer: 0,
  relativeBase: 0,
  data: [...indata],
  queue: asciiCMDS,
  done: false
};

let out = IntCodeComp(baseConfig);
out.forEach(c => {
  if (c < 255) {
    let currChar = String.fromCharCode(c);
    process.stdout.write(currChar);
  } else {
    console.log(c);
  }
});

rl.on('line', answer => {
  if (answer === 's') answer = 'south';
  if (answer === 'n') answer = 'north';
  if (answer === 'e') answer = 'east';
  if (answer === 'w') answer = 'west';
  baseConfig.queue.push(...toAscii(answer), 10);
  let out = IntCodeComp(baseConfig);
  out.forEach(c => {
    if (c < 255) {
      process.stdout.write(String.fromCharCode(c));
    } else {
      console.log(c);
    }
  });
});
