require('../../../Helpers/global');

const configs = [{}, {}];
const parser = i => {
  return i;
};
const solver = (values, config) => {
  return 0;
};
new Puzzle(2024, 11)
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution:
// Part 2 solution:
