const fields = require('./fields');
const requiredFields = 7;

const parseInput = input => _.map(_.map(input, i => i.split(/\s+/)), mapPassport);

let mapPassport = collection => {
  let result = {};
  _.forEach(collection, i => result[i.split(':')[0]] = i.split(':')[1]);
  return result;
};

const getSolution = (values, config) => {
  return values.filter(passport => {
    return Object.keys(passport).filter(key => {
      let field = _.find(fields, f => f.name === key);
      return !!field && (!config.validate || field.validator.validate(passport[key]));
    }).length >= requiredFields;
  }).length;
};

Solver.solve(parseInput, getSolution, [{ validate: false }, { validate: true }], '\r\n\r\n');

// Part 1 solution: 254
// Part 2 solution: 184
