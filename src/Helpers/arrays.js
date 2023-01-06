// returns the cross product of two arrays
exports.getCrossProduct = (a, b) => a.flatMap(v1 => b.map(v2 => [v1, v2]));
