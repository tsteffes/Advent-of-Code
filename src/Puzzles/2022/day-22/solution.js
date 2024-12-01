const getValues = input => {
  const map = input[0].split('\r\n').map(r => r.split(''));
  const instructions = [...input[1].matchAll(/(?<num>\d+)(?<turn>[LR])?/g)].map(m => m.groups);
  instructions.forEach(i => i.num = parseInt(i.num));
  return { map, instructions };
};

const turns = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null]
];
const sides = [[1, 0], [2, 0], [1, 1], [2, 0], [2, 1], [3, 0]];
const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const checkCollision = (map, pos) => {
  return map[pos[1]][pos[0]] === '#';
};
const getSide = (pos) => {
  return sides.find(s => {
    return
  });
};
const getNextState = (map, state, config) => {
  if (config.part === 1) {
    const dir = dirs[state.dir];
    const r = rowLimits(map, pos[1]);
    const c = colLimits(map, pos[0]);
    return {
      pos: [
        !dir[0] ? pos[0] : pos[0] + dir[0] > r[1] ? r[0] : pos[0] + dir[0] < r[0] ? r[1] : pos[0] + dir[0],
        !dir[1] ? pos[1] : pos[1] + dir[1] > c[1] ? c[0] : pos[1] + dir[1] < c[0] ? c[1] : pos[1] + dir[1]
      ],
      dir: state.dir
    };
  }
};
const rowLimits = (map, row) => {
  return [_.findIndex(map[row], c => ['.', '#'].includes(c)), _.findLastIndex(map[row], c => ['.', '#'].includes(c))];
};
const colLimits = (map, col) => {
  return [_.findIndex(map, r => ['.', '#'].includes(r[col])), _.findLastIndex(map, r => ['.', '#'].includes(r[col]))];
};
const getSolution = (input, config) => {
  if (config.part === 2) return;
  const state = { pos: [rowLimits(input.map, 0)[0], 0], dir: 0, side: 0 };
  input.instructions.forEach(i => {
    for (let j = 0; j < i.num; j++) {
      const nextState = getNextState(input.map, state, config);
      if (checkCollision(input.map, nextState)) {
        break;
      }

      state = nextState;
    }

    if (i.turn) {
      state.dir = (state.dir + 4 + (i.turn === 'R' ? 1 : -1)) % 4;
    }
  });

  return 1000 * (state.pos[1] + 1) + 4 * (state.pos[0] + 1) + state.dir;
};

const config = [{}, {}];
Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, config);

// Part 1 solution:
// Part 2 solution:
