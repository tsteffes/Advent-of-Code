require('../../../Helpers/global');

const parser = input => {
  let diskMap = input[0].split('').map(i => parseInt(i));
  let disk = [];
  let addr = 0;
  for (let i = 0; i < diskMap.length; i++) {
    let addrs = [];
    let file = i % 2 === 0 ? { id: i / 2, addrs: addrs } : null;
    for (let j = 0; j < diskMap[i]; j++) {
      disk.push(file);
      addrs.push(addr++);
    }
  }

  return disk;
};
const solver = (disk, config) => {
  if (config.part === 1) {
    for (let i = 0; i < disk.length; i++) {
      if (!disk[i]) {
        let lastIndex = _.findLastIndex(disk, d => d);
        if (lastIndex > i) {
          let file = disk[lastIndex];
          let index = file.addrs.pop();
          disk[index] = null;
          disk[i] = file;
          file.addrs.push(i);
          file.addrs = _.sortBy(file.addrs);
        }
      }
    }
  }
  else {
    const opening = (disk, size, idx) =>  _.findIndex(disk, (d, i) => !d && i < idx && (_.findIndex(disk, d => d, i) - i) >= size);
    let files = _.reverse(_.sortBy(_.uniqWith(disk.filter(f => f), (a, b) => a.id === b.id), f => f.id));
    files.forEach(file => {
      let i = opening(disk, file.addrs.length, file.addrs[0]);
      if (i >= 0) {
        for (let x = i; x < i + file.addrs.length; x++) {
          let index = file.addrs.pop();
          disk[index] = null;
          disk[x] = file;
          file.addrs.push(x);
          file.addrs = _.sortBy(file.addrs);
        }
      }
    });
  }

  return _.sum(disk.map((d, i) => (d?.id ?? 0) * i));
};
new Puzzle(2024, 9)
  .withParser(parser)
  .withSolver(solver)
  .solve();

// Part 1 solution: 6463499258318
// Part 2 solution: 6493634986625
