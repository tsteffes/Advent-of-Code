const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => {
  let pairs = [];
  input.forEach(i => {
    let row = i.split('->');
    const reg = /\s*(?<x>\d+),(?<y>\d+)\s*/;
    for (let j = 0; j < row.length - 1; j++) {
      const p1 = row[j].match(reg).groups;
      const p2 = row[j + 1].match(reg).groups
      pairs.push([
        { x: parseInt(p1.x), y: parseInt(p1.y)},
        { x: parseInt(p2.x), y: parseInt(p2.y)}
      ]);
    }
  })

  return pairs;
};

const between = (val, end1, end2) => {
  return (end1 > end2 && val <= end1 && val >= end2)
    || (end1 < end2 && val >= end1 && val <= end2);
}
const isBlocked = (state, pos) => {
  if (_.find(state.sand, s => s.x === pos.x && s.y === pos.y)) {
    return true;
  }

  return !!_.find(state.pairs, p => {
    if (state.yFloor && pos.y === state.yFloor) {
      return true;
    }

    return p[0].x === p[1].x && p[0].x === pos.x && between(pos.y, p[0].y, p[1].y)
      || p[0].y === p[1].y && p[0].y === pos.y && between(pos.x, p[0].x, p[1].x);
  });
}

const getSolution = (pairs, config) => {
  const yMax = _.max(pairs.map(i => Math.max(i[0].y, i[1].y)));
  const state = { sand: [], pairs: pairs, yFloor: config.part === 2 ? yMax + 2 : null };
  while (true) {
    const pos = { x: 500, y: 0 };
    while (true) {
      if (pos.y > yMax && config.part === 1) {
        break;
      }

      if (!isBlocked(state, { x: pos.x, y: pos.y + 1})) {
        pos.y++;
        continue;
      }
      else if (!isBlocked(state, { x: pos.x - 1, y: pos.y + 1})) {
        pos.x--;
        pos.y++;
        continue;
      }
      else if (!isBlocked(state, { x: pos.x + 1, y: pos.y + 1})) {
        pos.x++;
        pos.y++;
        continue;
      }

      state.sand.push(pos);
      break;
    }

    if ((config.part === 1 && pos.y > yMax) || (config.part === 2 && pos.y === 0)) {
      break;
    }
  }

  return state.sand.length;
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution: 696
// Part 2 solution: 23610 (takes about 8 minutes to run...)
