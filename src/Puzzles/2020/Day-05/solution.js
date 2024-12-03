const parseInput = input => {
  return _.map(input, i => {
    return _.sum([...Array(10).keys()].map(j => i[j] === 'B' || i[j] === 'R' ? Math.pow(2, 9-j) : 0));
  });
}

const getSolution = (v, config) => {
  if (config.part === 1) {
    return _.max(v);
  }

  let min = _.min(v);
  return _.find([...Array(_.max(v) - min).keys()], i => !_.includes(v, i + min)) + min;
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 888
// Part 2 solution: 522
