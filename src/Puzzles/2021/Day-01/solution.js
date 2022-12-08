const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => _.map(input, d => parseInt(d, 10));

const getSolution = (values, config) => {
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

Solver.solve(io.readLines, getValues, getSolution, [{ window: 1 }, { window: 3 }]);

// Part 1 solution: 1752
// Part 2 solution: 1781
