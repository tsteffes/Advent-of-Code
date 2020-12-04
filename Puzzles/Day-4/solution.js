const _ = require('lodash');
const io = require('../../Helpers/io');
const logger = require('../../Helpers/logger');
const fields = require('./fields');
const inputFile = 'Puzzles/Day-4/input.txt';
const requiredFields = 7;

let getInput = () => _.map(_.map(io.readLines(inputFile, '\r\n\r\n'), i => i.split(/\s+/)), mapPassport);

let mapPassport = (collection) => {
  let result = {};
  _.forEach(collection, i => result[i.split(':')[0]] = i.split(':')[1]);
  return result;
};

let getSolution = (passports, runValidation) => {
  return _.filter(passports, passport => {
    return _.filter(Object.keys(passport), key => {
      let field = _.find(fields, f => f.name === key);
      return !!field && (!runValidation || field.validator.validate(passport[key]));
    }).length >= requiredFields;
  }).length;
};

let passports = getInput();
logger.log([getSolution(passports, false), getSolution(passports, true)]);

// Part 1 solution: 254
// Part 2 solution: 184
