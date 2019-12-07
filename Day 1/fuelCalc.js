const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./indata.txt'),
  console: false
});

let tot = 0;
readInterface.on('line', line => {
  const num = Number(line);
  const answer = Math.floor(num / 3) - 2;
  tot += answer;
});

readInterface.on('close', () => console.log(tot));
