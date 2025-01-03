require('../../../Helpers/global');
const parseInput = input => _.map(input[0].split(','), i => parseInt(i));

const getSolution = (input, config) => {
  let indexes = new HashMap(32768);
  input.slice(0, input.length - 1).forEach(i => indexes.set(i, input.lastIndexOf(i)));
  let num = input[input.length - 1];
  for (let i = input.length - 1; i < config.target - 1; i++) {
    let prev = indexes.get(num);
    indexes.set(num, i);
    num = prev >= 0 ? i - prev : 0;
  }

  return num;
};

Solver.solve(parseInput, getSolution, [{ target: 2020 }, { target: 30000000 }]);

// Part 1 solution: 249
// Part 2 solution: 41687
