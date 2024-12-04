const parseInput = input => input.map(i => i.split('\r\n').map(v => parseInt(v)));
const getSolution = (values, config) => _.sum(_.take(_.reverse(_.sortBy(values.map(v => _.sum(v)))), config.top));
Solver.solve(parseInput, getSolution, [{ top: 1 }, { top: 3 }], '\r\n\r\n');

// Part 1 solution: 69501
// Part 2 solution: 202346
