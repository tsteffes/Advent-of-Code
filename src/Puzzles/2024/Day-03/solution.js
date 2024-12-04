require('../../../Helpers/global');

const configs = [{ toggle: false }, { toggle: true }];
const reg = /(?<mul>mul\((?<p1>\d+),(?<p2>\d+)\))|(?<on>do\(\))|(?<off>don\'t\(\))/g;
new Puzzle(2024, 3)
  .withParser(i => [...i.join('').matchAll(reg)].map(v => v.groups))
  .withSolver((instructions, config) => {
    return instructions.reduce((obj, instr) => {
      obj.sum += obj.on && instr.mul ? parseInt(instr.p1) * parseInt(instr.p2) : 0;
      obj.on = config.toggle ? instr.on || (obj.on && !instr.off) : true;
      return obj;
    }, { sum: 0, on: true }).sum;
  })
  .solve(configs);

// Part 1 solution: 188192787
// Part 2 solution: 113965544
