const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = input => _.map(input, d => d);

let convertToDecimal = v => {
  let res = 0;
  for (let j = 0; j < v.length; j++) {
    res += v[j] > 0 ? 2 ** (v.length - j - 1) : 0;
  }

  return res;
};

const getSolution = (values, config) => {
  let valCount = values.length;
  let len = values[0].length;
  let res = new Array(len).fill(0);
  for (let i = 0; i < valCount; i++) {
    for (let j = 0; j < len; j++) {
      res[j] += values[i][j] === '0' ? 0 : 1;
    }
  }

  let eps = [];
  let gam = [];
  for (let j = 0; j < len; j++) {
    eps[j] = res[j] >= (valCount / 2) ? 1 : 0;
    gam[j] = res[j] < (valCount / 2) ? 1 : 0;
  }

  if (config.part === 1) {
    return convertToDecimal(eps) * convertToDecimal(gam);
  }

  let ox, co2, maj;
  let oxVals = values, co2Vals = values;
  for (let j = 0; j < len; j++) {
    maj = oxVals.filter(v => v[j] > 0).length >= (oxVals.length / 2) ? '1' : '0';
    oxVals = oxVals.filter(v => v[j] === maj);
    if (oxVals.length === 1) {
      ox = oxVals[0];
    }

    maj = co2Vals.filter(v => v[j] > 0).length >= (co2Vals.length / 2) ? '0' : '1';
    co2Vals = co2Vals.filter(v => v[j] === maj);
    if (co2Vals.length === 1) {
      co2 = co2Vals[0];
    }
  }

  return convertToDecimal(ox) * convertToDecimal(co2);
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution: 4001724
// Part 2 solution: 587895
