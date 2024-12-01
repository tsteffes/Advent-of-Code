const ints = [
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
];
const getValues = i => i;
const getSolution = (values, config) => {
  return _.sum(values.map(v => {
    let firstIdx = v.length, lastIdx = -1;
    let first, last, idx;
    for (let i = 0; i < config.part; i++) {
      for (let j = 0; j < ints[i].length; j++) {
        idx = v.indexOf(ints[i][j]);
        if (idx > -1) {
          first = idx < firstIdx ? j : first;
          firstIdx = idx < firstIdx ? idx : firstIdx;
        }

        idx = v.lastIndexOf(ints[i][j]);
        if (idx > -1){
          last = idx > lastIdx ? j : last;
          lastIdx = idx > lastIdx ? idx : lastIdx;
        }
      }
    }

    return parseInt(first.toString() + last.toString());
  }));
};

Solver.solve(i => io.readLines(i), getValues, getSolution, [{ }, { }]);

// Part 1 solution: 55447
// Part 2 solution: 54706
