const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  let results = { rules: [], mine: null, others: [] };
  input[0].split('\r\n').forEach(r => {
    let g = r.match(/(?<field>[a-z\s]+): (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+)/).groups;
    results.rules.push({ field: g.field, min1: parseInt(g.min1), max1: parseInt(g.max1), min2: parseInt(g.min2), max2: parseInt(g.max2), possibleColumns: [] });
  });
  results.mine = input[1].split('\r\n')[1].split(',').map(v => parseInt(v));
  input[2].split('\r\n').slice(1).forEach(r => results.others.push(r.split(',').map(v => parseInt(v))));
  return results;
};

let checkRule = (rule, val) => {
  return (rule.min1 <= val && val <= rule.max1) || (rule.min2 <= val && val <= rule.max2);
}

let filterColumns = (rules, col) => {
  rules.forEach(r => _.remove(r.possibleColumns, c => c === col));
}

let getSolution = (input, config) => {
  let failsAllRules = v => !_.some(input.rules, r => checkRule(r, v));
  if (config.part === 1) {
    return _.sum(_.map(input.others, other => _.sum(_.filter(other, failsAllRules))));
  }

  let tickets = _.filter(input.others, other => !_.some(other, failsAllRules));
  for (let rule of input.rules) {
    for (let i = 0; i < input.mine.length; i++) {
      if (_.every(tickets, t => checkRule(rule, t[i]))) {
        rule.possibleColumns.push(i);
      }
    }
  }

  while (_.some(input.rules, r => r.possibleColumns.length > 0)) {
    let r = _.find(input.rules, r => r.possibleColumns.length === 1);
    r.column = r.possibleColumns[0];
    filterColumns(input.rules, r.column);
  }

  return _.map(_.filter(input.rules, r => r.field.indexOf('departure') === 0), r => input.mine[r.column]).reduce((a, b) => a * b);
};

new Solver(2020, 16, i => io.readLines(i, '\r\n\r\n'), getValues, getSolution).solve();

// Part 1 solution: 24021
// Part 2 solution: 1289178686687
