const getSolution = (input, config) => {
  return config.n + _.findIndex(_.range(input.length),
    i => _.uniq(input.substring(i, i + config.n).split('')).length === config.n);
};

Solver.solve(i => i[0], getSolution, [{ n: 4 }, { n: 14 }]);

// Part 1 solution: 1080
// Part 2 solution: 3645
