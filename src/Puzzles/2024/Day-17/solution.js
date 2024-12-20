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
    i: 0,
    out: []
  };
};
let outputMap;
const combo = (p, o) => {
  let regsMap = [p.A, p.B, p.C];
  return BigInt(o >= 0 && o <= 3 ? o : regsMap[o - 4]);
};
const ops = [
  /* 0 adv */ (p, o) => p.A = BigInt(p.A) >> BigInt(combo(p, o)),
  /* 1 bxl */ (p, o) => p.B = Number(BigInt(p.B) ^ BigInt(o)),
  /* 2 bst */ (p, o) => p.B = ((combo(p, o) % BigInt(8)) + BigInt(8)) % BigInt(8),
  /* 3 jnz */ (p, o) => p.A > BigInt(0) ? p.i = o : null,
  /* 4 bxc */ (p)    => p.B = Number(BigInt(p.B) ^ BigInt(p.C)),
  /* 5 out */ (p, o) => p.out.push(((combo(p, o) % BigInt(8)) + BigInt(8)) % BigInt(8)),
  /* 6 bdv */ (p, o) => p.B = BigInt(p.A) >> BigInt(combo(p, o)),
  /* 7 cdv */ (p, o) => p.C = BigInt(p.A) >> BigInt(combo(p, o))
];
const simulate = program => {
  while(program.i < program.ops.length) {
    const i = program.i;
    ops[program.ops[program.i]](program, program.ops[program.i + 1]);
    program.i = (i === program.i) ? program.i + 2 : program.i;
  }
};
const getOutput = v => {
  // What the program is doing:
  //   - Set B = final 3 bits of A, with second bit flipped
  //   - Set C = A / (2 ^ B) (set C to the bits B through B+2 of A)
  //   - Set B = B xor C
  //   - Flip bits of B
  //   - Output B
  //   - Shift A to the right by 3 bits
  //   - loop until A = 0
  // Reduced:
  //   - B = A[2] !A[1] A[0]
  //   - C = A[B+2] A[B+1] A[B+0]
  //   - Output !(B[2] xor C[2]) !(B[1] xor C[1]) !(B[0] xor C[0])
  //   - Loop
  let A = v.toString(2).padStart(10, '0').split('');
  let B = parseInt(A[A.length - 3] + (A[A.length - 2] ^ 1) + A[A.length - 1], 2);
  let C = parseInt(A[A.length - B - 3] + A[A.length - B - 2] + A[A.length - B - 1], 2);
  return B ^ C ^ 7;
};
const conflictingBits = (reg, c, depth) => {
  const bits = c.toString(2).padStart(10, '0');
  for (let i = 1; i <= 10 ; i++) {
    if (reg[reg.length - (i + (3 * depth))] !== null && reg[reg.length - (i + (3 * depth))] !== bits[bits.length - i]) {
      return true;
    }
  }

  return false;
};
const setBits = (reg, c, depth) => {
  const bits = c.toString(2).padStart(10, '0');
  for (let i = 1; i <= 10; i++) {
    reg[reg.length - (i + (3 * depth))] = bits[bits.length - i];
  }
};
const findAnswers = (ops, reg, depth) => {
  const answers = [];
  const consider = outputMap[ops[0]];
  for(let c of consider) {
    if (!conflictingBits(reg, c, depth)) {
      const newReg = _.cloneDeep(reg);
      setBits(newReg, c, depth);
      let newOps = _.cloneDeep(ops);
      newOps.shift();
      if (newOps.length > 0) {
        const curAnswers = findAnswers(newOps, newReg, depth + 1);
        answers.push(...curAnswers);
      }
      else {
        answers.push(newReg);
      }
    }
  }

  return answers;
};
const solver = (program, config) => {
  if (config.part === 1) {
    simulate(program);
    return program.out.join(',');
  }

  const register = Array(program.ops.length * 3 + 7).fill(null);
  outputMap = {};
  for (let i = 0; i < (2 ** 10); i++) {
    const val = getOutput(i);
    outputMap[val] = outputMap[val] || [];
    outputMap[val].push(i);
  }

  const answers = findAnswers(program.ops, register, 0)
    .map(a => BigInt(`0b${a.join('').padStart(54, '0')}`));
  return _.sortBy(answers).find(a => {
    program.A = a;
    program.i = 0;
    program.out = [];
    simulate(program);
    if (program.out.equals(program.ops.map(v => BigInt(v)))) {
      return true;
    }
  });
};
new Puzzle(2024, 17)
  .withSeparator(null)
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution: 2,3,4,7,5,7,3,0,7
// Part 2 solution: 190384609508367
