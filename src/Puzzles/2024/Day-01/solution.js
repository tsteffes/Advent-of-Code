require('../../../Helpers/global');

const parseInput = i => {
  let res = i.reduce((prev, curr) => {
    prev[0].push(parseInt(curr.split('   ')[0]));
    prev[1].push(parseInt(curr.split('   ')[1]));
    return prev;
  }, [[], []]);
  return { len: res[0].length, a: _.sortBy(res[0]), b: _.sortBy(res[1]) };
};
const first = (a, b, i) => Math.abs(a[i] - b[i]);
const second = (a, b, i) => a[i] * b.filter(v => v === a[i]).length;
const getSolution = (obj, config) => _.sum(_.range(0, obj.len).map(i => config.alg(obj.a, obj.b, i)));

Solver.solve(parseInput, getSolution, [{ alg: first }, { alg: second }]);

// Part 1 solution:
// Part 2 solution:
