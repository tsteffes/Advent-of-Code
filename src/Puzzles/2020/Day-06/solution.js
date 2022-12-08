const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => {
  return _.map(input, i => {
    return {
      num: i.split('\r\n').length,
      answers: i.replace(/\r\n/g, '')
    }
  });
}

const getSolution = (values, config) => {
  if (config.part === 1) {
    return _.sum(_.map(values, v => _.uniq(v.answers).length));
  }

  return _.sum(_.map(values, v => {
    return _.sum(_.map(_.uniq(v.answers), a => {
      return _.filter(v.answers, b => b === a).length === v.num ? 1 : 0;
    }));
  }));
};

Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution);

// Part 1 solution: 6911
// Part 2 solution: 3473
