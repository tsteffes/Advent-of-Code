const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => _.map(input[0].split(','), i => parseInt(i));

function HashMap() {
  this.buckets = [];
  for (var i = 0; i < 32768; i++) {
    this.buckets.push({});
  }

  this.hash = k => k % 32768;
  this.set = (k, v) => this.buckets[this.hash(k)][k] = v;
  this.get = k => this.buckets[this.hash(k)][k];
}

let getSolution = (input, config, part) => {
  let indexes = new HashMap();
  input.slice(0, input.length - 1).forEach(i => indexes.set(i, input.lastIndexOf(i)));
  let num = input[input.length - 1];
  for (let i = input.length; i < config.target; i++) {
    let prev = indexes.get(num);
    indexes.set(num, i - 1);
    num = prev >= 0 ? i - 1 - prev : 0;
  }

  return num;
};

new Solver(15, io.readLines, getValues, getSolution, [{ target: 2020 }, { target: 30000000 }]).solve();

// Part 1 solution: 249
// Part 2 solution: 41687
