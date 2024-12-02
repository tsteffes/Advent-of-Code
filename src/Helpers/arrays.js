// returns the cross product of two arrays
exports.crossProduct = (a, b) => a.flatMap(v1 => b.map(v2 => [v1, v2]));

// returns a new array with the item at the index removed
exports.removeAt = (arr, i) => _.concat(arr.slice(0, i), arr.slice(i + 1));

// counts the array elements that meet the predicate
exports.count = (arr, pred) => _.filter(arr, pred).length;