const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => input.map(i => _.map(i.split('\r\n'), v => parseInt(v)));
const getSolution = (values, config) => _.sum(_.take(_.reverse(_.sortBy(_.map(values, v => _.sum(v)))), config.top));
Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [{ top: 1 }, { top: 3 }]);

// Part 1 solution: 69501
// Part 2 solution: 202346
