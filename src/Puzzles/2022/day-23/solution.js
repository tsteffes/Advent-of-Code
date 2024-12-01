const dirs = [[[-1, -1], [0, -1], [1, -1]], [[-1, 1], [0, 1], [1, 1]], [[-1, -1], [-1, 0], [-1, 1]], [[1, -1], [1, 0], [1, 1]]];
const getValues = input => {
  let map = input.map(r => r.split(''));
  let res = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '#') {
        res.push({ x, y, id: x + '.' + y });
      }
    }
  }

  return res;
};
const findCurrentCollision = (elves, elf, dir) => {
  return !!elves.find(e => e.x === elf.x + dir[0] && e.y === elf.y + dir[1]);
};
const findProposedCollision = (elves, elf) => {
  return !!elves.find(e => e.id !== elf.id && e.proposed && e.proposed.x === elf.proposed.x && e.proposed.y === elf.proposed.y);
};
const getSolution = (elves, config) => {
  let i = 0;
  for (; !config.steps || i < config.steps; i++) {
    elves.forEach(e => {
      let open = 0;
      for (let d = 0; d < 4; d++) {
        let dir = dirs[(i + d) % 4];
        if (!dir.find(d => findCurrentCollision(elves, e, d))) {
          open++;
          if (!e.proposed) {
            e.proposed = { x: e.x + dir[1][0], y: e.y + dir[1][1] };
          }
        }
      }

      if (open === 4) {
        e.proposed = null;
      }
    });

    elves.filter(e => e.proposed).forEach(e => e.proposed.collision = findProposedCollision(elves, e));

    if (!elves.find(e => e.proposed && !e.proposed.collision)) {
      break;
    }

    elves.forEach(e => {
      e.x = !e.proposed || e.proposed.collision ? e.x : e.proposed.x;
      e.y = !e.proposed || e.proposed.collision ? e.y : e.proposed.y;
      e.proposed = null;
    });
  }

  if (config.part === 1) {
    const xRange = _.max(elves.map(e => e.x)) - _.min(elves.map(e => e.x));
    const yRange = _.max(elves.map(e => e.y)) - _.min(elves.map(e => e.y));
    return ((xRange + 1) * (yRange + 1)) - elves.length;
  }

  return i + 1;
};

const config = [{ steps: 10 }, { }];
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution: 4218
// Part 2 solution: 976
