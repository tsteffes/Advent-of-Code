const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const dirs = [[0, -1], [-1, 0], [1, 0], [0, 1]];
const getValues = input => {
  const res = { start: null, map: [], lowPoints: [] };
  for (let y = 0; y < input.length; y++) {
    const row = [];
    for (let x = 0; x < input[y].length; x++) {
      const val = input[y][x].charCodeAt();
      const point = { x: x, y: y, val: val === 69 ? 123 : val === 83 ? 96 : val, steps: null };
      row.push(point);
      res.end = val === 69 ? point : res.end;
      res.start = val === 83 ? point : res.start;
      val === 97 ? res.lowPoints.push(point) : null;
    }

    res.map.push(row);
  }

  res.end.steps = 0;
  return res;
};

const getSolution = (input, config) => {
  const stack = [input.end];
  const map = input.map;
  while (stack.length > 0) {
    const p = stack.pop();
    dirs.forEach(d => {
      const x = p.x + d[0];
      const y = p.y + d[1];
      if (x >= 0 && x < map[0].length && y >= 0 && y < map.length) {
        const neighbor = map[y][x];
        if (p.val - neighbor.val <= 1) {
          const newSteps = neighbor.steps === null ? p.steps + 1 : Math.min(neighbor.steps, p.steps + 1);
          if (neighbor.steps === null || newSteps < neighbor.steps) {
            stack.push(neighbor);
            neighbor.steps = newSteps;
          }
        }
      }
    });
  };

  return config.res(input);
};

const config = [{ res: i => i.start.steps }, { res: i => _.min(i.lowPoints.map(p => p.steps)) }];
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution: 456
// Part 2 solution: 454
