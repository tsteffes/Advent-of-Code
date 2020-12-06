const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');

let getInput = (inputFile) => io.readLines(inputFile, '\r\n\r\n');

let getValues = (input) => {
  return _.map(input, i => {
    return {
      num: i.split('\r\n').length,
      answers: i.replace(/\r\n/g, '')
    }
  });
}

let getSolution = (input, config) => {
  let values = getValues(input);
  if (config.partOne){
    return _.sum(_.map(values, v => _.uniq(v.answers).length));
  }

  return _.sum(_.map(values, v => {
    return _.sum(_.map(_.uniq(v.answers), a => {
      return _.filter(v.answers, b => b === a).length === v.num ? 1 : 0;
    }));
  }));
};

let solver = new Solver.Solver(6, getInput, getSolution, [{ partOne: true }, { }]);
solver.solve();

// Part 1 solution: 6911
// Part 2 solution: 3473
