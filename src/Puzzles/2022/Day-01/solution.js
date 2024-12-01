const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = input => input.map(i => i.split('\r\n').map(v => parseInt(v)));
const getSolution = (values, config) => _.sum(_.take(_.reverse(_.sortBy(values.map(v => _.sum(v)))), config.top));
Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [{ top: 1 }, { top: 3 }]);

// Part 1 solution: 69501
// Part 2 solution: 202346
