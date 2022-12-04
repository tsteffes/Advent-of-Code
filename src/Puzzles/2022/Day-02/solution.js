const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;
const mapper1 = { 'X': ['B', 'A', 'C'], 'Y': ['C', 'B', 'A'], 'Z': ['A', 'C', 'B'] };
const mapper2 = { 'A': ['Z', 'X', 'Y'], 'B': ['X', 'Y', 'Z'], 'C': ['Y', 'Z', 'X'] };
const scores = [0, 3, 6];
const vals = ['X', 'Y', 'Z'];

let getSolution = (values, config) => {
  if (config.part === 1) {
    return _.sum(_.map(values, v => {
      return 1 + vals.indexOf(v[2]) + scores[mapper1[v[2]].indexOf(v[0])];
    }));
  }

  return _.sum(_.map(values, v => {
    return 1 + vals.indexOf(mapper2[v[0]][vals.indexOf(v[2])]) + scores[vals.indexOf(v[2])];
  }));
};

new Solver(io.readLines, i => i, getSolution).solve();

// Part 1 solution: 12535
// Part 2 solution: 15457
