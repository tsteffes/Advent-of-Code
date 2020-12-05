const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');
const inputFile = 'src/Puzzles/Day-5/input.txt';

let getInput = () => io.readLines(inputFile);

let getValues = (input) => {
  return _.map(input, i => {
    let row = 0;
    let col = 0;
    for (var j = 0; j < 7; j++) {
      row += i[j] === 'B' ? Math.pow(2, 6-j) : 0;
    }

    for (var k = 0; k < 3; k++) {
      col += i[k+7] === 'R' ? Math.pow(2, 2-k) : 0;
    }

    return row * 8 + col;
  });
}

let getSolution = (input, config) => {
  let vals = getValues(input);
  if (config.firstPuzzle) {
    return _.max(vals);
  }
  else {
    let sorted = _.sortBy(vals);
    return _.filter(_.intersection(_.map(sorted, s => s + 1), _.map(sorted, s => s - 1)), s => sorted.indexOf(s) == -1);
  }
};

let solver = new Solver.Solver(getInput, getSolution, [{ firstPuzzle: true }, { firstPuzzle: false }]);
solver.solve();

// Part 1 solution: 888
// Part 2 solution: 522
