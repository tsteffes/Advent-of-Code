const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => {
  const parseItem = (item, tokens) => {
    const reg = /(?<inner>\[(?:(?:\$\d+|\d+|,)*)\])/g;
    const inners = [...item.matchAll(reg)].map(x => x.groups.inner);
    inners.forEach(i => {
      const a = [...i.substring(1, i.length - 1).split(',')];
      tokens.push(a);
      item = item.replace(i, '$' + (tokens.length - 1));
    });

    if (!item.startsWith('[') || !item.endsWith(']')) {
      return item;
    }

    return parseItem(item, tokens);
  };
  return input.map(i => i.split('\r\n').map(r => {
    let tokens = [];
    let res = parseItem(r, tokens);
    return { item: res, cur: res, tokens };
  }));
};

// const getValues2 = input => {
//   return input.map(i => i.split('\r\n'));
// };

// const parseArray2 = s => {
//   let level = 0;
//   for (let i = 1; i < s.length; i++) {
//     if (s[i] === ']' && level === 0) {
//       return { array: s.substring(1, i), rest: s.substring(i + 1) };
//     }

//     level += s[i] === '[' ? 1 : s[i] === ']' ? -1 : 0;
//   }
// }

// const isOrdered2 = (a, b) => {
//   let reg = /(?<num>\d+)(?:,(?<rest>.*))?/;
//   if (a.startsWith('[') && b.startsWith('[')) {
//     let arrayA = parseArray(a);
//     let arrayB = parseArray(b);
//     return isOrdered(a.substring(2, arrayA.length), b.substring(2, arrayB.length));
//   }
//   else if (a.startsWith('[')) {
//     let arrayA = parseArray(a);
//     let regB = b.match(reg).groups;
//     return isOrdered(a, '[' + b.num + ']');
//   }
//   else if (b.startsWith('[')) {

//   }
//   else {
//     let regA = a.match(reg).groups;
//     let regB = b.match(reg).groups;
//     if (parseInt(regA.num) > parseInt(regB.num)) {
//       return false;
//     }

//     return !regA.rest ? true : !regB.rest ? false : isOrdered(regA.rest, regB.rest);
//   }
// }

const isOrdered = (a, b) => {
  return 0;
}

const getSolution = (input, config) => {
  //return _.every(input.map(i => isOrdered(i[0].substring(1, i[0].length - 1), i[1].substring(1, i[1].length - 1))));
  return _.every(input.map(i => isOrdered(i[0], i[1])));
};

Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution);

// Part 1 solution:
// Part 2 solution:
