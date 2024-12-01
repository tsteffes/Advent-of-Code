const dirs = { '>': [1, 0], '<': [-1, 0], '^': [0, -1], 'v': [0, 1] };
const getValues = input => {
  let map = input.map(r => r.split(''));
  let res = { time: 0, blizz: [], width: input[0].length, height: input.length, visits: {} };
  const gcd = (a, b) => !b ? a : gcd(b, a % b);
  const lcm = (a, b) => (a * b) / gcd(a, b);
  res.mod = lcm(res.width - 2, res.height - 2);
  res.target = { x: res.width - 2, y: res.height - 1 };
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (!['.', '#'].includes(map[y][x])) {
        res.blizz.push({ x, y, dir: dirs[map[y][x]] });
      }
    }
  }

  return res;
};

const updateBlizz = state => {
  state.blizz.forEach(b => {
    b.x += b.dir[0];
    b.x = b.x === state.width - 1 ? 1 : b.x === 0 ? state.width - 2 : b.x;
    b.y += b.dir[1];
    b.y = b.y === state.height - 1 ? 1 : b.y === 0 ? state.height - 2 : b.y;
  });
};
const getNextVisits = (state, pos) => {
  const res = [];
  [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => {
    const newPos = { x: pos.x + d[0], y: pos.y + d[1] };
    if ((inBounds(state, newPos) && !inBlizzard(state, newPos)) || isFinish(state, newPos)) {
        state.visits[newPos.x + '.' + newPos.y] = state.visits[newPos.x + '.' + newPos.y] || [];
        if (!state.visits[newPos.x + '.' + newPos.y].find(t => t % state.mod === (state.time + 1) % state.mod)) {
          state.visits[newPos.x + '.' + newPos.y].push(state.time + 1);
          res.push(newPos);
        }
      }
  });

  return res;
};
const inBlizzard = (state, pos) => state.blizz.find(b => b.x === pos.x && b.y === pos.y);
const inBounds = (state, pos) => {
  return (pos.x > 0 && pos.x < state.width - 1 && pos.y > 0 && pos.y < state.height - 1) ||
    (pos.x === 1 && pos.y === 0) ||
    (pos.x === state.width - 2 && pos.y === state.height - 1);
};
const isFinish = (state, pos) => pos.x === state.target.x && pos.y === state.target.y;
const getSolution = (state, config) => {
  let cur = [{ x: 1, y: 0 }];
  let caps = 0;
  do {
    let found = false;
    let next = [];
    updateBlizz(state);
    cur.forEach(c => {
      if (isFinish(state, c)) {
        found = true;
        return;
      }

      next = next.concat(...getNextVisits(state, c));
    });

    if (found) {
      if (config.caps === ++caps) {
        break;
      }

      next = [state.target];
      state.visits = {};
      state.target = caps === 1 ? { x: 1, y: 0 } : { x: state.width - 2, y: state.height - 1 };
    }

    cur = next;
  } while (++state.time);

  return state.time;
};

const config = [{ caps: 1 }, { caps: 3 }];
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution:
// Part 2 solution:
