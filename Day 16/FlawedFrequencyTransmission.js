const fs = require('fs');
let data = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('')
  .map(Number);

const BASE_PTRN = [0, 1, 0, -1];

const getLastDigit = currSum =>
  currSum.toString().split('')[currSum.toString().length - 1];

const part1 = () => {
  for (let phase = 0; phase < 100; phase++) {
    let res = [];
    for (let outerI = 1; outerI < data.length + 1; outerI++) {
      let currSum = 0;
      let baseDigitIndex = 0;
      for (let innerI = 1; innerI < data.length + 1; innerI++) {
        let innerDigit = data[innerI - 1];
        if (innerI % outerI == 0) {
          baseDigitIndex++;
          if (baseDigitIndex >= BASE_PTRN.length) {
            baseDigitIndex = 0;
          }
        }
        currSum += innerDigit * BASE_PTRN[baseDigitIndex];
      }
      let digit = getLastDigit(currSum);
      res.push(digit);
    }
    data = res;
  }
  console.log(data.join('').substr(0, 8));
};

part1();
