const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = i => {
  const first = [], second = [];
  i.forEach(v => {
    first.push(parseInt(v.split('   ')[0]));
    second.push(parseInt(v.split('   ')[1]));
  });
  return [first, second];
};
const getSolution = (values, config) => {
  const firstSorted = _.sortBy(values[0]);
  const secondSorted = _.sortBy(values[1]);
  let res = 0;

  if (config.part === 1) {
    for (let i = 0; i < firstSorted.length; i++) {
      res += Math.abs(firstSorted[i] - secondSorted[i]);
    }
  }
  else {
    for (let i = 0; i < firstSorted.length; i++) {
      let num = firstSorted[i];
      let count = secondSorted.filter(v => v === num).length;
      res += num * count;
    }
  }

  return res;
};

Solver.solve(io.readLines, getValues, getSolution, [{ }, { }]);

// Part 1 solution:
// Part 2 solution:
