const indata = require('fs')
  .readFileSync('./input.txt', 'UTF-8')
  .split(',')
  .map(Number);

const { IntCodeComp } = require('../Day 13/Game');

const config = {
  pointer: 0,
  relativeBase: 0,
  data: [...indata],
  queue: [],
  done: false,
  id: 0
};

const main = () => {
  let cfgs = [];
  for (let i = 0; i < 50; i++) {
    cfgs.push({
      ...JSON.parse(JSON.stringify(config)),
      queue: [i],
      id: i
    });
  }
  let idleComps = 0;
  let NAT = [];
  let lastNATYmsg;
  while (!cfgs[49].done) {
    for (let currCfg = 0; currCfg < cfgs.length; currCfg++) {
      if (cfgs[currCfg].queue.length === 0) {
        cfgs[currCfg].queue.push(-1);
        idleComps++;
      } else {
        idleComps = 0;
      }

      if (idleComps == cfgs.length) {
        cfgs[0].queue.push(...NAT);
        if (lastNATYmsg === NAT[1]) {
          console.log('Part2:', lastNATYmsg);
          process.exit();
        }
        lastNATYmsg = NAT[1];
      }

      let output = IntCodeComp(cfgs[currCfg]);

      while (output.length) {
        let [adress, x, y] = output.splice(0, 3);
        if (adress === 255) {
          NAT[1] === undefined && console.log('Part1:', y);
          NAT = [x, y];
        } else {
          cfgs[adress].queue.push(x, y);
        }
      }
    }
  }
};

main();
