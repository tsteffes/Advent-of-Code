require('../../../Helpers/global');

const regex = /(?<mul>mul\((?<p1>\d+),(?<p2>\d+)\))|(?<on>do\(\))|(?<off>don\'t\(\))/g;
const getValues = i => [...i.join('').matchAll(regex)].map(v => v.groups);
const getSolution = (instr, config) => {
  return instr.reduce((obj, v) => {
    obj.sum += obj.toggle && !!v.mul ? parseInt(v.p1) * parseInt(v.p2) : 0;
    obj.toggle = config.toggle ? !!v.on || (obj.toggle && !v.off) : true;
    return obj;
  }, { sum: 0, toggle: true }).sum;
};

Solver.solve(io.readLines, getValues, getSolution, [{ toggle: false }, { toggle: true }]);

// Part 1 solution: 188192787
// Part 2 solution: 113965544
