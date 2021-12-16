const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  return input.map(y => y.split('').map(v => parseInt(v, 10)));
};

let incrementNeighbors = (values, x, y) => {
  let dirs = [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, 1], [-1, -1], [1, -1], [1, 1]];
  let checkBoundaries = (vals, x, y) => x >= 0 && y >= 0 && x < vals[0].length && y < vals.length;
  for (let dir of dirs) {
    let a = x + dir[0], b = y + dir[1];
    if (checkBoundaries(values, a, b) && values[b][a] > -1) {
      values[b][a]++;
    }
  }
};

let getSolution = (values, config) => {
  let res = 0;
  let step = 0;
  while(true) {
    step++;
    let stepFlashes = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        values[y][x]++;
      }
    }

    let flashed;
    do {
      flashed = false;
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (values[y][x] > 9) {
            res++;
            stepFlashes++;
            flashed = true;
            values[y][x] = -1;
            incrementNeighbors(values, x, y);
          }
        }
      }
    } while(flashed);

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (values[y][x] === -1) {
          values[y][x] = 0;
        }
      }
    }

    if (config.part === 1 && step === 100) {
      break;
    }

    if (config.part === 2 && stepFlashes === 100) {
      return step;
    }
  }

  return res;
};

new Solver(2021, 11, io.readLines, getValues, getSolution, [{ part: 1 }, { part: 2 }]).solve();

// Part 1 solution: 1634
// Part 2 solution:
