// returns an array of all integers from 1 to n
exports.getRange = n => [...Array(n).keys()].map(v => parseInt(v));

// returns the cross product of two arrays
exports.getCrossProduct = (a, b) => a.flatMap(v1 => b.map(v2 => [v1, v2]));
