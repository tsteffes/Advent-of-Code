const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');
const partOneConfigs = [{ rise: 1, run: 3 }];
const partTwoConfigs = [{ rise: 1, run: 1 }, { rise: 1, run: 3 }, { rise: 1, run: 5 }, { rise: 1, run: 7 }, { rise: 2, run: 1 }];

let countTrees = (map, config) => {
  let positions = _.map([...Array(map.length).keys()], y => [(y * config.run) % map[0].length, (y * config.rise)]);
  return _.filter(_.filter(positions, p => p[1] < map.length), p => map[p[1]][p[0]] === '#').length;
};

let getSolution = (values, config) => {
  return config.configs.reduce((a, b) => a * countTrees(values, b), 1);
};

Solver.solve(io.readLines, i => i, getSolution, [{ configs: partOneConfigs }, { configs: partTwoConfigs }]);

// Part 1 solution: 228
// Part 2 solution: 6818112000
