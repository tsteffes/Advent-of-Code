const parseInput = input => {
  return _.map(input, i => {
    return {
      num: i.split('\r\n').length,
      answers: i.replace(/\r\n/g, '')
    }
  });
}

const getSolution = (values, config) => {
  if (config.part === 1) {
    return _.sum(_.map(values, v => _.uniq(v.answers).length));
  }

  return _.sum(_.map(values, v => {
    return _.sum(_.map(_.uniq(v.answers), a => {
      return v.answers.filter(b => b === a).length === v.num ? 1 : 0;
    }));
  }));
};

Solver.solve(parseInput, getSolution, [], '\r\n\r\n');

// Part 1 solution: 6911
// Part 2 solution: 3473
