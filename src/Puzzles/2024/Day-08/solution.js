require('../../../Helpers/global');

const solver = (map, config) => {
  const elems = map.elementHashMap();
  const coords = map.getAllCoordinates();
  const antinodes = [];
  Object.keys(elems).filter(e => e !== '.').forEach(v => {
    const locs = elems[v].getUniquePairs();
    locs.forEach(v => {
      if (config.part === 1) {
        const xDiff = v[0][0] - v[1][0];
        const yDiff = v[0][1] - v[1][1];
        antinodes.push([v[0][0] + xDiff, v[0][1] + yDiff]);
        antinodes.push([v[1][0] - xDiff, v[1][1] - yDiff]);
      }
      else {
        antinodes.push(v[0], v[1], ...coords.filter(c => geometry.colinear(v[0], v[1], c)));
      }
    });
  });

  const inBounds = antinodes.filter(a => map.isInBounds(a));
  return inBounds.uniqueLocations().length;
};
new Puzzle(2024, 8)
  .withSolver(solver)
  .solve();

// Part 1 solution: 390
// Part 2 solution: 1246
