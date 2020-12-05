const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');
const partOneConfigs = [{ rise: 1, run: 3 }];
const partTwoConfigs = [{ rise: 1, run: 1 }, { rise: 1, run: 3 }, { rise: 1, run: 5 }, { rise: 1, run: 7 }, { rise: 2, run: 1 }];

let getInput = (inputFile) => io.readLines(inputFile);

let calculateCollisions = (map, config) => {
  let positions = [];
  for (let y = 0, x = 0; y < map.length; y += config.rise, x = (x + config.run) % map[0].length) {
    positions.push([x, y]);
  }

  return _.filter(positions, p => map[p[1]][p[0]] === '#').length;
};

let getSolution = (input, config) => {
  return config.configs.reduce((a, b) => a * calculateCollisions(input, b), 1);
};

let solver = new Solver.Solver(3, getInput, getSolution, [{ configs: partOneConfigs }, { configs: partTwoConfigs }]);
solver.solve();

// Part 1 solution: 228
// Part 2 solution: 6818112000
