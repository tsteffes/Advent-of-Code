const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const dirs = { R: [1, 0], L: [-1, 0], U: [0, 1], D: [0, -1] };
const getValues = input => input.map(i => i.match(/(?<dir>[RLUD])\s(?<dist>\d+)/).groups);
const getSolution = (input, config) => {
  const state = { locs: [], segs: [] };
  _.times(config.len + 1, () => state.segs.push([0, 0]));
  input.forEach(move => {
    _.times(parseInt(move.dist), () => {
      state.segs[0][0] += dirs[move.dir][0];
      state.segs[0][1] += dirs[move.dir][1];
      for (let i = 0; i < config.len; i++) {
        const seg1 = state.segs[i];
        const seg2 = state.segs[i + 1];
        if (Math.abs(seg1[0] - seg2[0]) + Math.abs(seg1[1] - seg2[1]) === 3) {
          seg2[0] += seg2[0] > seg1[0] ? -1 : 1;
          seg2[1] += seg2[1] > seg1[1] ? -1 : 1;
        }
        else {
          seg2[0] += Math.abs(seg1[0] - seg2[0]) === 2 ? (seg1[0] > seg2[0] ? 1 : -1) : 0;
          seg2[1] += Math.abs(seg1[1] - seg2[1]) === 2 ? (seg1[1] > seg2[1] ? 1 : -1) : 0;
        }
      }

      state.locs.push(state.segs[config.len][0] + ',' + state.segs[config.len][1]);
    });
  });

  return _.uniq(state.locs).length;
};

Solver.solve(io.readLines, getValues, getSolution, [ { len: 1 }, { len: 9 }]);

// Part 1 solution: 5695
// Part 2 solution: 2434
