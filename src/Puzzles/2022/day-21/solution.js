const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => {
  return input.map(i => {
    let reg = /(?<name>[a-z]+): (?<sub1>[a-z]+) (?<op>[\+\-\*\/]) (?<sub2>[a-z]+)/;
    if (i.match(reg)) {
      return i.match(reg).groups;
    }

    let res = i.match(/(?<name>[a-z]+): (?<val>\d+)/).groups;
    res.val = parseInt(res.val);
    res.static = true;
    return res;
  });
};

const buildNode = (monkeys, name, parent) => {
  let monkey = monkeys.find(m => m.name === name);
  monkey.parent = parent;
  if (monkey.val) {
    return monkey;
  }

  monkey.sub1 = buildNode(monkeys, monkey.sub1, monkey);
  monkey.sub2 = buildNode(monkeys, monkey.sub2, monkey);
  return monkey;
};

const calculateMonkey = monkey => {
  if (monkey.static) {
    return monkey.val;
  }

  if ((monkey.sub1.static || monkey.sub1.solved) &&
    (monkey.sub2.static || monkey.sub2.solved)) {
    monkey.solved = true;
    return monkey.op === '+' ? monkey.sub1.val + monkey.sub2.val :
      monkey.op === '-' ? monkey.sub1.val - monkey.sub2.val :
      monkey.op === '*' ? monkey.sub1.val * monkey.sub2.val :
      monkey.op === '/' ? monkey.sub1.val / monkey.sub2.val :
      monkey.sub1.val === monkey.sub2.val;
  }
};

const setGuess = (search, config) => {
  let guesses = search.guesses;
  let guess;
  if (guesses.length === 1) {
    guess = 1000000;
  }
  else if (guesses.length === 2) {
    search.slope = (guesses[1].result - guesses[0].result) / (guesses[1].guess - guesses[0].guess);
    guess = Math.floor((config.goalVal - guesses[0].result) / search.slope) * 2;
    search.max = guess;
  }
  else {
    let lastGuess = guesses[guesses.length - 1];
    if (search.slope > 1 && lastGuess.result > config.goalVal) {
      guess = Math.floor((search.min + lastGuess.guess) / 2);
      search.max = lastGuess.guess;
    }
    else if (search.slope > 1) {
      guess = Math.floor((search.max + lastGuess.guess) / 2);
      search.min = lastGuess.guess;
    }
    else if (search.slope < 1 && lastGuess.result < config.goalVal) {
      guess = Math.floor((search.min + lastGuess.guess) / 2);
      search.max = lastGuess.guess;
    }
    else {
      guess = Math.floor((search.max + lastGuess.guess) / 2);
      search.min = lastGuess.guess;
    }
  }

  guesses.push({ guess })
};

const getSolution = (monkeys, config) => {
  let stack = [];
  buildNode(monkeys, 'root', null);
  monkeys.filter(m => !isNaN(m.val)).forEach(m => stack.push(m));
  if (config.rootOp) {
    let root = monkeys.find(m => m.name === 'root');
    root.op = config.rootOp;
  }

  let search = { guesses: [{ guess: 0 }], min: 0 };
  while (true) {
    let result;
    if (config.part === 2) {
      let humn = monkeys.find(m => m.name === 'humn');
      humn.val = search.guesses[search.guesses.length - 1].guess;

      if (search.guesses.length > 1) {
        stack = [humn];
      }
    }

    do {
      let monkey = stack.shift();
      let val = calculateMonkey(monkey);
      if (!isNaN(val)) {
        monkey.val = val;
        if (monkey.name === 'root') {
          result = val;
          break;
        }

        stack.push(monkey.parent);
      }
    } while(stack.length > 0);

    if (config.part === 1) {
      return result;
    }
    else {
      search.guesses[search.guesses.length - 1].result = result;
      if (result === config.goalVal) {
        return search.guesses[search.guesses.length - 1].guess;
      }

      setGuess(search, config);
    }
  }
};

const config = [{}, { rootOp: '-', goalVal: 0 }];
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution: 291425799367130
// Part 2 solution: 3219579395609
