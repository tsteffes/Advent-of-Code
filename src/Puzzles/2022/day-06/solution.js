const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

let getSolution = (input, config) => {
  for (let i = 0; i < input.length - config.num; i++) {
    if (_.uniq(input.substring(i, i + config.num).split('')).length === config.num) {
      return i + config.num;
    }
  }
};

Solver.solve(io.readLines, i => i[0], getSolution, [{ num: 4 }, { num: 14 }]);

// Part 1 solution: 1080
// Part 2 solution: 3645
