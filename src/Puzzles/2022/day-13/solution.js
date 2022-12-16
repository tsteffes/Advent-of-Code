const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = (input, config) => {
  config.additionalPackets && input.push(config.additionalPackets.join('\r\n'));
  const parseItem = (item, tokens) => {
    const reg = /(?<inner>\[(?:(?:\$\d+|\d+|,)*)\])/g;
    const inners = [...item.matchAll(reg)].map(x => x.groups.inner);
    inners.forEach(i => {
      const a = [];
      let sub = i.substring(1, i.length - 1);
      if (sub) {
        a.push(...sub.split(','))
      }

      tokens.push(a);
      item = item.replace(i, '$' + (tokens.length - 1));
    });

    if (!item.startsWith('[') || !item.endsWith(']')) {
      return item;
    }

    return parseItem(item, tokens);
  };
  return input.map(i => i.split('\r\n').map(r => {
    let orig = r;
    let tokens = [];
    parseItem(r, tokens);
    return { orig, tokens };
  }));
};

const isToken = s => s.startsWith('$');
const isOrdered = (a, aTokens, b, bTokens) => {
  for (let i = 0; i < a.length && i < b.length; i++) {
    if (!isToken(a[i]) && !isToken(b[i])) {
      if (parseInt(a[i]) < parseInt(b[i])) {
        return 1;
      }
      else if (parseInt(a[i]) > parseInt(b[i])) {
        return -1;
      }

      continue;
    }

    let left = isToken(a[i]) ? aTokens[a[i].substring(1)] : [a[i]];
    let right = isToken(b[i]) ? bTokens[b[i].substring(1)] : [b[i]];
    let res = isOrdered(left, aTokens, right, bTokens);
    if (res) return res;
  }

  return a.length < b.length ? 1 : a.length > b.length ? -1 : 0;
};

const getSolution = (input, config) => {
  if (config.part === 1) {
    let res = 0;
    for (let i = 0; i < input.length; i++) {
      let left = input[i][0];
      let right = input[i][1];
      if (isOrdered(left.tokens[left.tokens.length - 1], left.tokens, right.tokens[right.tokens.length - 1], right.tokens) === 1) {
        res += i + 1;
      }
    }

    return res;
  }

  let orderedPackets = input.reduce((arr, i) => {
    arr.push(i[0], i[1]);
    return arr;
  }, []).sort((a, b) => {
    return isOrdered(b.tokens[b.tokens.length - 1], b.tokens, a.tokens[a.tokens.length -1], a.tokens);
  });
  let indices = _.keys(_.pickBy(orderedPackets, (p => config.additionalPackets.includes(p.orig))));
  return indices.reduce((a, b) => (parseInt(a) + 1) * (parseInt(b) + 1));
};

const config = [{ }, { additionalPackets: ['[[2]]', '[[6]]'] }];
Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, config);

// Part 1 solution: 5717
// Part 2 solution: 25935
