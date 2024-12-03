const pows = ['=', '-', '0', '1', '2'];
const parseInput = input => input;
const fromSnafu = val => _.reverse(val.split('')).map((v, t) => Math.pow(5, t) * (pows.indexOf(v) - 2));
const toSnafu = val => {
  let base5 = val.toString(5).split('').map(v => parseInt(v));
  for (let i = base5.length - 1; i >= 0; i--) {
    if (base5[i] > 2) {
      base5[i] -= 5;
      base5[i-1]++;
    }
  }

  return base5.map(v => pows[v + 2]).join('');
};
const getSolution = (input, config) => {
  return toSnafu(_.sum(input.map(i => _.sum(fromSnafu(i)))));
};

Solver.solve(parseInput, getSolution);

// Part 1 solution:
// Part 2 solution:
