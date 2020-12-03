const _ = require('lodash');
const fs = require('file-system');
const inputFile = 'Puzzles/Day-3/input.txt';
const partOneConfigs = [ { rise: 1, run: 3 } ];
const partTwoConfigs = [{ rise: 1, run: 1 }, { rise: 1, run: 3 }, { rise: 1, run: 5 }, { rise: 1, run: 7 }, { rise: 2, run: 1 }];

let calculateCollisions = (map, rise, run) => {
  let treeCount = 0;
  for (let yPos = 0, xPos = 0; yPos < map.length; yPos += rise, xPos = (xPos + run) % map[0].length) {
    treeCount += map[yPos][xPos] === '#' ? 1: 0;
  }

  return treeCount;
};

let getSolution = (map, configs) => {
  let result = 1;
  _.forEach(configs, c => {
    result *= calculateCollisions(map, c.rise, c.run);
  });

  return result;
};

let map = fs.readFileSync(inputFile, 'utf8').split('\r\n');
console.log('Part one solution: ' + getSolution(map, partOneConfigs));
console.log('Part two solution: ' + getSolution(map, partTwoConfigs));
