const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');
const fields = require('./fields');
const requiredFields = 7;

let getInput = (inputFile) => _.map(_.map(io.readLines(inputFile, '\r\n\r\n'), i => i.split(/\s+/)), mapPassport);

let mapPassport = (collection) => {
  let result = {};
  _.forEach(collection, i => result[i.split(':')[0]] = i.split(':')[1]);
  return result;
};

let getSolution = (input, config) => {
  return _.filter(input, passport => {
    return _.filter(Object.keys(passport), key => {
      let field = _.find(fields, f => f.name === key);
      return !!field && (!config.validate || field.validator.validate(passport[key]));
    }).length >= requiredFields;
  }).length;
};

let solver = new Solver.Solver(4, getInput, getSolution, [{ validate: false }, { validate: true }]);
solver.solve();

// Part 1 solution: 254
// Part 2 solution: 184
