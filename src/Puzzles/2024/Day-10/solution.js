require('../../../Helpers/global');

const parser = i => maps.parse(i, '', v => { return { val: parseInt(v), reachables: [] }; });
const solver = (map, config) => {
  for (let num of _.reverse(_.range(10))) {
    for (let loc of map.findAllWhere(loc => loc.val === num)) {
      if (num === 9) {
        map.getAt(loc).reachables.push(loc);
      }
      else {
        for (let dir of maps.cardinal4.filter(dir => map.isInBounds(loc.getNeighbor(dir)))) {
          let neighbor = map.getAt(loc.getNeighbor(dir));
          if (neighbor.val === num + 1) {
            map.getAt(loc).reachables.push(...neighbor.reachables);
          }
        }
      }
    }
  }

  return _.sum(map.findAllWhere(loc => loc.val === 0).map(loc => {
    let r = map.getAt(loc).reachables;
    return config.part === 1 ? r.uniqueLocations().length : r.length;
  }));
};
new Puzzle(2024, 10)
  .withParser(parser)
  .withSolver(solver)
  .solve();

// Part 1 solution: 459
// Part 2 solution: 1034
