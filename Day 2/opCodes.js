let data = [
  1,
  0,
  0,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  1,
  13,
  19,
  1,
  9,
  19,
  23,
  2,
  13,
  23,
  27,
  2,
  27,
  13,
  31,
  2,
  31,
  10,
  35,
  1,
  6,
  35,
  39,
  1,
  5,
  39,
  43,
  1,
  10,
  43,
  47,
  1,
  5,
  47,
  51,
  1,
  13,
  51,
  55,
  2,
  55,
  9,
  59,
  1,
  6,
  59,
  63,
  1,
  13,
  63,
  67,
  1,
  6,
  67,
  71,
  1,
  71,
  10,
  75,
  2,
  13,
  75,
  79,
  1,
  5,
  79,
  83,
  2,
  83,
  6,
  87,
  1,
  6,
  87,
  91,
  1,
  91,
  13,
  95,
  1,
  95,
  13,
  99,
  2,
  99,
  13,
  103,
  1,
  103,
  5,
  107,
  2,
  107,
  10,
  111,
  1,
  5,
  111,
  115,
  1,
  2,
  115,
  119,
  1,
  119,
  6,
  0,
  99,
  2,
  0,
  14,
  0
];

const calc = (noun, verb) => {
  let d = [...data];
  d[1] = noun;
  d[2] = verb;
  for (let i = 0; i < d.length; i += 4) {
    const [op, p1, p2, p3] = d.slice(i, i + 4);
    switch (op) {
      case 1:
        d[p3] = d[p1] + d[p2];
        break;
      case 2:
        d[p3] = d[p1] * d[p2];
        break;
      case 99:
        return d[0];
      default:
    }
  }
};

let noun = 0,
  verb = 0,
  answer;

for (let i = 0; i <= 99; i++) {
  noun = i;
  for (let j = 0; j <= 99; j++) {
    verb = j;
    let answer = calc(noun, verb);
    if (answer === 19690720) {
      console.log(noun, verb);
    }
  }
}
