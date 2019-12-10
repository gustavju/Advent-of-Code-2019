// Astroid at X:3, Y:1 will block 6:2 and so on.

// this -> just calc the formula for line between astroids. Only one astroid with same line can be seen.
// (a.Y - b.Y) / (a.X - b.X) = lutning
const fs = require('fs');
const data = fs.readFileSync('./in.txt', 'utf-8').split('\n');

let astroids = [];
const main = () => {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data.length; col++) {
      const element = data[row][col];
      if (element === '#') astroids.push({ x: col, y: row });
    }
  }
  let max = 0;
  astroids.forEach(a => {
    let count = getAstroidsInSight(a.x, a.y);
    if (count > max) {
      max = count;
    }
  });
  console.log(max);
};

const getAstroidsInSight = (x, y) => {
  let inSight = [];
  astroids.forEach(a => {
    let angle = (y - a.y) / (a.x - x);
    if (angle === 0) {
      angle += a.x > x ? 'b' : 't';
    } else {
      angle += a.y > y ? 'b' : 't';
    }
    if (!(x === a.x && y === a.y)) {
      let sameAngle = inSight.find(i => i.angle === angle);
      if (!sameAngle) {
        inSight.push({ ...a, angle });
      }
    }
  });
  return inSight.length;
};

main();
