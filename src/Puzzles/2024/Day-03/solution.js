require('../../../Helpers/global');

const reg = /(?<mul>mul\((?<p1>\d+),(?<p2>\d+)\))|(?<on>do\(\))|(?<off>don\'t\(\))/g;
const getValues = i => [...i.join('').matchAll(reg)].map(v => v.groups);
const getSolution = (instr, config) => {
  return instr.reduce((obj, v) => {
    obj.sum += obj.on && v.mul ? parseInt(v.p1) * parseInt(v.p2) : 0;
    obj.on = config.toggle ? v.on || (obj.on && !v.off) : true;
    return obj;
  }, { sum: 0, on: true }).sum;
};

Solver.solve(io.readLines, getValues, getSolution, [{ toggle: false }, { toggle: true }]);

// Part 1 solution: 188192787
// Part 2 solution: 113965544
