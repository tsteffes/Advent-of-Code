const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;
const fields = require('./fields');
const requiredFields = 7;

let getValues = input => _.map(_.map(input, i => i.split(/\s+/)), mapPassport);

let mapPassport = collection => {
  let result = {};
  _.forEach(collection, i => result[i.split(':')[0]] = i.split(':')[1]);
  return result;
};

let getSolution = (values, config) => {
  return _.filter(values, passport => {
    return _.filter(Object.keys(passport), key => {
      let field = _.find(fields, f => f.name === key);
      return !!field && (!config.validate || field.validator.validate(passport[key]));
    }).length >= requiredFields;
  }).length;
};

new Solver(4, i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [{ validate: false }, { validate: true }]).solve();

// Part 1 solution: 254
// Part 2 solution: 184
