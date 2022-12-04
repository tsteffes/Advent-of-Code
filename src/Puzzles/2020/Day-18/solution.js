const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => input;

let calculate = (i, part) => {
  let val = i.match(/^\d+$/);
  if (val) {
    return parseInt(val[0]);
  }

  do {
    let m = i.match(/\([^\)\()]+\)/);
    if (m) {
      i = i.replace(m[0], calculate(m[0].substring(1, m[0].length - 1), part));
    }
  } while (i.indexOf('(') > -1);

  if (part === 2) {
    do {
      let x = i.match(/(?<r1>\d+)(?<op>\+)(?<r2>\d+)/);
      if (x) {
        let r1 = calculate(x.groups.r1, part), r2 = calculate(x.groups.r2, part);
        i = i.replace(x[0], r1 + r2);
      }
    } while (i.indexOf('+') > -1);
  }

  do {
    let x = i.match(/(?<r1>\d+)(?<op>[\+\*])(?<r2>\d+)/);
    if (x) {
      let r1 = parseInt(x.groups.r1), r2 = parseInt(x.groups.r2);
      i = i.replace(x[0], x.groups.op === '+' ? r1 + r2 : r1 * r2);
    }
  } while (/[+*]/.test(i));

  return i;
};

let getSolution = (input, config) => {
  let results = input.map(i => parseInt(calculate(i.replace(/\s/g, ''), config.part)));
  return _.sum(results);
};

new Solver(io.readLines, getValues, getSolution).solve();

// Part 1 solution: 69490582260
// Part 2 solution: 362464596624526
