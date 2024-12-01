const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = input => {
  let vals = input[0].split(',').map(v => parseInt(v, 10));
  let res = [];
  for (let i = 0; i < 9; i++) {
    res.push(vals.filter(v => v === i).length);
  }

  return res;
};

const getSolution = (values, config) => {
  for (let i = 0; i < config.days; i++) {
    let zeroCount = values.shift();
    values[6] += zeroCount;
    values.push(zeroCount);
  }

  return _.sum(values);
};

Solver.solve(io.readLines, getValues, getSolution, [{ days: 80 }, { days: 256 }]);

// Part 1 solution: 351188
// Part 2 solution:
