const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = (input, config) => {
  const nums = input.map(v => parseInt(v) * config.decryptionKey);
  let cur = { val: nums[0] };
  const result = [cur];
  for (let i = 1; i < nums.length; i++) {
    const next = { val: nums[i], prev: cur };
    cur.next = next;
    result.push(next);
    cur = next;
  }

  result[0].prev = cur;
  cur.next = result[0];
  return result;
};

const getSolution = (input, config) => {
  _.times(config.iterations, () => {
    for (let cur of input) {
      _.times(Math.abs(cur.val) % (input.length - 1), () => {
        if (cur.val > 0) {
          let prev = cur.prev;
          let next = cur.next;
          let nextNext = cur.next.next;
          next.prev = prev;
          prev.next = next;
          next.next = cur;
          nextNext.prev = cur;
          cur.prev = next;
          cur.next = nextNext;
        }
        else {
          let prev = cur.prev;
          let next = cur.next;
          let prevPrev = cur.prev.prev;
          prev.next = next;
          next.prev = prev;
          prev.prev = cur;
          prevPrev.next = cur;
          cur.next = prev;
          cur.prev = prevPrev;
        }
      });
    }
  });

  let cur = input.find(v => v.val === 0);
  let sum = 0;
  _.times(3, () => {
    _.times(1000 % input.length, () => cur = cur.next);
    sum += cur.val;
  });

  return sum;
};

const config = [{ decryptionKey: 1, iterations: 1 }, {decryptionKey: 811589153, iterations: 10 }]
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution: 13183
// Part 2 solution: 6676132372578
