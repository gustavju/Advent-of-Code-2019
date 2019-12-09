const fs = require('fs');
const data = fs.readFileSync('./in.txt', 'utf-8').split('\n');
const orbits = {};

data.forEach(line => {
  const [parent, child] = line.split(')');
  orbits[child] = parent;
});

const countOrbits = () => {
  let numberOfOrbits = 0;
  Object.keys(orbits).forEach(c => {
    let parentPlanet = orbits[c];
    while (parentPlanet) {
      parentPlanet = orbits[parentPlanet];
      numberOfOrbits++;
    }
  });
  return numberOfOrbits;
};

console.log(countOrbits());
