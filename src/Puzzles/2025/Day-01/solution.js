require('../../../Helpers/global');

const parser = i => {
  return i.map(c => { return { dir: c[0] === 'L' ? -1 : 1, mag: parseInt(c.substring(1), 10) }; });
};
const solver = (o, config) => {
  let pos = 50;
  let count = 0;

  for (let cmd of o) {
    if (config.part === 1) {
      pos = math.mod(pos + (cmd.mag * cmd.dir), 100);
      count += pos === 0 ? 1 : 0;
    }
    else {
      let revs = Math.floor(cmd.mag / 100);
      let rem = cmd.mag % 100;
      let newPos = pos + (rem * cmd.dir);
      count += revs + (newPos === 0 || (pos !== 0 && (newPos < 1 || newPos > 99)) ? 1 : 0);
      pos = math.mod(newPos, 100);
    }
  }

  return count;
};
new Puzzle(2025, 1)
  .withParser(parser)
  .withSolver(solver)
  .solve();

// Part 1 solution: 1036
// Part 2 solution: 6228
