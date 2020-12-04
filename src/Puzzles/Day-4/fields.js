const Validation = require('./validation');

module.exports = [
  { name: 'byr', validator: new Validation.RangeValidator(1920, 2002) },
  { name: 'iyr', validator: new Validation.RangeValidator(2010, 2020) },
  { name: 'eyr', validator: new Validation.RangeValidator(2020, 2030) },
  { name: 'hgt', validator: new Validation.HeightValidator(150, 193, 59, 76) },
  { name: 'hcl', validator: new Validation.HexCodeValidator() },
  { name: 'ecl', validator: new Validation.ValueValidator(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']) },
  { name: 'pid', validator: new Validation.NumberLengthValidator(9) },
];