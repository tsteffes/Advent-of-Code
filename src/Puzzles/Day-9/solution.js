const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  return input.map(v => parseInt(v));
};

let findSum = (set, total) => {
  return _.filter(set.flatMap(v1 => set.map(v2 => v1 + v2)), v => v === total);
};

let findContiguousSum = (set, total) => {
  for (let i = 0; i < set.length - 1; i++) {
    for (let j = i + 1; j < set.length; j++) {
      let subset = set.slice(i, j + 1);
      if (_.sum(subset) === total) {
        return _.min(subset) + _.max(subset);
      }
    }
  }
};

let findNonCompliant = (values, preamble, target) => {
  return _.find(values, (val, idx) => idx >= preamble && findSum(values.slice(idx - preamble, idx), target || val).length === 0);
};

let getSolution = (values, config, part) => {
  let pt1 = findNonCompliant(values, config.preamble);
  if (part === 1) {
    return pt1;
  }

  return findContiguousSum(values, pt1);
};

new Solver(9, io.readLines, getValues, getSolution, [{ preamble: 25 }, { preamble: 25 }]).solve();

// Part 1 solution: 25918798
// Part 2 solution: 3340942
