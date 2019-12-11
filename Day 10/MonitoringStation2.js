const fs = require('fs');
const data = fs.readFileSync('./in.txt', 'utf-8').split('\n');

const getQuarter = (station, x, y) => {
  if (y < station.y && x >= station.x) return 'Q1';
  else if (y >= station.y && x > station.x) return 'Q2';
  else if (y > station.y && x <= station.x) return 'Q3';
  else if (y <= station.y && x < station.x) return 'Q4';
};

const getClosest = (station, p1, p2) =>
  Math.abs(station.x - p1.x) + Math.abs(station.y - p1.y) <
  Math.abs(station.x - p2.x) + Math.abs(station.y - p2.y)
    ? p1
    : p2;

const getAstroidsInSight = (s, astroids) => {
  const inSight = [];
  astroids.forEach(ast => {
    ast.angle = (s.y - ast.y) / (ast.x - s.x);
    const onAngle = inSight.find(i => i.angle === ast.angle && i.q === ast.q);
    if (onAngle) {
      inSight[inSight.indexOf(onAngle)] = getClosest(s, onAngle, ast);
    } else {
      inSight.push(ast);
    }
  });
  return inSight;
};

const main = () => {
  const station = { x: 20, y: 21 };
  let astroids = [];
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      const element = data[y][x];
      if (element === '#' && !(x === station.x && y === station.y)) {
        astroids.push({ x, y, q: getQuarter(station, x, y) });
      }
    }
  }
  let destroyed = [];
  while (astroids.length > 1) {
    let inSight = getAstroidsInSight(station, astroids);
    inSight.sort((a, b) => {
      if (a.q === b.q) {
        return b.angle - a.angle;
      }
      return a.q > b.q ? 1 : -1;
    });
    destroyed = [...destroyed, ...inSight];
    astroids = astroids.filter(
      a => !inSight.some(d => a.x === d.x && a.y === d.y)
    );
  }
  console.log(destroyed[199].x * 100 + destroyed[199].y);
};

main();
