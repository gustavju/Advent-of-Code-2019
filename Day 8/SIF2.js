const fs = require('fs');
let data = fs.readFileSync('./in.txt', 'utf-8');
const W = 25;
const H = 6;
// 0: Black, 1: White, 2: Transparent
let layers = [];
let layer = [];
for (let i = 0; i < data.length; i++) {
  if (i != 0 && i % (W * H) == 0) {
    layers.push(layer);
    layer = [];
  }
  layer.push(data[i]);
}
layers.push(layer);

let resLayer = [];
for (let pxIndex = 0; pxIndex < layers[0].length; pxIndex++) {
  let pxColor = 2;
  for (let layer = 0; layer < layers.length; layer++) {
    if (layers[layer][pxIndex] < pxColor) {
      resLayer.push(layers[layer][pxIndex]);
      break;
    }
  }
}

resLayer.forEach((px, i) => {
  if (i != 0 && i % 25 == 0) process.stdout.write('\n');
  px == 0 ? process.stdout.write('  ') : process.stdout.write('\u2592\u2592');
});
