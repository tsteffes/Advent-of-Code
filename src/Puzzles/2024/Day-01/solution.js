require('../../../Helpers/global');

new Puzzle(2024, 1)
  .withParser(i => {
    let res = i.reduce((prev, curr) => {
      prev[0].push(parseInt(curr.split('   ')[0]));
      prev[1].push(parseInt(curr.split('   ')[1]));
      return prev;
    }, [[], []]);
    return { len: res[0].length, a: _.sortBy(res[0]), b: _.sortBy(res[1]) };
  })
  .withSolver((obj, config) => _.sum(_.range(0, obj.len).map(i => config.alg(obj.a, obj.b, i))))
  .solve([
    { alg: (a, b, i) => Math.abs(a[i] - b[i]) },
    { alg: (a, b, i) => a[i] * b.filter(v => v === a[i]).length }
  ]);

// Part 1 solution: 1879048
// Part 2 solution: 21024792
