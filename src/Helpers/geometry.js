exports.colinear = (a, b, c) => a[0] === b[0] === c[0] || ((c[1] - a[1]) / (c[0] - a[0])) === ((c[1] - b[1]) / (c[0] - b[0]));