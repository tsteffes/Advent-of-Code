require('../../../Helpers/global');

const reg = /Register A\: (?<a>\d+)|Register B\: (?<b>\d+)|Register C\: (?<c>\d+)|Program: (?<p>(\d+,?)+)/gm;
const configs = [{}, {}];
const parser = i => {
  let g = [...i.matchAll(reg)].map(m => m.groups);
  return {
    A: parseInt(g[0].a),
    B: parseInt(g[1].b),
    C: parseInt(g[2].c),
    ops: g[3].p.split(',').map(v => parseInt(v)),
    instr: 0,
    out: []
  };
};
const matchLength = (a, b) => {
  for (let i = 0; i < b.length; i++) {
    if (b[i] !== a[i]) {
      return i;
    }
  }

  return b.length;
};
const combo = (p, o) => {
  let regsMap = [p.A, p.B, p.C];
  return o >= 0 && o <= 3 ? o : regsMap[o - 4];
};
const instructions = [
  /* adv */ (p, o) => p.A = Math.floor(p.A / (2 ** combo(p, o))),
  /* bxl */ (p, o) => p.B = Number(BigInt(p.B) ^ BigInt(o)),
  /* bst */ (p, o) => p.B = ((combo(p, o) % 8) + 8) % 8,
  /* jnz */ (p, o) => p.A > 0 ? p.instr = o : null,
  /* bxc */ (p)    => p.B = Number(BigInt(p.B) ^ BigInt(p.C)),
  /* out */ (p, o) => p.out.push(((combo(p, o) % 8) + 8) % 8),
  /* bdv */ (p, o) => p.B = Math.floor(p.A / (2 ** combo(p, o))),
  /* cdv */ (p, o) => p.C = Math.floor(p.A / (2 ** combo(p, o)))
];
const simulate = (program, part) => {
  while(true) {
    let i = program.instr;
    if (i >= program.ops.length) {
      break;
    }

    if (part === 2) {
      if (program.out.length > program.ops.length || matchLength(program.ops, program.out) < program.out.length) {
        break;
      }
    }

    let op = program.ops[i];
    let operand = program.ops[i + 1];
    instructions[op](program, operand);
    if (program.instr === i) {
      program.instr += 2;
    }
  };
};
const solver = (program, config) => {
  if (config.part === 1) {
    simulate(program, config.part);
    return program.out.join(',');
  }

  let a = 0;
  let firstIndexToReachLength = {};
  let lengthCounts = {};

  while (true) {
    program.A = program.B = program.C = 0;
    program.A = a++;
    program.out = [];
    program.instr = 0;
    simulate(program, config.part);
    let length = matchLength(program.ops, program.out);
    lengthCounts[length] = (lengthCounts[length] || 0);
    lengthCounts[length]++;
    if (!firstIndexToReachLength[length]) {
      firstIndexToReachLength[length] = a;
      console.log('First ' + length + ': ' + a);
      console.log(lengthCounts);
      console.log();
    }
    if (length === program.ops) {
      break;
    }
  }

  return a;
};
new Puzzle(2024, 17)
  .withSeparator(null)
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution:
// Part 2 solution:
