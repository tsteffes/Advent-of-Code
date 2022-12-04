const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

let getValues = input => {
  return {
    cardPublicKey: parseInt(input[0]),
    doorPublicKey: parseInt(input[1]),
  };
};

let calculate = (a, b) => (a * b) % 20201227;

let transform = (val, loops) => {
  return [...Array(loops).keys()].reduce(v => calculate(v, val), 1);
};

let getLoopCount = (val, target) => {
  let loops = 0;
  let res = 1;
  do {
    res = calculate(res, val);
    loops++;
  } while (res !== target);

  return loops;
}

let getSolution = (input, config) => {
  input.cardLoopSize = getLoopCount(config.subject, input.cardPublicKey);
  input.doorLoopSize = getLoopCount(config.subject, input.doorPublicKey);
  input.encryptionKey = transform(input.doorPublicKey, input.cardLoopSize);
  return input.encryptionKey;
};

Solver.solve(io.readLines, getValues, getSolution, [{ subject: 7 }]);

// Part 1 solution: 15217943
// Part 2 solution:
