
exports.gcd = (a, b) => !b ? a : gcd(b, a % b);

exports.lcm = (a, b) => (a * b) / gcd(a, b);
