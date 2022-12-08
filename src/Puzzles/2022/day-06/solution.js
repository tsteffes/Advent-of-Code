const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');
const arrays = require('../../../helpers/arrays');

const getSolution = (input, config) => {
  return config.n + _.findIndex(arrays.getRange(input.length),
    i => _.uniq(input.substring(i, i + config.n).split('')).length === config.n);
};

Solver.solve(io.readLines, i => i[0], getSolution, [{ n: 4 }, { n: 14 }]);

// Part 1 solution: 1080
// Part 2 solution: 3645
