const _ = require('lodash');
const io = require('../../Helpers/io');
const validators = require('./validation');
const inputFile = 'Puzzles/Day-4/input.txt';
const requiredFields = 7;
const fields = [
  { name: 'byr', validator: new validators.RangeValidator(1920, 2002) },
  { name: 'iyr', validator: new validators.RangeValidator(2010, 2020) },
  { name: 'eyr', validator: new validators.RangeValidator(2020, 2030) },
  { name: 'hgt', validator: new validators.HeightValidator(150, 193, 59, 76) },
  { name: 'hcl', validator: new validators.HexCodeValidator() },
  { name: 'ecl', validator: new validators.ValueValidator(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']) },
  { name: 'pid', validator: new validators.NumberLengthValidator(9) },
];

let mapObject = (input) => {
  let result = {};
  _.forEach(input, i => result[i.split(':')[0]] = i.split(':')[1]);
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

let inputLines = io.readLines(inputFile, '\r\n\r\n');
let passports = _.map(_.map(inputLines, i => i.split(/\s+/)), mapObject);
console.log('Part one solution: ' + getSolution(passports, false));
console.log('Part two solution: ' + getSolution(passports, true));
