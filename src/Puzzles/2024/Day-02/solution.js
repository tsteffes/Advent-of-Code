require('../../../Helpers/global');

const getValues = i => i.map(v => v.split(' ').map(x => parseInt(x)));
const isSafe = arr => _.every(_.range(1, arr.length), idx => _.inRange(arr[idx] - arr[idx - 1], 1, 4));
const isEitherSafe = arr => isSafe(arr) || isSafe(_.reverse(arr));
const partTwo = arr => _.range(0, arr.length).some(idx => isEitherSafe(arrays.removeAt(arr, idx)));
const getSolution = (values, config) => arrays.count(values, config.pred);

Solver.solve(io.readLines, getValues, getSolution, [{ pred: isEitherSafe }, { pred: partTwo }]);

// Part 1 solution: 564
// Part 2 solution: 604
