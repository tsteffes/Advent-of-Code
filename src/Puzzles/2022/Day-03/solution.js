const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = (input, config) => config.mapper(input);
const m1 = input => input.map(i => [ i.substring(0, i.length / 2).split(''), i.substring(i.length / 2).split('') ]);
const m2 = input => _.range(input.length / 3).map(i => [3 * i, 3 * i + 1, 3 * i + 2].map(j => input[j].split('')));
const getSolution = values => _.sum(values.map(v => (p => p > 96 ? p - 96 : p - 38)(_.intersection(...v)[0].charCodeAt(0))));
Solver.solve(io.readLines, getValues, getSolution, [{ mapper: m1 }, { mapper: m2 }]);

// Part 1 solution: 7766
// Part 2 solution: 2415
