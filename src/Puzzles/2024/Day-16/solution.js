require('../../../Helpers/global');

const configs = [{}, {}];
const parser = i => {
  const map = [];
  for (let y = 0; y < i.length; y++) {
    const row = [];
    for (let x = 0; x < i[0].length; x++) {
      const o = { pos: [x, y], type: i[y][x], costs: [null, null, null, null] };
      row.push(o);
    }

    map.push(row);
  }

  return map;
};
const getNeighbors = (map, el) => {
  let neighbors = [null, null, null, null];
  maps.cardinal4.forEach((c, i) => {
    let neighbor = map.getAt(el.pos.getNeighbor(c));
    if (neighbor.type !== '#') {
      neighbors[i] = neighbor;
    }
  });

  return neighbors;
};
const getNeighborCost = (costs, i) => {
  let neighborCosts = _.cloneDeep(costs);
  neighborCosts[i] = neighborCosts[i] === null ? null : neighborCosts[i] + 1;
  neighborCosts[(i + 1) % 4] = neighborCosts[(i + 1) % 4] === null ? null : neighborCosts[(i + 1) % 4] + 1001;
  neighborCosts[(i + 3) % 4] = neighborCosts[(i + 3) % 4] === null ? null : neighborCosts[(i + 3) % 4] + 1001;
  neighborCosts[(i + 2) % 4] = null;
  return neighborCosts;
};
const mapCosts = map => {
  const end = map.findElementWhere(v => v.type === 'E');
  end.costs = [0, 0, 0, 0];
  const locs = getNeighbors(map, end).filter(n => n);
  while (locs.length > 0) {
    const cur = locs.shift();
    const neighbors = getNeighbors(map, cur);
    let updated = false;
    neighbors.forEach((n, i) => {
      if (n) {
        let cost = _.min(getNeighborCost(n.costs, i).filter(c => c));
        if (cost && (!cur.costs[i] || cost < cur.costs[i])) {
          cur.costs[i] = cost;
          updated = true;
        }
      }
    });

    if (updated) {
      locs.push(...getNeighbors(map, cur).filter(n => n));
    }
  }
};
const solver = (map, config) => {
  mapCosts(map);
  const start = map.findElementWhere(v => v.type === 'S');
  if (config.part === 1) {
    start.costs[0] = start.costs[0] === null ? null : start.costs[0] + 1000;
    return _.min(start.costs);
  }

  let locations = [];
  const addChildLocations = (cur, dir) => {
    locations.push(cur);
    let costs = [null, null, null, null];
    costs[dir] = cur.costs[dir] === null ? null : cur.costs[dir];
    costs[(dir + 1) % 4] = cur.costs[(dir + 1) % 4] === null ? null : cur.costs[(dir + 1) % 4] + 1000;
    costs[(dir + 3) % 4] = cur.costs[(dir + 3) % 4] === null ? null : cur.costs[(dir + 3) % 4] + 1000;
    let min = _.min(costs.filter(c => c));
    let idxs = costs.findAllIndexes(v => v === min);
    idxs.forEach(i => {
      let neighbor = map.getAt(cur.pos.getNeighbor(maps.cardinal4[i]));
      if (!locations.includes(neighbor)) {
        addChildLocations(neighbor, i);
      }
    });
  };

  addChildLocations(start, 1);
  return _.uniqWith(locations, (a, b) => maps.isSameLocation(a.pos, b.pos)).length - 1;
};
new Puzzle(2024, 16)
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution: 111480
// Part 2 solution: 529
