
class NumberLengthValidator {
  constructor(digits) {
    this.digits = digits;
    this.validate = val => {
      return /^\d{9}$/.test(val);
    };
  }
}

class HeightValidator {
  constructor(minCm, maxCm, minIn, maxIn) {
    this.minCm = minCm;
    this.maxCm = maxCm;
    this.minIn = minIn;
    this.maxIn = maxIn;
    this.validate = val => {
      let unit = val.substring(val.length - 2, val.length);
      let num = parseInt(val.substring(0, val.length - 2));
      return unit === 'cm' ? this.minCm <= num && num <= this.maxCm : unit === 'in' ? this.minIn <= num && num <= this.maxIn : false;
    };
  }
};

class RangeValidator {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.validate = val => {
      let intVal = parseInt(val);
      return min <= intVal && intVal <= max;
    };
  }
};

class HexCodeValidator {
  constructor() {
    this.validate = val => {
      return /^#[0-9a-f]{6}$/.test(val);
    }
  }
};

class ValueValidator {
  constructor(vals) {
    this.vals = vals;
    this.validate = val => {
      return _.includes(vals, val);
    };
  }
};

module.exports = [
  { name: 'byr', validator: new RangeValidator(1920, 2002) },
  { name: 'iyr', validator: new RangeValidator(2010, 2020) },
  { name: 'eyr', validator: new RangeValidator(2020, 2030) },
  { name: 'hgt', validator: new HeightValidator(150, 193, 59, 76) },
  { name: 'hcl', validator: new HexCodeValidator() },
  { name: 'ecl', validator: new ValueValidator(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']) },
  { name: 'pid', validator: new NumberLengthValidator(9) },
];
