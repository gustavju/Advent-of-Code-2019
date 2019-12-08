const fs = require('fs');
const data = fs.readFileSync('./in.txt', 'utf-8');
const W = 25;
const H = 6;

const layerData = [];
let layer;
for (let i = 0; i < data.length; i++) {
  if (i % (W * H) == 0) {
    if (layer) {
      layerData.push(layer);
    }
    layer = { zeros: 0, ones: 0, twos: 0 };
  }
  if (data[i] == 0) layer.zeros++;
  else if (data[i] == 1) layer.ones++;
  else if (data[i] == 2) layer.twos++;
}
layerData.push(layer);

const lowestZ = layerData.reduce((p, c) => (p.zeros < c.zeros ? p : c));
console.log(lowestZ.ones * lowestZ.twos);
