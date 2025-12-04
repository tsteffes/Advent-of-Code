require('../../../Helpers/global');

const parser = i => {
  const regex = /^(?<min>\d+)\-(?<max>\d+)$/;
  return i[0].split(',').map(v => v.match(regex).groups).map(v => { return { min: parseInt(v.min, 10), max: parseInt(v.max, 10) }; });
};
const length = n => n.toString().length;
const solver = (o, config) => {
  const ids = [];
  for (let r of o) {
    const minLength = Math.max(1, config.part === 1 ? Math.floor(length(r.min) / 2) : 1);
    const maxLength = Math.floor(length(r.max) / 2);
    for (let len = minLength; len <= maxLength; len++) {
      const maxReps = config.part === 1 ? 2 : Math.floor(length(r.max) / len);
      for (let reps = 2; reps <= maxReps; reps++) {
        const minVal = parseInt('1' + '0'.repeat(len - 1));
        const maxVal = parseInt('9'.repeat(len));
        for (let val = minVal; val <= maxVal; val++) {
          const num = parseInt(val.toString(10).repeat(reps));
          if (num >= r.min && num <= r.max) {
            ids.push(num);
          }
        }
      }
    }
  }

  return _.sum(_.uniq(ids));
};
new Puzzle(2025, 2)
  .withParser(parser)
  .withSolver(solver)
  .solve();

// Part 1 solution: 31210613313
// Part 2 solution: 41823587546
