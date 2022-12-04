const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

let getValues = input => {
  let res = { map: { }, template: null };
  for (line of input) {
    let a = line.match(/(?<x>[A-Z]+) -> (?<y>[A-Z]+)/);
    let b = line.match(/(?<val>[A-Z]+)/);
    if (a) {
      res.map[a.groups.x] = a.groups.y;
    }
    else if (b) {
      res.template = b.groups.val.split('');
    }
  }

  return res;
};

let getSolution = (input, config) => {
  let vals = {};
  for (let i = 0; i < input.template.length - 1; i++) {
    let key = input.template[i] + input.template[i + 1];
    vals[key] = (vals[key] || 0) + 1;
  }

  for (let step = 0; step < config.steps; step++) {
    let deltas = {};
    for (let key of _.keys(vals)) {
      let letter = input.map[key];
      if (letter) {
        deltas[key] = (deltas[key] || 0) - vals[key];
        deltas[key[0] + letter] = (deltas[key[0] + letter] || 0) + vals[key];
        deltas[letter + key[1]] = (deltas[letter + key[1]] || 0) + vals[key];
      }
    }

    for (let key of _.keys(deltas)) {
      vals[key] = (vals[key] || 0) + deltas[key];
    }
  }

  let letters = {};
  for (let key of _.keys(vals)) {
    letters[key[0]] = (letters[key[0]] || 0) + vals[key];
    letters[key[1]] = (letters[key[1]] || 0) + vals[key];
  }

  // bookend letters will have one too many counted
  letters[input.template[0]]--;
  letters[input.template[input.template.length - 1]]--;

  // each letter will be double-counted
  for (let letter of _.keys(letters)) {
    letters[letter] = letters[letter] / 2;
  }

  let sorted = _.values(letters).sort((a, b) => a - b);
  return sorted[sorted.length - 1] - sorted[0];
};

Solver.solve(io.readLines, getValues, getSolution, [{ steps: 10 }, { steps: 40 }]);

// Part 1 solution: 2851
// Part 2 solution: 10002813279338
