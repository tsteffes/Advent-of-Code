const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => _.map(input, d => parseInt(d, 10));

let getSolution = (values, config) => {
  let res = 0;
  let prev = 0;
  for (let i = config.window; i < values.length; i++) {
    let sum = 0;
    for (let j = 0; j < config.window; j++) {
      sum += values[i - j];
    }

    res += sum > prev ? 1 : 0;
    prev = sum;
  }

  return res;
};

new Solver(2021, 1, io.readLines, getValues, getSolution, [{ window: 1 }, { window: 3 }]).solve();

// Part 1 solution: 1752
// Part 2 solution: 1781
