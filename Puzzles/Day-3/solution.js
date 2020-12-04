const _ = require('lodash');
const io = require('../../Helpers/io');
const logger = require('../../Helpers/logger');
const inputFile = 'Puzzles/Day-3/input.txt';
const partOneConfigs = [ { rise: 1, run: 3 } ];
const partTwoConfigs = [{ rise: 1, run: 1 }, { rise: 1, run: 3 }, { rise: 1, run: 5 }, { rise: 1, run: 7 }, { rise: 2, run: 1 }];

let calculateCollisions = (map, config) => {
  let positions = [];
  for (let y = 0, x = 0; y < map.length; y += config.rise, x = (x + config.run) % map[0].length) {
    positions.push([x, y]);
  }

  return _.filter(positions, p => map[p[1]][p[0]] === '#').length;
};

let getSolution = (map, configs) => {
  let result = 1;
  _.forEach(configs, c => {
    result *= calculateCollisions(map, c);
  });

  return result;
};

let map = io.readLines(inputFile);
logger.log([getSolution(map, partOneConfigs), getSolution(map, partTwoConfigs)]);

// Part 1 solution: 228
// Part 2 solution: 6818112000
