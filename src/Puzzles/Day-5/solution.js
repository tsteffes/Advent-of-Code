const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');

let getValues = input => {
  return _.map(input, i => {
    return _.sum([...Array(10).keys()].map(j => i[j] === 'B' || i[j] === 'R' ? Math.pow(2, 9-j) : 0));
  });
}

let getSolution = (v, config, part) => {
  if (part === 1) {
    return _.max(v);
  }
  else {
    let min = _.min(v);
    return _.find([...Array(_.max(v) - min).keys()], i => v.indexOf(i + min) === -1) + min;
  }
};

let solver = new Solver.Solver(5, io.readLines, getValues, getSolution, [{ }, { }]);
solver.solve();

// Part 1 solution: 888
// Part 2 solution: 522
