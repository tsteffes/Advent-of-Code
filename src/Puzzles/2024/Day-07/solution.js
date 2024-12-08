require('../../../Helpers/global');

const reg = /(?<ans>\d+):\s(?<ops>(\d+\s?)+)/g;
const ops = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => parseInt(b.toString() + a.toString())
];
const configs = [{ ops: 2 }, { ops: 3 }];
const parse = input => input.map(v => [...v.matchAll(reg)].map(g => {
  return {
    // reverse terms so that the eval occurs left-to-right
    terms: _.reverse(g.groups.ops.split(' ').map(v => parseInt(v))),
    ans: parseInt(g.groups.ans)
  };
})[0]);
const solve = (values, config) => {
  const solvable = v => doMath(config.ops, v.terms, v.ans).includes(v.ans);
  return _.sum(values.filter(solvable).map(v => v.ans));
};
const doMath = (numOps, terms, ans) => {
  const secondOperands = terms.length === 2 ? [terms[1]] : doMath(numOps, terms.slice(1), ans).filter(v => v <= ans);
  return secondOperands.reduce((prev, operand) => {
    prev.push(...ops.slice(0, numOps).map(op => op(terms[0], operand)));
    return prev;
  }, []);
};
new Puzzle(2024, 7)
  .withParser(parse)
  .withSolver(solve)
  .solve(configs);

// Part 1: 538191549061
// Part 2: 34612812972206
