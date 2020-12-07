const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');

let getValues = input => {
  return _.map(input, i => {
    return {
      num: i.split('\r\n').length,
      answers: i.replace(/\r\n/g, '')
    }
  });
}

let getSolution = (values, config, part) => {
  if (part === 1){
    return _.sum(_.map(values, v => _.uniq(v.answers).length));
  }

  return _.sum(_.map(values, v => {
    return _.sum(_.map(_.uniq(v.answers), a => {
      return _.filter(v.answers, b => b === a).length === v.num ? 1 : 0;
    }));
  }));
};

let solver = new Solver.Solver(6, i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [{ }, { }]);
solver.solve();

// Part 1 solution: 6911
// Part 2 solution: 3473
