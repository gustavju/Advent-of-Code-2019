const fs = require('fs');
const conversions = {};
let leftOvers = {};
fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .forEach(line => {
    let [inputs, o] = line.split('=>');
    inputs = inputs.split(',').map(input => {
      input = input.trim();
      let [amt, id] = input.split(' ');
      return { id, amt };
    });
    let [amt, id] = o.trim().split(' ');
    conversions[id] = {
      id,
      amt,
      inputs
    };
    leftOvers[id] = 0;
  });

const getOre = (element, leftOvers, amtWanted) => {
  let { id, amt, inputs } = element;
  let ore = 0;
  let qtyNeeded;
  if (leftOvers[id] === 0) {
    qtyNeeded = amtWanted;
  } else {
    if (leftOvers[id] > amtWanted) {
      leftOvers[id] -= amtWanted;
      qtyNeeded = 0;
    } else {
      amtWanted -= leftOvers[id];
      leftOvers[id] = 0;
      qtyNeeded = amtWanted;
    }
  }
  if (qtyNeeded === 0) {
    return 0;
  }
  const batches = Math.ceil(qtyNeeded / amt);
  const leftover = batches * amt - qtyNeeded;
  leftOvers[id] += leftover;
  inputs.forEach(input => {
    if (input.id == 'ORE') {
      ore += input.amt * batches;
    } else {
      ore += getOre(conversions[input.id], leftOvers, input.amt * batches);
    }
  });

  return ore;
};

const part1 = () => {
  console.log(getOre(conversions['FUEL'], leftOvers, 1));
};

const part2 = () => {
  let low = 0;
  let high = 1e12;
  let mid;
  while (true) {
    if (high < low || high === low) break;
    mid = Math.floor((high + low) / 2);
    let current = getOre(conversions['FUEL'], leftOvers, mid);
    if (1e12 < current) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  console.log(mid);
};

part1();
part2();

// part1 1185296
// part2 1376631
