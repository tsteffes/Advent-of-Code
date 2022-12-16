const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = (input, config) => {
  config.additionalPackets && input.push(config.additionalPackets.join('\r\n'));
  return input.map(i => i.split('\r\n').map(r => JSON.parse(r)));
};

const isOrdered = (a, b) => {
  for (let i = 0; i < a.length && i < b.length; i++) {
    if (!Array.isArray(a[i]) && !Array.isArray(b[i])) {
      if (a[i] < b[i]) {
        return 1;
      }
      else if (a[i] > b[i]) {
        return -1;
      }

      continue;
    }

    let left = Array.isArray(a[i]) ? a[i] : [a[i]];
    let right = Array.isArray(b[i]) ? b[i] : [b[i]];
    let res = isOrdered(left, right);
    if (res) return res;
  }

  return a.length < b.length ? 1 : a.length > b.length ? -1 : 0;
};

const getSolution = (input, config) => {
  if (config.part === 1) {
    let res = 0;
    for (let i = 0; i < input.length; i++) {
      if (isOrdered(input[i][0], input[i][1]) === 1) {
        res += i + 1;
      }
    }

    return res;
  }

  let orderedPackets = input.reduce((arr, i) => {
    arr.push(i[0], i[1]);
    return arr;
  }, []).sort((a, b) => {
    return isOrdered(b, a);
  });
  let indices = _.keys(_.pickBy(orderedPackets, (p => config.additionalPackets.includes(JSON.stringify(p)))));
  return indices.reduce((a, b) => (parseInt(a) + 1) * (parseInt(b) + 1));
};

const config = [{ }, { additionalPackets: ['[[2]]', '[[6]]'] }];
Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, config);

// Part 1 solution: 5717
// Part 2 solution: 25935
