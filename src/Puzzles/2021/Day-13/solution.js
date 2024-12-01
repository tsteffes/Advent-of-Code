const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = input => {
  let res = { coords: [], folds: [] };
  for (line of input) {
    let c = line.match(/(?<x>[\d]+),(?<y>[\d]+)/);
    let f = line.match(/fold along (?<dir>[xy])=(?<val>[\d]+)/);
    if (c) {
      res.coords.push({ x: parseInt(c.groups.x, 10), y: parseInt(c.groups.y, 10) });
    }
    else if (f) {
      res.folds.push({ dir: f.groups.dir, val: parseInt(f.groups.val, 10)});
    }
  }

  return res;
};

const getSolution = (input, config) => {
  for (let fold of _.take(input.folds, config.part === 1 ? 1 : input.folds.length)) {
    for (let coord of input.coords) {
      coord.x = fold.dir === 'x' && coord.x > fold.val ? (fold.val - (coord.x - fold.val)) : coord.x;
      coord.y = fold.dir === 'y' && coord.y > fold.val ? (fold.val - (coord.y - fold.val)) : coord.y;
    }
  }

  if (config.part === 1) {
    return (new Set(input.coords.map(v => v.x + ',' + v.y))).size;
  }

  for (let j = 0; j <= _.max(input.coords.map(c => c.y)); j++) {
    let line = '';
    for (let i = 0; i <= _.max(input.coords.map(c => c.x)); i++) {
      let f = _.filter(input.coords, c => c.x === i && c.y === j);
      line += f.length > 0 ? '#' : '.';
    }

    console.log(line);
  }

  return 'Read the output';
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution: 669
// Part 2 solution: UEFZCUCJ
