require('../../../Helpers/global');

const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const nextPos = guard => [guard.pos[0] + guard.dir[0], guard.pos[1] + guard.dir[1]];
const turnGuard = puz => puz.guard.dir = dirs[(_.findIndex(dirs, d => puz.guard.dir.equals(d)) + 1) % 4];
const colliding = puz => _.some(puz.blocks, b => b.equals(nextPos(puz.guard)));
const exitingBounds = puz => !puz.map.isInBounds(nextPos(puz.guard)[0], nextPos(puz.guard)[1]);
const hasCycle = puz => _.some(puz.guard.collisions, c => c.pos.equals(puz.guard.pos) && c.dir.equals(puz.guard.dir));
const moveGuard = puz => {
  while (!exitingBounds(puz) && !colliding(puz)) {
    puz.guard.pos = nextPos(puz.guard);
    puz.guard.visited.push(puz.guard.pos);
  }
};
const simulate = puz => {
  while(true) {
    moveGuard(puz);

    if (exitingBounds(puz)) {
      return;
    }

    if (colliding(puz)) {
      if (hasCycle(puz)) {
        puz.cycle = true;
        return;
      }

      puz.guard.collisions.push({ pos: puz.guard.pos, dir: puz.guard.dir });
      turnGuard(puz);
    }
  }
};
new Puzzle(2024, 6)
  .withParser(map => map)
  .withSolver((map, config) => {
    const blocks = map.findAll('#');
    const start = map.findElement('^');
    const initGuard = () => { return { pos: start, dir: [0, -1], visited: [start], collisions: [] }; };
    const initPuz = (map, blocks) => { return { map, blocks, guard: initGuard() } };
    let puz = initPuz(map, blocks);
    simulate(puz);
    let visited = _.uniqWith(puz.guard.visited, (a, b) => a[0] === b[0] && a[1] === b[1]);
    if (config.part === 1) {
      return visited.length;
    }

    return _.sum(_.filter(visited, v => !v.equals(start)).map(v => {
      puz = initPuz(map, _.concat(blocks, [v]));
      simulate(puz);
      return puz.cycle ? 1 : 0;
    }));
  })
  .solve();

// Part 1 solution: 5086
// Part 2 solution: 1770 - runs in ~60s
