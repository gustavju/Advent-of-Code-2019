let min = 264793;
let max = 803935;

const checkNumber = number => {
  let hasDouble,
    isDec = true;
  let sNumber = number.toString().split('');
  let digits = sNumber.map(Number);
  for (let j = 0; j < sNumber.length; j++) {
    if (j) {
      hasDouble = hasDouble || digits[j] === digits[j - 1];
      isDec = isDec && digits[j] >= digits[j - 1];
    }
  }
  return hasDouble && isDec;
};

let res = [];
for (let i = min; i < max; i++) {
  let s = checkNumber(i);
  if (s) {
    res.push(i);
    console.log(i);
  }
}

console.log(res.length);
