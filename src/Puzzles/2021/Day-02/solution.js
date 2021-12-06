const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

// [x, y] represents horizontal, vertical positions
let getValues = input => _.map(input, d => {
  let parts = d.split(' ');
  let v = parseInt(parts[1], 10);
  switch (parts[0][0]) {
    case 'f':
      return [v, 0];
      break;
    case 'd':
      return [0, v];
    default:
      return [0, -1 * v];
      break;
  }
});

let getSolution = (values, config) => {
  if (config.part === 1) {
    let cur = [0, 0];
    for (let i = 0; i < values.length; i++) {
      cur[0] += values[i][0];
      cur[1] += values[i][1];
    }

    return cur[0] * cur[1];
  }

  let aim = 0;
  let cur = [0, 0];
  for (let i = 0; i < values.length; i++) {
    aim += values[i][1];
    cur[0] += values[i][0];
    cur[1] += aim * values[i][0];
  }

  return cur[0] * cur[1];
};

new Solver(2021, 2, io.readLines, getValues, getSolution, [{ part: 1 }, { part: 2 }]).solve();

// Part 1 solution: 2120749
// Part 2 solution: 2138382217
