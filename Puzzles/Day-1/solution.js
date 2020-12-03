const _ = require('lodash');
const io = require('../../Helpers/io');
const inputFile = 'Puzzles/Day-1/input.txt';
const target = 2020;

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

let input = [];
io.readLines(inputFile).forEach(d => input.push(parseInt(d, 10)));
console.log('Part one solution: ' + result(input, target, 2));
console.log('Part two solution: ' + result(input, target, 3));
