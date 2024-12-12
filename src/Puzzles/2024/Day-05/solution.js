require('../../../Helpers/global');

const breaksRule = (update, rule) => update.includes(rule[0]) && update.includes(rule[1]) && update.indexOf(rule[1]) < update.indexOf(rule[0]);
const middlePageSum = updates => _.sum(updates.map(v => v[Math.floor(v.length / 2)]));
const partitionPuz = (updates, rules) => _.partition(updates, u => !rules.some(r => breaksRule(u, r)));
const fixBad = (updates, rules) => updates.map(bad => {
  while(true) {
    const r = rules.find(rule => breaksRule(bad, rule));
    if (!r) {
      break;
    }

    bad.splice(bad.indexOf(r[1]), 1);
    bad.splice(bad.indexOf(r[0]) + 1, 0, r[1]);
  }

  return bad;
});
new Puzzle(2024, 5)
  .withSeparator('\r\n\r\n')
  .withParser(i => {
    return {
      rules: i[0].split('\r\n').map(v => [parseInt(v.split('|')[0]), parseInt(v.split('|')[1])]),
      updates: i[1].split('\r\n').map(v => v.split(',').map(v => parseInt(v)))
    }
  })
  .withSolver((puz, config) => {
    const [good, bad] = partitionPuz(puz.updates, puz.rules);
    return middlePageSum(config.part === 1 ? good : fixBad(bad, puz.rules));
  })
  .solve();

// Part 1 solution: 2573
// Part 2 solution: 1850
