const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');
const point = p => p > 96 ? p - 96 : p - 38;

const getValues = (input, config) => {
  if (config.part === 1) {
    return _.map(input, i => [ i.substring(0, i.length / 2).split(''), i.substring(i.length / 2).split('') ]);
  }

  const res = [];
  for (let i = 0; i < input.length; i += 3) {
     res.push([input[i].split(''), input[i + 1].split(''), input[i + 2].split('')]);
  }

  return res;
};

const getSolution = values => _.sum(_.map(values, v => point(_.intersection(...v)[0].charCodeAt(0))));
Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution: 7766
// Part 2 solution: 2415
