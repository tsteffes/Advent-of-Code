require('../../../Helpers/global');

const reg = /A\: X\+(?<ax>\d+), Y\+(?<ay>\d+)|B\: X\+(?<bx>\d+), Y\+(?<by>\d+)|Prize\: X\=(?<px>\d+), Y\=(?<py>\d+)/gm;
const parser = (i, config) => {
  return i.map(v => {
    let match = [...v.matchAll(reg)].map(m => m.groups);
    return {
      ax: parseInt(match[0].ax),
      ay: parseInt(match[0].ay),
      bx: parseInt(match[1].bx),
      by: parseInt(match[1].by),
      px: parseInt(match[2].px) + config.increment,
      py: parseInt(match[2].py) + config.increment
    };
  });
};
const solver = machines => {
  return _.sum(machines.map(m => {
    let a = (m.by * m.px - m.bx * m.py) / (m.ax * m.by - m.ay * m.bx);
    let b = (m.ax * m.py - m.ay * m.px) / (m.ax * m.by - m.ay * m.bx);
    return Number.isInteger(a) && Number.isInteger(b) ? 3 * a + b : 0;
  }));
};
new Puzzle(2024, 13)
  .withSeparator('\r\n\r\n')
  .withParser(parser)
  .withSolver(solver)
  .solve([{ increment: 0 }, { increment: 10000000000000 }]);

// Part 1 solution: 34787
// Part 2 solution: 85644161121698
