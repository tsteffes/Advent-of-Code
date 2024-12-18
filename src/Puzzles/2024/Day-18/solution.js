require('../../../Helpers/global');

const reg = /(?<x>\d+),(?<y>\d+)/g;
const configs = [{}, {}];
const parser = i => {
  return i.map(v => {
    const m = [...v.matchAll(reg)].map(g => g.groups)[0];
    return [parseInt(m.x), parseInt(m.y)];
  });
};
const getPathLength = map => {
  let locs = [map.getAt([0, 0])];
  locs[0].min = 1;
  while (locs.length > 0) {
    const cur = locs.shift();
    const neighbors = maps.cardinal4
      .map(c => cur.pos.getNeighbor(c))
      .filter(v => map.isInBounds(v))
      .map(n => map.getAt(n))
      .filter(n => n.type !== '#');
    neighbors.forEach(n => {
      if (!n.min || (n.min > (cur.min + 1))) {
        n.min = cur.min + 1;
        locs.push(n);
      }
    });
  }

  let end = map.getAt([map.length - 1, map.length - 1]);
  return end.min ? end.min - 1 : null;
};
const buildMap = (size, bytes, numBytes) => {
  const blocks = _.cloneDeep(bytes).slice(0, numBytes);
  const map = [];
  for (let y = 0; y <= size; y++) {
    const row = [];
    for (let x = 0; x <= size; x++) {
      row.push({ pos: [x, y], type: _.find(blocks, b => b[0] === x && b[1] === y) ? '#' : '.' });
    }

    map.push(row);
  }

  return map;
};
const solver = (bytes, config) => {
  const size = config.test ? 6 : 70;
  if (config.part === 1) {
    const map = buildMap(size, bytes, config.test ? 12 : 1024);
    return getPathLength(map);
  }

  for (let i = 0; i < bytes.length; i++) {
    const map = buildMap(size, bytes, i);
    const minSteps = getPathLength(map);
    if (!minSteps) {
      // return bytes[i - 1][0] + ',' + bytes[i - 1][1];
      return bytes[i - 1];
    }
  }
};
new Puzzle(2024, 18)
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution:
// Part 2 solution:
