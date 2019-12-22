let data = require('fs')
  .readFileSync('./input.txt', 'UTF-8')
  .split('\n');

const CMDS = {
  NEW: 'deal into new stack',
  CUT: 'cut',
  INC: 'deal with increment'
};

const part1 = () => {
  let deck = [...Array(10007).keys()];
  for (let i = 0; i < data.length; i++) {
    const cmd = data[i];
    if (cmd == CMDS.NEW) {
      deck = deck.reverse();
    } else if (cmd.startsWith(CMDS.CUT)) {
      let n = Number(cmd.split(' ')[1]);
      if (n < 0) n = deck.length - Math.abs(n);
      let cut = deck.splice(0, n);
      deck = [...deck, ...cut];
    } else if (cmd.startsWith(CMDS.INC)) {
      let n = Number(cmd.split(' ')[3]);
      let newDeck = [];
      for (let i = 0; i < deck.length; i++) {
        newDeck[(i * n) % deck.length] = deck[i];
      }
      deck = newDeck;
    }
  }
  console.log(deck.indexOf(2019));
};

part1(); //5472
