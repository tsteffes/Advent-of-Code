const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const monkeyReg = /Starting\sitems:\s(?<items>([\d,\s]+))\r\n\s*Operation:\snew\s=\s(?<op1>\S*)\s(?<op>[\+\*])\s(?<op2>\S*)\r\n\s*Test:\sdivisible\sby\s(?<mod>[\d]+)\s*If\strue:\sthrow\sto\smonkey\s(?<t>[\d]+)\s*If\sfalse:\sthrow\sto\smonkey\s(?<f>[\d]+)/;
const getValues = input => {
  return input.map(i => {
    const monkey = i.match(monkeyReg).groups;
    monkey.items = monkey.items.split(', ').map(i => { return { worry: parseInt(i) }; });
    monkey.inspected = 0;
    return monkey;
  });
};

const getSolution = (monkeys, config) => {
  const commonMod = monkeys.map(m => m.mod).reduce((a,b) => a * b);
  _.times(config.rounds, () => {
    monkeys.forEach(monkey => {
      while(monkey.items.length > 0) {
        monkey.inspected++;
        const item = monkey.items.shift();
        const op1 = monkey.op1 === 'old' ? item.worry : parseInt(monkey.op1);
        const op2 = monkey.op2 === 'old' ? item.worry : parseInt(monkey.op2);
        item.worry = Math.floor((monkey.op === '*' ? op1 * op2 : op1 + op2) / config.div) % commonMod;
        monkeys[item.worry % monkey.mod === 0 ? monkey.t : monkey.f].items.push(item);
      }
    });
  });

  return _.take(_.reverse(_.sortBy(monkeys.map(m => m.inspected))), 2).reduce((a, b) => a * b);
};

Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [ { rounds: 20, div: 3 }, { rounds: 10000, div: 1 } ]);

// Part 1 solution: 99840
// Part 2 solution: 20683044837
