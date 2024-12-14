require('../../../Helpers/global');

const reg = /p\=(?<px>-?\d+),(?<py>-?\d+) v\=(?<vx>-?\d+),(?<vy>-?\d+)/g;
const configs = [{ dimensions: [101, 103], ticks: 100 }, { dimensions: [101, 103], ticks: 100 }];
const parser = i => i.map(v => {
  let vals = [...v.matchAll(reg)].map(m => m.groups)[0];
  return { pos: [parseInt(vals.px), parseInt(vals.py)], vel: [parseInt(vals.vx), parseInt(vals.vy)] };
});
const mod = (val, div) => ((val % div) + div) % div;
const simulate = (robots, dims, ticks) => {
  robots.forEach(r => {
    r.pos = r.pos.getNeighbor([r.vel[0] * ticks, r.vel[1] * ticks]);
    r.pos[0] = mod(r.pos[0], dims[0]);
    r.pos[1] = mod(r.pos[1], dims[1]);
  });
};
const getQuad = (pos, dims) => {
  return pos[0] < (dims[0] - 1) / 2 && pos[1] < (dims[1] - 1) / 2 ? 0 :
         pos[0] > (dims[0] - 1) / 2 && pos[1] < (dims[1] - 1) / 2 ? 1 :
         pos[0] > (dims[0] - 1) / 2 && pos[1] > (dims[1] - 1) / 2 ? 2 :
         pos[0] < (dims[0] - 1) / 2 && pos[1] > (dims[1] - 1) / 2 ? 3 : 4 ;
};
const countQuads = (robots, dims) => {
  let res = [0, 0, 0, 0, 0];
  robots.forEach(r => res[getQuad(r.pos, dims)]++);
  return res;
};
const variance = (arr = []) => {
  const median = _.sum(arr) / arr.length;
  let variance = 0;
  arr.forEach(a => variance += (a - median) * (a - median));
  variance = variance / arr.length;
  return variance;
};
const solver = (robots, config) => {
  if (config.part === 1) {
    simulate(robots, config.dimensions, config.ticks);
    return countQuads(robots, config.dimensions).slice(0, 4).reduce((d, prev) => d * prev, 1);
  }

  let treeIdx = 0;
  let vars = [[], []];
  while (true) {
    treeIdx++;
    simulate(robots, config.dimensions, 1);
    // if most of the robots fit into a small square, assume it's a tree
    xVar = variance(robots.map(r => r.pos[0]));
    vars[0].push(xVar);
    yVar = variance(robots.map(r => r.pos[1]));
    vars[1].push(yVar);
    if (xVar < (0.7 * _.mean(vars[0])) && yVar < (0.7 * _.mean(vars[1]))) {
      break;
    }
  }

  return treeIdx;
};
new Puzzle(2024, 14)
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution: 218433348
// Part 2 solution: 6512
