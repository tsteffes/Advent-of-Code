exports.getRange = count => [...Array(count).keys()].map(v => parseInt(v));
exports.getCrossProduct = (a, b) => a.flatMap(v1 => b.map(v2 => [v1, v2]));
