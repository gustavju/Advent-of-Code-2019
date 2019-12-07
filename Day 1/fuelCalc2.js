const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./indata.txt'),
  console: false
});

let tot = 0;
const calcFuel = num => Math.floor(num / 3) - 2;

readInterface.on('line', line => {
  let answer = Number(line);
  do {
    answer = calcFuel(answer);
    if (answer > 0) tot += answer;
  } while (answer > 0);
});

readInterface.on('close', () => console.log(tot));
