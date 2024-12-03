const LoopyList = require('./LoopyList').LoopyList;

const parseInput = input => input[0].split('').map(i => parseInt(i));

const getSolution = (input, config) => {
  let count = input.length;
  [...Array(config.max - count).keys()].forEach(i => input.push(count + i + 1));
  let list = new LoopyList(input);

  for (let i = 0; i < config.moves; i++) {
    let pickups = list.slice(3);
    list.setDest(pickups);
    list.splice(pickups);
    list.setNext();
  }

  if (config.part === 1) {
    return list.getState();
  }

  list.setCurrent(1);
  return list.slice(2).reduce((a, b) => a.val * b.val);
};

Solver.solve(parseInput, getSolution, [{ moves: 100, max: 9 }, { moves: 10000000, max: 1000000 } ]);

// Part 1 solution: 149725386
// Part 2 solution: 538935646702
