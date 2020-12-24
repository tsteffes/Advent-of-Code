const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  input.forEach(i => {
    let vals = i.split('\r\n');
    let title = vals.shift().match(/^Tile (?<num>\d+):$/);
    return { id: title.groups.num, val: vals, borders: mapBorders(vals) };
  });
};

let mapBorders = vals => {
  results = [];
  results.push(vals[0].split(''));
  results.push(vals.map(v => v[v.length - 1]));
  results.push(_.reverse(vals[vals.length - 1].split('')));
  results.push(vals.map(v => v[0]).reverse());
  return results;
};

let getSolution = (input, config, part) => {

};

new Solver(20, i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [{ }, { }]).solve();

// Part 1 solution:
// Part 2 solution:
