require('../../../Helpers/global');

const configs = [{}, {}];
const puzzle = new Puzzle(2024, 5);
puzzle.parseInput = i => i;
puzzle.getSolution = (values, config) => {
  return 0;
};

puzzle.solve(configs);

// Part 1 solution:
// Part 2 solution:
