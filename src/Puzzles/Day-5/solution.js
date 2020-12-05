const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');
const inputFile = 'src/Puzzles/Day-5/input.txt';

let getInput = () => io.readLines(inputFile);

let getValues = (input) => {
  return _.map(input, i => {
    let sum = 0;
    for (var j = 0; j < 10; j++) {
      sum += i[j] === 'B' || i[j] === 'R' ? Math.pow(2, 9-j) : 0;
    }

    return sum;
  });
}

let getSolution = (input, config) => {
  let vals = getValues(input);
  if (config.firstPuzzle) {
    return _.max(vals);
  }
  else {
    return _.filter(_.intersection(_.map(vals, s => s + 1), _.map(vals, s => s - 1)), s => vals.indexOf(s) == -1)[0];
  }
};

let solver = new Solver.Solver(getInput, getSolution, [{ firstPuzzle: true }, { firstPuzzle: false }]);
solver.solve();

// Part 1 solution: 888
// Part 2 solution: 522
