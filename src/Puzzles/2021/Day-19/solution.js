const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = input => input;

const getSolution = (input, config) => {
  return input;
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution:
// Part 2 solution:
