const _ = require('lodash');

class NumberLengthValidator {
  constructor(digits) {
    this.digits = digits;
    this.validate = val => {
      return parseInt(val) && val.length === this.digits;
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
  constructor() { }
  validate = val => {
    return val[0] === '#' && val.length === 7 && /[0-9a-f]{6}/.test(val.substring(1, 7));
  }
};

class ValueValidator {
  constructor(vals) {
    this.vals = vals;
  }
  validate = val => {
    return !!_.find(this.vals, v => v === val);
  };
};

exports.ValueValidator = ValueValidator;
exports.NumberLengthValidator = NumberLengthValidator;
exports.HeightValidator = HeightValidator;
exports.RangeValidator = RangeValidator;
exports.HexCodeValidator = HexCodeValidator;