const getSize = dir => _.sum(dir.dirs.map(getSize)) + _.sum(dir.files.map(f => f.size));
const getSolution = (input, config) => {
  const sys = { name: '/', dirs: [], files: [], parent: null };
  const directories = [sys];
  let pwd;
  for (let i = 0; i < input.length && input[i].startsWith('$'); i++) {
    let instr = input[i];
    if (instr.startsWith('$ cd')) {
      pwd = instr.includes('/') ? sys : instr.includes('..') ? pwd.parent : _.find(pwd.dirs, d => d.name === instr.substring(5));
      continue;
    }

    while (i + 1 < input.length && !input[i + 1].startsWith('$')) {
      instr = input[++i];
      const dir = instr.match(/dir\s(?<name>.*)/);
      if (dir) {
        const d = { name: dir.groups.name, dirs: [], files: [], parent: pwd };
        directories.push(d);
        pwd.dirs.push(d);
      }

      const file = instr.match(/(?<size>[\d]+)\s(?<name>.*)/);
      if (file) {
        pwd.files.push({ name: file.groups.name, size: parseInt(file.groups.size) });
      }
    }
  }

  return config.formula(directories.map(getSize), getSize(sys));
};

const config = [
  { formula: sizes => _.sum(sizes.filter(s => s < 100000)) },
  { formula: (sizes, sysSize) => _.sortBy(sizes.filter(s => s > sysSize - 40000000))[0] }
];
Solver.solve(i => i, getSolution, config);

// Part 1 solution: 1084134
// Part 2 solution: 6183184
