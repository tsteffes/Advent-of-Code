require('../../../Helpers/global');

const breaksRule = (update, rule) => update.includes(rule[0]) && update.includes(rule[1]) && update.indexOf(rule[1]) < update.indexOf(rule[0]);
const middlePageSum = updates => _.sum(updates.map(v => v[Math.floor(v.length / 2)]));
const partitionPuz = (updates, rules) => _.partition(updates, u => !rules.some(r => breaksRule(u, r)));
const fixBad = (bad, rules) => bad.map(b => {
  while(true) {
    let rule = rules.find(r => breaksRule(b, r));
    if (!rule) {
      break;
    }

    let i1 = b.indexOf(rule[1]);
    b.splice(i1, 1);
    let i0 = b.indexOf(rule[0]);
    b.splice(i0 + 1, 0, rule[1]);
  }

  return b;
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

// Part 1 solution:
// Part 2 solution:
