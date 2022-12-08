const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const reg = /(?<min1>\d+)-(?<max1>\d+),(?<min2>\d+)-(?<max2>\d+)/;
const full = v => (v.min1 <= v.min2 && v.max1 >= v.max2) || (v.min2 <= v.min1 && v.max2 >= v.max1);
const partial = v => (v.min1 <= v.min2 && v.max1 >= v.min2) || (v.min2 <= v.min1 && v.max2 >= v.min1);
const getValues = input => _.forEach(input.map(i => i.match(reg).groups),
  v => ['min1', 'max1', 'min2', 'max2'].forEach(x => v[x] = parseInt(v[x])));
const getSolution = (values, config) => values.filter(config.overlap).length;

Solver.solve(io.readLines, getValues, getSolution, [{ overlap: full }, { overlap: partial }]);;

// Part 1 solution: 556
// Part 2 solution: 876
