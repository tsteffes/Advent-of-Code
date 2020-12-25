const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;
const LoopyList = require('./LoopyList').LoopyList;

let getValues = input => input[0].split('').map(i => parseInt(i));

let getSolution = (input, config, part) => {
  let count = input.length;
  [...Array(config.max - count).keys()].forEach(i => input.push(count + i + 1));
  let list = new LoopyList(input);

  for (let i = 0; i < config.moves; i++) {
    let pickups = list.slice(3);
    list.setDest(pickups);
    list.splice(pickups);
    list.setNext();
  }

  if (part === 1) {
    return list.getState();
  }

  list.setCurrent(1);
  return list.slice(2).reduce((a, b) => a.val * b.val);
};

new Solver(23, io.readLines, getValues, getSolution, [{ moves: 100, max: 9 }, { moves: 10000000, max: 1000000 } ]).solve();

// Part 1 solution: 149725386
// Part 2 solution: 538935646702
