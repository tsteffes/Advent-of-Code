
exports.gcd = (a, b) => !b ? a : math.gcd(b, a % b);

exports.lcm = (a, b) => (a * b) / math.gcd(a, b);

exports.mod = (num, mod) => {
  let res = num % mod;
  if (res < 0) {
    res += mod;
  }

  return res;
};
