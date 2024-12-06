const setSize = 25;

const parseInput = input => {
  return input.map(v => parseInt(v));
};

let findSum = (set, total) => {
  return _.find(set.flatMap(v1 => set.map(v2 => v1 + v2)), v => v === total);
};

let findContiguousSumSubset = (set, total) => {
  let range = _.range(set.length);
  let sets = _.filter(range.crossProduct(), v => v[0] !== v[1]);
  return (s => set.slice(s[0], s[1]))(sets.find(s => _.sum(set.slice(s[0], s[1])) === total));
};

let findNonCompliant = (values) => {
  return _.find(values, (val, idx) => idx >= setSize && !findSum(values.slice(idx - setSize, idx), val));
};

const getSolution = (values, config) => {
  let pt1 = findNonCompliant(values);
  if (config.part === 1) {
    return pt1;
  }

  return (res => _.min(res) + _.max(res))(findContiguousSumSubset(values, pt1));
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 25918798
// Part 2 solution: 3340942
