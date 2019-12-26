const fs = require('fs');
const data = fs.readFileSync('./Day 20/input.txt', 'UTF-8');

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

const parseMap = () => {
  const map = new Map();
  data.split('\n').forEach((row, rowIndex) => {
    row.split('').forEach((char, colIndex) => {
      if (char !== ' ' && char !== '#') {
        map.set(`${colIndex}:${rowIndex}`, { x: colIndex, y: rowIndex, char });
      }
    });
  });
  for (const [key, item] of map) {
    if (item.char !== '.') continue;
    for (const [x, y] of dirs) {
      let letter = map.get(`${item.x + x}:${item.y + y}`);
      if (letter && letter.char !== '.') {
        const nextLetter = map.get(`${item.x + x + x}:${item.y + y + y}`);
        letter.exit = key;
        letter.isPortal = true;
        letter.name =
          y + x === -1
            ? nextLetter.char + letter.char
            : letter.char + nextLetter.char;
      }
    }
  }
  map.forEach((item, key) => {
    if (item.char !== '.' && !item.exit) {
      map.delete(key);
    }
  });
  let portals = [...map.values()].filter(p => p.isPortal);
  portals.forEach(p => {
    let destination = portals.find(d => d.name === p.name && p !== d);
    if (destination) p.match = destination.exit;
  });
  return [portals, map];
};

const getMappings = (portals, map) => {
  const mappings = new Map();
  portals.forEach(portal => {
    mappings.set(portal.exit, getConnections(map, portal));
  });
  return mappings;
};

const getConnections = (map, start) => {
  const destinations = [];
  const visited = new Set(start.exit);
  const queue = [{ coord: start.exit, steps: 0 }];
  while (queue.length) {
    let { coord, steps } = queue.shift();
    let { x, y } = map.get(coord);
    for (const [dirX, dirY] of dirs) {
      const nextKey = `${x + dirX}:${y + dirY}`;
      if (visited.has(nextKey)) continue;
      const next = map.get(nextKey);
      if (!next) continue;
      if (next.isPortal) {
        if (next.name === 'AA' || next.exit === start.exit) continue;
        let isOuter =
          next.y === 115 || next.x === 1 || next.y === 1 || next.x === 113;

        destinations.push({
          ...next,
          steps: steps + 1,
          isOuter
        });
        visited.add(nextKey);
        continue;
      }
      queue.push({ coord: nextKey, steps: steps + 1 });
      visited.add(nextKey);
    }
  }
  return destinations;
};

const part1 = () => {
  const [portals, map] = parseMap();
  let mappings = getMappings(portals, map);
  let start = portals.find(p => p.name === 'AA').exit;
  const visited = new Set(start);
  const queue = [{ coord: start, steps: 0 }];
  while (queue.length) {
    let { coord, steps } = queue.shift();
    let destinations = mappings.get(coord);
    for (const d of destinations) {
      if (d.name === 'ZZ') {
        console.log('Part1:', steps + d.steps - 1);
        return;
      }
      if (visited.has(d.match)) continue;
      queue.push({ coord: d.match, steps: steps + d.steps });
      visited.add(d.match);
    }
  }
};

part1(); // 484

const part2 = () => {
  const [portals, map] = parseMap();
  let mappings = getMappings(portals, map);
  let start = portals.find(p => p.name === 'AA').exit;
  const visited = new Set();
  const queue = [{ coord: start, steps: 0, level: 0 }];
  while (queue.length) {
    let { coord, steps, level } = queue.shift();
    let destinations = mappings.get(coord);
    for (const d of destinations) {
      if (level === 0 && d.name === 'ZZ') {
        console.log('Part2', steps + d.steps - 1);
        return;
      }
      if (
        (level === 0 && d.isOuter) ||
        d.name === 'ZZ' ||
        visited.has(`${d.match}:${level}`)
      )
        continue;
      queue.push({
        coord: d.match,
        steps: steps + d.steps,
        level: d.isOuter ? level - 1 : level + 1
      });
      visited.add(`${d.match}:${level}`);
    }
  }
};

part2();

// 5754
