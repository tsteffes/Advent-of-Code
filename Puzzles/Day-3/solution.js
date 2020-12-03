const _ = require('lodash');
const io = require('../../Helpers/io');
const inputFile = 'Puzzles/Day-3/input.txt';
const partOneConfigs = [ { rise: 1, run: 3 } ];
const partTwoConfigs = [{ rise: 1, run: 1 }, { rise: 1, run: 3 }, { rise: 1, run: 5 }, { rise: 1, run: 7 }, { rise: 2, run: 1 }];

let calculateCollisions = (map, rise, run) => {
  let positions = [];
  for (let yPos = 0, xPos = 0; yPos < map.length; yPos += rise, xPos = (xPos + run) % map[0].length) {
    positions.push([xPos, yPos]);
  }

  return _.filter(positions, p => map[p[1]][p[0]] === '#').length;
};

let getSolution = (map, configs) => {
  let result = 1;
  _.forEach(configs, c => {
    result *= calculateCollisions(map, c.rise, c.run);
  });

  return result;
};

let map = io.readLines(inputFile);
console.log('Part one solution: ' + getSolution(map, partOneConfigs));
console.log('Part two solution: ' + getSolution(map, partTwoConfigs));
