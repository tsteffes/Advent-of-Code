const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');
const inputFile = 'src/Puzzles/Day-1/input.txt';
const target = 2020;

let getInput = () => _.map(io.readLines(inputFile), d => parseInt(d, 10));

let getSolution = (input, config) => {
  const sorted = _.sortBy(input);
  let indices = new Array(config.operands).fill(0);

  while (indices[config.operands - 1] <= input.length) {
    let nums = _.map(indices, i => sorted[i]);
    if (_.sum(nums) === config.target) {
      return nums.reduce((a, b) => a * b);
    }

    // loop without repeating any combinations
    let j = 0;
    while (indices[j] === input.length - j - 1) {
      j++;
    }

    indices[j]++;
    while (j > 0) {
      indices[j - 1] = indices[j--] + 1;
    }
  }
};

let solver = new Solver.Solver(getInput, getSolution, [{ target, operands: 2 }, { target, operands: 3}]);
solver.solve();

// Part 1 solution: 910539
// Part 2 solution: 116724144
