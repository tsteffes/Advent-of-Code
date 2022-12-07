const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');
const maxSize = 70000000;
const freeSpace = 30000000;

let getSize = dir => {
  return _.sum(dir.dirs.map(getSize)) + _.sum(dir.files.map(f => f.size));
}

let getSolution = (input, config) => {
  const sys = { name: '/', dirs: [], files: [], parent: null };
  const dirs = [sys];
  let cd;
  for (let i = 0; i < input.length && input[i].startsWith('$'); i++) {
    let instr = input[i];
    if (instr.startsWith('$ cd')) {
      cd = instr.includes('/') ? sys : instr.includes('..') ? cd.parent : _.find(cd.dirs, d => d.name === instr.substring(5));
      continue;
    }

    // cheating and assuming current instruction is `ls`
    do {
      instr = input[++i];
      let dir = instr.match(/dir\s(?<dir>.*)/);
      if (dir) {
        let d = { name: dir.groups.dir, dirs: [], files: [], parent: cd };
        dirs.push(d); // hax
        cd.dirs.push(d);
      }

      let file = instr.match(/(?<size>[\d]+)\s(?<name>.*)/);
      if (file) {
        let f = file.groups;
        f.size = parseInt(f.size);
        cd.files.push(f);
      }
    } while (i + 1 < input.length && !instr.startsWith('$'));
    i--;
  }

  let sizes = dirs.map(getSize);
  if (config.part === 1) {
    return _.sum(sizes.filter(s => s < 100000));
  }

  return _.sortBy(sizes.filter(s => s > freeSpace - (maxSize - getSize(sys))))[0];
};

Solver.solve(io.readLines, i => i, getSolution);

// Part 1 solution: 1084134
// Part 2 solution: 6183184
