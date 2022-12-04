const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;
const dirs = [[0, -1], [-1, 0], [1, 0], [0, 1]];

let getValues = (input, config) => {
  let map = [];
  for (let y = 0; y < config.multiplier * input.length; y++) {
    row = [];
    for (let x = 0; x < config.multiplier * input[0].length; x++) {
      let inc = Math.floor(x / input[0].length) + Math.floor(y / input.length);
      let baseCost = parseInt(input[y % input.length][x % input[0].length]);
      let cost = (baseCost + inc) < 10 ? baseCost + inc : (baseCost + inc + 1) % 10;
      row.push({ x: x, y: y, cost: cost, minPath: -1 });
    }

    map.push(row);
  }

  return map;
};

let checkBoundaries = (map, loc) => loc[0] >= 0 && loc[1] >= 0 && loc[0] < map[0].length && loc[1] < map.length;

let getSolution = (map, config) => {
  let end = map[map.length - 1][map[0].length - 1];
  end.minPath = 0;
  let modified = [end];
  while(modified.length > 0) {
    let modifiedNeighbors = [];
    for (let m of modified) {
      for (let dir of dirs) {
        let x = m.x + dir[0], y = m.y + dir[1];
        if (checkBoundaries(map, [x, y])) {
          let cur = map[y][x];
          if (cur.minPath === -1 || cur.minPath > (m.minPath + m.cost)) {
            cur.minPath = m.minPath + m.cost;
            modifiedNeighbors.push(cur);
          }
        }
      }
    }

    modified = modifiedNeighbors;
  }

  return map[0][0].minPath;
};

new Solver(io.readLines, getValues, getSolution, [{ multiplier: 1 }, { multiplier: 5 }]).solve();

// Part 1 solution: 393
// Part 2 solution: 2823
