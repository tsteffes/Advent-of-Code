const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => {
  const rows = _.reverse(input[0].split('\r\n'));
  const len = _.ceil(rows[0].length / 4);
  const stacks = [];
  for (let i = 0; i < len; i++) {
    stacks.push([]);
  }

  _.forEach(rows.splice(1), r => {
    for (let i = 0; i < len && (i * 4) <= r.length; i++) {
      const l = r.substring(i * 4, i * 4 + 4).match(/\[(?<letter>[A-Z])\]\s?/);
      if (l) {
        stacks[i].push(l.groups.letter);
      }
    }
  });

  let instructions = _.forEach(input[1].split('\r\n').map(r =>
    r.match(/move (?<count>[\d]+) from (?<from>[\d+]) to (?<to>[\d+])/).groups),
      v => ['count', 'from', 'to'].forEach(x => v[x] = parseInt(v[x], 10)));

  return { stacks, instructions };
};

const getSolution = (input, config) => {
  input.instructions.forEach(i => {
    let s = [];
    for (let j = 0; j < i.count; j++) {
      s.push(input.stacks[i.from - 1].pop());
    }

    input.stacks[i.to - 1] = input.stacks[i.to - 1].concat(config.mutate(s));
  });

  return input.stacks.map(s => s[s.length - 1]).join('');
};

const config = [ { mutate: a => a }, { mutate: a => a.reverse() } ];
Solver.solve(i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, config);

// Part 1 solution: LJSVLTWQM
// Part 2 solution: BRQWDBBJM
