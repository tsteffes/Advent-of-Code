const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = i => i;
const getSolution = (values, config) => {
  return 0;
};

Solver.solve(io.readLines, getValues, getSolution, [{ }, { }]);

// Part 1 solution:
// Part 2 solution:
