const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;
const maps = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];
/*
  a - 8 - unique letter between 3-digit and 2-digit
  b - 6 - letter appearing 6 times
  c - 8 - non-'a' appearing 8 times
  d - 7 - non-'b'/'c'/'f' appearing in 4-digit number
  e - 4 - letter appearing 4 times
  f - 9 - letter appearing 9 times
  g - 7 - remaining letter
*/

let getValues = input => {
  return input.map(i => {
    let g = i.match(/(?<ins>(\S+\s?)+) \| (?<outs>(\S+\s?)+)/).groups;
    return { ins: g.ins.split(/\s/), outs: g.outs.split(/\s/) };
  });
};

let getCounts = (values) => {
  return _.countBy([].concat.apply([], values.map(i => i.split(''))));
};

let findWithCount = (counts, num) => {
  return Object.entries(counts).filter(v => v[1] === num);
};

let findASegment = (ins) => {
  let twoSegment = ins.filter(i => i.length === 2)[0];
  let threeSegment = ins.filter(i => i.length === 3)[0];
  let counts = _.countBy(threeSegment.split('').concat(twoSegment.split('')));
  return Object.entries(counts).filter(v => v[1] === 1)[0][0];
};

let findDSegment = (ins, tran) => {
  let fourSegment = ins.filter(i => i.length === 4)[0];
  return fourSegment.split('').filter(v => ![tran.b, tran.c, tran.f].includes(v[0]))[0][0];
};

let getDigit = (val, translations) => {
  let x = val.split('').map(v => Object.entries(translations).filter(t => t[1] === v)[0][0]);
  let digit = maps.indexOf(x.sort().join(''));
  return digit;
};

let getSolution = (values, config) => {
  if (config.part === 1) {
    return _.sum(values.map(v => v.outs.filter(o => [2, 3, 4, 7].includes(o.length)).length));
  }

  return values.reduce((prev, v) => {
    let tran = {};
    let counts = getCounts(v.ins);
    tran.b = findWithCount(counts, 6)[0][0];
    tran.e = findWithCount(counts, 4)[0][0];
    tran.f = findWithCount(counts, 9)[0][0];
    tran.a = findASegment(v.ins);
    tran.c = findWithCount(counts, 8).filter(v => v[0] !== tran.a)[0][0];
    tran.d = findDSegment(v.ins, tran);
    tran.g = findWithCount(counts, 7).filter(v => ![tran.a, tran.b, tran.c, tran.d, tran.e, tran.f].includes(v[0]))[0][0];
    return prev + parseInt(v.outs.map(o => getDigit(o, tran)).join(''), 10);
  }, 0);
};

new Solver(2021, 8, io.readLines, getValues, getSolution).solve();

// Part 1 solution: 519
// Part 2 solution: 1027483
