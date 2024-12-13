
exports.gcd = (a, b) => !b ? a : math.gcd(b, a % b);

exports.lcm = (a, b) => (a * b) / math.gcd(a, b);
