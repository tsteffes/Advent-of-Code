const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  return input[0].split(',').map(v => parseInt(v, 10));
};

let getCost = (i, val, config) => {
  let dist = Math.abs(i - val);
  if (config.part === 1) {
    return dist;
  }

  return (dist * (dist + 1)) / 2;
}

let getSolution = (values, config) => {
  let max = _.max(values);
  let res = null;
  for (let i = 0; i < max; i++) {
    let tot = _.sum(values.map(v => getCost(i, v, config)));
    if (res === null || tot < res) {
      res = tot;
    }
  }

  return res;
};

new Solver(2021, 7, io.readLines, getValues, getSolution).solve();

// Part 1 solution: 329389
// Part 2 solution: 86397080
