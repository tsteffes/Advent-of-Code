const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = (input, config) => {
  if (config.part === 1) {
    return _.map(input, i => [ i.substring(0, i.length / 2).split(''), i.substring(i.length / 2).split('') ]);
  }

  let res = [];
  for (let i = 0; i < input.length; i += 3) {
     res.push([input[i].split(''), input[i + 1].split(''), input[i + 2].split('')]);
  }

  return res;
};

let getSolution = values => {
  let point = p => p > 96 ? p - 96 : p - 38;
  return _.sum(_.map(values, v => point(_.intersection(...v)[0].charCodeAt(0))));
};

new Solver(2022, 3, io.readLines, getValues, getSolution).solve();

// Part 1 solution: 7766
// Part 2 solution: 2415
