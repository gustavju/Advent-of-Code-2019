const fs = require('fs');
let data = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('')
  .map(Number);

const basePattern = [0, 1, 0, -1];

const getLastDigit = sum => sum.toString().split('')[sum.toString().length - 1];

const part1 = () => {
  let digits = [...data];
  for (let phase = 0; phase < 100; phase++) {
    for (let j = 0; j < digits.length; j++) {
      let sum = 0;
      let baseDigit = 0;
      for (let i = 0; i < digits.length; i++) {
        if ((i + 1) % (j + 1) == 0) {
          baseDigit = baseDigit + 1 >= basePattern.length ? 0 : baseDigit + 1;
        }
        sum += digits[i] * basePattern[baseDigit];
      }
      digits[j] = getLastDigit(sum);
    }
  }
  console.log(digits.slice(0, 8).join(''));
};

part1();
// 68764632

const repeatArray = (arr, repeats) =>
  [].concat(...Array.from({ length: repeats }, () => arr));

const part2 = () => {
  const msgOffset = Number(data.slice(0, 7).join(''));
  const times = Math.ceil((data.length * 10000 - msgOffset) / data.length);
  const digits = repeatArray(data, times).slice(msgOffset % data.length);

  for (let i = 0; i < 100; i++) {
    for (let j = digits.length - 2; j >= 0; j--) {
      const digit = digits[j] + digits[j + 1];
      digits[j] = Math.abs(digit) % 10;
    }
  }

  console.log(digits.slice(0, 8).join(''));
};

part2();
// 52825021
