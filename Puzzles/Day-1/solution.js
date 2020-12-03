const _ = require('lodash');
const io = require('../../Helpers/io');
const inputFile = 'Puzzles/Day-1/input.txt';

let input = [];
io.readLines(inputFile).forEach(d => input.push(parseInt(d, 10)));

const target = 2020;
const numberOfOperands = 3;

/*
This solution works by creating a collection of n integers which represent the
indices of the numbers in the collection that are being evaluated in a given iteration.
Until the solution is found, the indices are incremented similarly to an analog rollover counter.
This could be made more efficient by initiating a rollover as soon as the sum exceeds the target,
since we are indexing a sorted collection.
 */
let result = (collection, t, n) => {
  const sorted = _.sortBy(collection);
  let indices = _.reverse([...Array(n).keys()]);

  do {
    if (sum(sorted, indices) === t) {
      return product(sorted, indices);
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

let sum = (collection, indices) => {
  let result = 0;
  indices.forEach(i => result += collection[i]);
  return result;
}

let product = (collection, indices) => {
  let result = 1;
  indices.forEach(i => result *= collection[i]);
  return result;
};

console.log(result(input, target, numberOfOperands));
