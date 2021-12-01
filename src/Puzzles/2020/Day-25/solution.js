const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

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

let getSolution = (input, config, part) => {
  input.cardLoopSize = getLoopCount(config.subject, input.cardPublicKey);
  input.doorLoopSize = getLoopCount(config.subject, input.doorPublicKey);
  input.encryptionKey = transform(input.doorPublicKey, input.cardLoopSize);
  return input.encryptionKey;
};

new Solver(2020, 25, io.readLines, getValues, getSolution, [{ subject: 7 }]).solve();

// Part 1 solution: 15217943
// Part 2 solution:
