const fs = require('fs');
const data = fs.readFileSync('./in.txt', 'utf-8');
const orbits = {};
data.split('\n').forEach(line => {
  const [parent, child] = line.split(')');
  orbits[child] = parent;
});

const getParents = planetName => {
  const parents = [];
  let parentPlanet = orbits[planetName];
  let count = 0;
  while (parentPlanet) {
    parents.push({ id: parentPlanet, steps: count++ });
    parentPlanet = orbits[parentPlanet];
  }
  return parents;
};

const getLowestCommon = () => {
  const uParents = getParents('YOU');
  const sParents = getParents('SAN');
  // first common is lowest, when arrs orderd low -> high
  const common = uParents.filter(p => sParents.some(s => p.id === s.id))[0].id;
  return (
    uParents.find(u => u.id === common).steps +
    sParents.find(s => s.id === common).steps
  );
};

console.log(getLowestCommon());
