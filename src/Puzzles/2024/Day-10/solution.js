require('../../../Helpers/global');

const parser = i =>  i.map(r => r.split('').map(v => { return { val: parseInt(v), reachables: [] }; }));
const solver = (map, config) => {
  for (let i of _.range(9, -1, -1)) {
    let locs = map.findAllWhere(l => l.val === i);
    locs.forEach(l => {
      let cur = map[l[1]][l[0]];
      if (i === 9) {
        cur.reachables.push(l);
        return;
      }

      maps.cardinal4.filter(c => map.isInBounds(l[0] + c[0], l[1] + c[1])).forEach(c => {
        let neighbor = map[l[1] + c[1]][l[0] + c[0]];
        if (neighbor.val === i + 1) {
          cur.reachables.push(...neighbor.reachables);
        }
      });
    });
  }

  return _.sum(map.findAllWhere(l => l.val === 0).map(l => {
    let cur = map[l[1]][l[0]];
    return config.part === 1 ? _.uniqWith(cur.reachables, (a, b) => a[0] === b[0] && a[1] === b[1]).length : cur.reachables.length;
  }));
};
new Puzzle(2024, 10)
  .withParser(parser)
  .withSolver(solver)
  .solve();

// Part 1 solution: 459
// Part 2 solution: 1034
