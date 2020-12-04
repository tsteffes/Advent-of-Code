const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');
const inputFile = 'src/Puzzles/Day-1/input.txt';
const target = 2020;

let getInput = () => _.map(io.readLines(inputFile), d => parseInt(d, 10));

let getSolution = (input, config) => {
  const sorted = _.sortBy(input);
  let indices = _.reverse([...Array(config.operands).keys()]);

  do {
    if (_.map(indices, i => sorted[i]).reduce((a, b) => a + b) === config.target) {
      return _.map(indices, i => sorted[i]).reduce((a, b) => a * b, 1);
    }

    let j = 0;
    while (indices[j] === (input.length - j)) {
      j++;
    }

    if (j > 0) {
      indices[j]++;
      while (j > 0) {
        indices[j - 1] = indices[j] + 1;
        j--;
      }
    }
    else {
      indices[0]++;
    }
  } while (indices[config.operands - 1] < (sorted.length - config.operands));
};

let solver = new Solver.Solver(getInput, getSolution, [{ target, operands: 2 }, { target, operands: 3 }]);
solver.solve();

// Part 1 solution: 910539
// Part 2 solution: 116724144
