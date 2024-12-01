const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const map1 = { 'X': ['B', 'A', 'C'], 'Y': ['C', 'B', 'A'], 'Z': ['A', 'C', 'B'] };
const map2 = { 'A': ['Z', 'X', 'Y'], 'B': ['X', 'Y', 'Z'], 'C': ['Y', 'Z', 'X'] };
const scores = [0, 3, 6];
const vals = ['X', 'Y', 'Z'];
const f1 = v => 1 + vals.indexOf(v[2]) + scores[map1[v[2]].indexOf(v[0])];
const f2 = v => 1 + vals.indexOf(map2[v[0]][vals.indexOf(v[2])]) + scores[vals.indexOf(v[2])];
const getSolution = (values, config) => _.sum(values.map(config.formula));
Solver.solve(io.readLines, i => i, getSolution, [{ formula: f1 }, { formula: f2 }]);

// Part 1 solution: 12535
// Part 2 solution: 15457
