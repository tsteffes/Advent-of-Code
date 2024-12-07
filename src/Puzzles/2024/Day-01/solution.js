require('../../../Helpers/global');

const parser = i => {
  return {
    a: _.sortBy(i.map(v => parseInt(v.split('   ')[0]))),
    b: _.sortBy(i.map(v => parseInt(v.split('   ')[1]))),
    idxs: _.range(0, i.length)
  };
};
const solver = (o, config) => _.sum(o.idxs.map(i => config.algo(o.a, o.b, i)));
new Puzzle(2024, 1)
  .withParser(parser)
  .withSolver(solver)
  .solve([
    { algo: (a, b, i) => Math.abs(a[i] - b[i]) },
    { algo: (a, b, i) => a[i] * b.filter(v => v === a[i]).length }
  ]);

// Part 1 solution: 1879048
// Part 2 solution: 21024792
