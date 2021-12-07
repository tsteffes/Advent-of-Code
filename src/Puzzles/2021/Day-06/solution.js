const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  let vals = input[0].split(',').map(v => parseInt(v, 10));
  let res = [];
  for (let i = 0; i < 9; i++) {
    res.push(vals.filter(v => v === i).length);
  }

  return res;
};

let getSolution = (values, config) => {
  for (let i = 0; i < config.days; i++) {
    let zeroCount = values.shift();
    values[6] += zeroCount;
    values.push(zeroCount);
  }

  return _.sum(values);
};

new Solver(2021, 6, io.readLines, getValues, getSolution, [{ part: 1, days: 80 }, { part: 2, days: 256 }]).solve();

// Part 1 solution: 351188
// Part 2 solution:
