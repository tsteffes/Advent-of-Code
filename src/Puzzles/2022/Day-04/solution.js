const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');
const reg = /(?<min1>\d+)-(?<max1>\d+),(?<min2>\d+)-(?<max2>\d+)/;
const full = v => (v.min1 <= v.min2 && v.max1 >= v.max2) || (v.min2 <= v.min1 && v.max2 >= v.max1);
const partial = v => (v.min1 <= v.min2 && v.max1 >= v.min2) || (v.min2 <= v.min1 && v.max2 >= v.min1);

const getValues = input =>
  _.forEach(_.map(input, i => i.match(reg).groups),
    v => ['min1', 'max1', 'min2', 'max2'].forEach(x => v[x] = parseInt(v[x], 10)));

const getSolution = (values, config) => _.filter(values, config.compare).length;

Solver.solve(io.readLines, getValues, getSolution, [{ compare: full }, { compare: partial }]);;

// Part 1 solution: 556
// Part 2 solution: 876
