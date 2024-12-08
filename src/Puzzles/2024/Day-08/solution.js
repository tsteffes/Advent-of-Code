require('../../../Helpers/global');

const solver = (map, config) => {
  const elems = map.elementHashMap();
  const coords = map.getAllCoordinates();
  const antinodes = [];
  const inLine = (a, b, c) => a[0] === b[0] === c[0] || ((c[1] - a[1]) / (c[0] - a[0])) === ((c[1] - b[1]) / (c[0] - b[0]));
  Object.keys(elems).filter(e => e !== '.').forEach(v => {
    let locs = elems[v].getUniquePairs();
    locs.forEach(v => {
      if (config.part === 1) {
        let xDiff = v[0][0] - v[1][0];
        let yDiff = v[0][1] - v[1][1];
        antinodes.push([v[0][0] + xDiff, v[0][1] + yDiff]);
        antinodes.push([v[1][0] - xDiff, v[1][1] - yDiff]);
      }
      else {
        antinodes.push(v[0], v[1], ...coords.filter(c => inLine(v[0], v[1], c)));
      }
    });
  });

  const inBounds = antinodes.filter(a => map.isInBounds(a[0], a[1]));
  return _.uniqWith(inBounds, (a, b) => a[0] === b[0] && a[1] === b[1]).length;
};
new Puzzle(2024, 8)
  .withSolver(solver)
  .solve();

// Part 1 solution: 390
// Part 2 solution: 1246
