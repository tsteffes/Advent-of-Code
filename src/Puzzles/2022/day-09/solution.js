const directions = { R: { x: 1, y: 0 }, L: { x: -1, y: 0 }, U: { x: 0, y: 1 }, D: { x: 0, y: -1 } };
const getValues = input => input.map(i => i.match(/(?<direction>[RLUD])\s(?<distance>\d+)/).groups);
const getSolution = (input, config) => {
  const rope = [], visited = [];
  _.times(config.knots, () => rope.push({ x: 0, y: 0 }));
  input.forEach(move => {
    _.times(parseInt(move.distance), () => {
      ['x', 'y'].forEach(d => rope[0][d] += directions[move.direction][d]);
      for (let i = 0; i < config.knots - 1; i++) {
        const xDiff = rope[i].x - rope[i + 1].x;
        const yDiff = rope[i].y - rope[i + 1].y;
        rope[i + 1].x += Math.abs(xDiff) + Math.abs(yDiff) === 3 || Math.abs(xDiff) === 2 ? (xDiff > 0 ? 1 : -1) : 0;
        rope[i + 1].y += Math.abs(xDiff) + Math.abs(yDiff) === 3 || Math.abs(yDiff) === 2 ? (yDiff > 0 ? 1 : -1) : 0;
      }

      visited.push(rope[config.knots - 1].x + ',' + rope[config.knots - 1].y);
    });
  });

  return _.uniq(visited).length;
};

Solver.solve(io.readLines, getValues, getSolution, [{ knots: 2 }, { knots: 10 }]);

// Part 1 solution: 5695
// Part 2 solution: 2434
