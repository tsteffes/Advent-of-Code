const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

const getValues = input => {
  const reg = /(?<min1>[\d]+)\-(?<max1>[\d]+),(?<min2>[\d]+)\-(?<max2>[\d]+)/;
  return _.forEach(_.map(input, i => i.match(reg).groups),
    v => ['min1', 'max1', 'min2', 'max2'].forEach(x => v[x] = parseInt(v[x], 10)));
};

const getSolution = (values, config) => _.filter(values, config.compare).length;

const full = v => (v.min1 <= v.min2 && v.max1 >= v.max2) || (v.min2 <= v.min1 && v.max2 >= v.max1);
const partial = v => (v.min1 <= v.min2 && v.max1 >= v.min2) || (v.min2 <= v.min1 && v.max2 >= v.min1);
new Solver(io.readLines, getValues, getSolution, [{ compare: full }, { compare: partial }]).solve();

// Part 1 solution: 556
// Part 2 solution: 876
