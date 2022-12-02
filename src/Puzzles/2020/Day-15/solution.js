const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;
const HashMap = require('../../../Helpers/hashMap').HashMap;

let getValues = input => _.map(input[0].split(','), i => parseInt(i));

let getSolution = (input, config) => {
  let indexes = new HashMap(32768);
  input.slice(0, input.length - 1).forEach(i => indexes.set(i, input.lastIndexOf(i)));
  let num = input[input.length - 1];
  for (let i = input.length - 1; i < config.target - 1; i++) {
    let prev = indexes.get(num);
    indexes.set(num, i);
    num = prev >= 0 ? i - prev : 0;
  }

  return num;
};

new Solver(2020, 15, io.readLines, getValues, getSolution, [{ target: 2020 }, { target: 30000000 }]).solve();

// Part 1 solution: 249
// Part 2 solution: 41687
