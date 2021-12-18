const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

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
    vals[input.template[i] + input.template[i + 1]] = 1;
  }

  /*
  Template:     NNCB
  After step 1: NCNBCHB
  After step 2: NBCCNBBBCBHCB
  After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
  After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
  */
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

  let sorted = _.values(letters).sort((a, b) => a - b);
  return sorted[sorted.length - 1] - sorted[0];
};

new Solver(2021, 14, io.readLines, getValues, getSolution, [{ part: 1, steps: 10 }, { part: 2, steps: 40 }]).solve();

// Part 1 solution:
// Part 2 solution:
