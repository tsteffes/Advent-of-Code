const _ = require('lodash');
const io = require('../../Helpers/io');
const logger = require('../../Helpers/logger');
const inputFile = 'Puzzles/Day-1/input.txt';
const target = 2020;

let getInput = () => _.map(io.readLines(inputFile), d => parseInt(d, 10));

let result = (collection, t, n) => {
  const sorted = _.sortBy(collection);
  let indices = _.reverse([...Array(n).keys()]);

  do {
    if (_.map(indices, i => sorted[i]).reduce((a, b) => a + b) === t) {
      return _.map(indices, i => sorted[i]).reduce((a, b) => a * b, 1);
    }

    // determine how many rollovers we have
    let j = 0;
    while (indices[j] === (collection.length - j)) {
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
  } while (indices[n - 1] < (sorted.length - n));

  throw ('No solution.');
};

let input = getInput();
logger.log([result(input, target, 2), result(input, target, 3)]);

// Part 1 solution: 910539
// Part 2 solution: 116724144
