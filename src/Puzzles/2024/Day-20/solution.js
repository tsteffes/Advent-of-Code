require('../../../Helpers/global');

const parser = i => {
  const map = [];
  for (let y = 0; y < i.length; y++) {
    const row = [];
    for (let x = 0; x < i[0].length; x++) {
      const o = { pos: [x, y], type: i[y][x], dist: null, neighbors: [], skips: [] };
      row.push(o);
    }

    map.push(row);
  }

  return map;
};
const getWalkingDistance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
const walkable = loc => loc && ['.', 'E', 'S'].includes(loc.type);
const populateNeighbors = map => {
  map.getAllElements().forEach(cur => {
    maps.cardinal4.forEach(c => {
      cur.neighbors.push(map.getAtOrNull(cur.pos.getNeighbor(c)));
    });
  });
};
const populateDistances = map => {
  const end = map.findElementWhere(v => v.type === 'E');
  end.dist = 1;
  const locs = end.neighbors.filter(walkable);
  while (locs.length > 0) {
    const cur = locs.shift();
    const neighbors = cur.neighbors.filter(walkable).filter(n => n.dist !== null);
    const dist = _.min(neighbors.map(n => n.dist)) + 1;
    if (cur.dist === null || cur.dist > dist) {
      cur.dist = dist;
      locs.push(...cur.neighbors.filter(walkable));
    }
  }
};
const populateSkips = (map, length, threshold) => {
  map.findElementsWhere(walkable).forEach(cur => {
    map.findElementsWhere(walkable).forEach(neighbor => {
      const walkingDist = getWalkingDistance(neighbor.pos, cur.pos);
      const timeSave = cur.dist - neighbor.dist - walkingDist;
      if (walkingDist <= length && timeSave >= threshold) {
        cur.skips.push(timeSave);
      }
    });
  });
};
const solver = (map, config) => {
  populateNeighbors(map);
  populateDistances(map);
  populateSkips(map, config.skip, config.threshold);
  return _.sum(map.getAllElements().map(e => e.skips.length));
};
new Puzzle(2024, 20)
  .withParser(parser)
  .withSolver(solver)
  .solve([{ threshold: 100, skip: 2 }, { threshold: 100, skip: 20 }]);

// Part 1 solution: 1530
// Part 2 solution: 1033983
