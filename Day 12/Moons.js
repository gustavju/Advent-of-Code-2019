const fs = require('fs');
const moons = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(p => {
    let s = p.split(',');
    let x = Number(s[0].substring(s[0].indexOf('=') + 1, s[0].length));
    let y = Number(s[1].substring(s[1].indexOf('=') + 1, s[1].length));
    let z = Number(s[2].substring(s[2].indexOf('=') + 1, s[2].length - 1));
    return { x, y, z };
  });
let velocities = moons.map(() => ({ x: 0, y: 0, z: 0 }));

const applyVelocity = (moons, velocities) => {
  moons.forEach((moon, i) => {
    Object.keys(moon).forEach(key => (moon[key] += velocities[i][key]));
  });
};

const applyGravity = (moons, velocities) => {
  moons.forEach((moon, index) => {
    Object.keys(moon).forEach(key => {
      moons.forEach(innerMoon => {
        if (innerMoon[key] > moon[key]) {
          velocities[index][key]++;
        } else if (innerMoon[key] < moon[key]) {
          velocities[index][key]--;
        }
      });
    });
  });
};

const part1 = () => {
  for (let loops = 0; loops < 1000; loops++) {
    applyGravity(moons, velocities);
    applyVelocity(moons, velocities);
  }

  let tot = 0;
  for (let index = 0; index < moons.length; index++) {
    let pos = 0;
    let vel = 0;
    Object.keys(moons[index]).forEach(key => {
      pos += Math.abs(moons[index][key]);
      vel += Math.abs(velocities[index][key]);
    });
    tot += pos * vel;
  }
  console.log(tot);
};

const gcd = (a, b) => {
  var t = 0;
  a < b && ((t = b), (b = a), (a = t)); // swap them if a < b
  t = a % b;
  return t ? gcd(b, t) : b;
};

const lcm = (a, b) => (a / gcd(a, b)) * b;

const part2 = () => {
  const initPos = JSON.parse(JSON.stringify(moons));
  const initVel = JSON.parse(JSON.stringify(velocities));
  let intervals = {};
  let steps = 0;
  while (Object.keys(intervals).length < 3) {
    applyGravity(moons, velocities);
    applyVelocity(moons, velocities);
    steps++;
    Object.keys(moons[0]).forEach(key => {
      let repeat = true;
      for (let i = 0; i < moons.length; i++) {
        repeat =
          repeat &&
          moons[i][key] === initPos[i][key] &&
          velocities[i][key] === initVel[i][key];
      }
      if (repeat && intervals[key] === undefined) {
        intervals[key] = steps;
      }
    });
  }
  let xy = lcm(intervals.x, intervals.y);
  console.log(lcm(xy, intervals.z));
};

module.exports.part1 = part1;
module.exports.part2 = part2;
