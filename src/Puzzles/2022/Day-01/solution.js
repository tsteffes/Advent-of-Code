const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  return input.map(i => _.map(i.split('\r\n'), v => parseInt(v)));
};

let getSolution = (values, config) => {
  return _.sum(_.take(_.reverse(_.sortBy(_.map(values, v => _.sum(v)))), config.top));
};

new Solver(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [{ top: 1 }, { top: 3 }]).solve();

// Part 1 solution: 69501
// Part 2 solution: 202346
