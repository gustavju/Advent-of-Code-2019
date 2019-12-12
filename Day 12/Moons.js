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

const applyVelocity = (moons, velocities) => {
  moons.forEach((moon, i) => {
    Object.keys(moon).forEach(key => (moon[key] += velocities[i][key]));
  });
};

const applyGravity = (moons, velocities) => {
  moons.forEach((moon, index) => {
    Object.keys(moon).forEach(key => {
      moons.forEach((innerMoon, innerIndex) => {
        if (innerIndex !== index) {
          if (innerMoon[key] > moon[key]) {
            velocities[index][key]++;
          } else if (innerMoon[key] < moon[key]) {
            velocities[index][key]--;
          }
        }
      });
    });
  });
};

const main = () => {
  let velocities = moons.map(() => ({ x: 0, y: 0, z: 0 }));
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

main();
