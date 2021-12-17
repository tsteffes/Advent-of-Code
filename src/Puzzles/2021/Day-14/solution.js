const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  let res = { coords: [], folds: [] };
  for (line of input) {
    let a = line.match(/(?<x>[A-Z]+) -> (?<y>[A-Z]+)/);
    let b = line.match(/(?<val>[A-Z]+))/);
    if (a) {
      res.coords.push(a.groups);
    }
    else if (b) {
      res.folds.push(b.groups);
    }
  }

  return res;
};

let getSolution = (input, config) => {
  return
};

new Solver(2021, 14, io.readLines, getValues, getSolution, [{ part: 1 }, { part: 2 }]).solve();

// Part 1 solution:
// Part 2 solution:
