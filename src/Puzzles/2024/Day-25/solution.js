require('../../../Helpers/global');

const configs = [{}, {}];
new Puzzle(2024, 25)
  .withParser(i => i)
  .withSolver((values, config) => {
    return 0;
  })
  .solve(configs);

// Part 1 solution:
// Part 2 solution:
