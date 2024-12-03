const map = {
  ')': '(',
  '}': '{',
  ']': '[',
  '>': '<'
}

const parseInput = input => {
  return input.map(y => y.split(''));
};

let getIllegalChar = line => {
  let stack = [];
  for (let char of line) {
    if (['(', '[', '{', '<'].includes(char)) {
      stack.push(char);
    }
    else if (map[char] !== stack[stack.length - 1]) {
      return char;
    }
    else {
      stack.pop();
    }
  }

  return '';
};

let getScore = line => {
  const scores = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
  };
  let stack = [];
  for (let char of line) {
    if (['(', '[', '{', '<'].includes(char)) {
      stack.push(char);
    }
    else {
      stack.pop();
    }
  }

  let res = 0;
  while (stack.length > 0) {
    res *= 5;
    res += scores[stack.pop()];
  }

  return res;
};

const getSolution = (values, config) => {
  if (config.part === 1) {
    const scores = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
      '': 0
    };
    return values.map(v => getIllegalChar(v)).reduce((cur, x) => cur + scores[x], 0);
  }

  let valid = values.filter(v => getIllegalChar(v) === '');
  return valid.map(v => getScore(v)).sort((a, b) => a - b)[Math.floor(valid.length / 2)];
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 318099
// Part 2 solution: 2389738699
