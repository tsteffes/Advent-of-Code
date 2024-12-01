const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');
const sides = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];

const getValues = input => input.map(i => i.split(',').map(v => parseInt(v)));
const getEdges = lava => {
  return {
    x: [_.min(lava.map(i => i[0])) - 1, _.max(lava.map(i => i[0])) + 1],
    y: [_.min(lava.map(i => i[1])) - 1, _.max(lava.map(i => i[1])) + 1],
    z: [_.min(lava.map(i => i[2])) - 1, _.max(lava.map(i => i[2])) + 1]
  };
};
const inCollection = (coll, loc) => {
  return !!_.find(coll, c => c[0] === loc[0] && c[1] === loc[1] && c[2] === loc[2]);
};
const inBounds = (edges, side) => {
  return side[0] >= edges.x[0] && side[0] <= edges.x[1]
    && side[1] >= edges.y[0] && side[1] <= edges.y[1]
    && side[2] >= edges.z[0] && side[2] <= edges.z[1];
};
const getSolution = (lava, config) => {
  let edges = getEdges(lava);
  let water = [[edges.x[0], edges.y[0], edges.z[0]]];
  let added;

  if (config.part === 2) {
    do {
      added = false;
      water.forEach(w => {
        sides.forEach(s => {
          let side = [w[0] + s[0], w[1] + s[1], w[2] + s[2]];
          if (inBounds(edges, side) && !inCollection(lava, side) && !inCollection(water, side)) {
            water.push(side);
            added = true;
          }
        });
      });
    } while (added);
  }

  return (6 * lava.length) - _.sum(lava.map(i => {
    return _.filter(sides, s => {
      let side = [i[0] + s[0], i[1] + s[1], i[2] + s[2]];
        return config.part === 1 ? inCollection(lava, side) : !inCollection(water, side);
    }).length;
  }));
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution: 4314
// Part 2 solution: 2444
