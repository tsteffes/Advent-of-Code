require('../../../Helpers/global');

const reg = /(?<ans>\d+):\s(?<ops>(\d+\s?)+)/g;
const ops = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => parseInt(b.toString() + a.toString())
];
const getAnswers = (numOps, firstTerm, rest) => {
  let res = [];
  let poss = rest.length === 1 ? rest : getAnswers(numOps, rest[0], rest.slice(1));
  poss.forEach(p => {
    res.push(...ops.slice(0, numOps).map(op => op(firstTerm, p)));
  });
  return res;
};
new Puzzle(2024, 7)
  .withParser(i => {
    let res = i.map(v => [...v.matchAll(reg)].map(g => {
      return {
        ans: parseInt(g.groups.ans),
        // reverse terms so that the eval occurs left-to-right
        terms: _.reverse(g.groups.ops.split(' ').map(v => parseInt(v)))
      };
    })[0]);
    return res;
  })
  .withSolver((values, config) => {
    const solvable = v => getAnswers(config.ops, v.terms[0], v.terms.slice(1)).includes(v.ans);
    return _.sum(_.filter(values, solvable).map(v => v.ans));
  })
  .solve([{ ops: 2 }, { ops: 3 }]);

// Part 1: 538191549061
// Part 2: 34612812972206
