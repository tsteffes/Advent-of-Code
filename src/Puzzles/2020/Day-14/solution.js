const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  return _.map(input, i => {
    let mask = i.match(/mask = (?<mask>[X01]+)/);
    if (mask) {
      return { op: 'mask', mask: mask.groups.mask };
    }

    let mem = i.match(/mem\[(?<addr>\d+)\] = (?<val>\d+)/);
    return { op: 'mem', addr: mem.groups.addr, val: mem.groups.val };
  });
};

let getMaskedValue = (val, mask) => {
  let b = (val >>> 0).toString(2).padStart(mask.length, '0');
  return parseInt(b.split('').map((v, i) => mask[i] === 'X' ? v : mask[i]).join(''), 2);
};

let getMemoryAddresses = (val, mask) => {
  let b = (val >>> 0).toString(2).padStart(mask.length, '0');
  b = b.split('').map((v, i) => mask[i] === 'X' ? 'X' : mask[i] == '1' ? '1' : v).join('');
  let allVals = [b];
  while (allVals[0].indexOf('X') > -1) {
    let cur = allVals.shift();
    allVals.push(cur.replace('X', '0'));
    allVals.push(cur.replace('X', '1'));
  }

  return allVals.map(v => parseInt(v, 2));
}

let runProgram = (input, memory, version) => {
  let mask;
  let cmds = {
    mask: op => mask = op.mask,
    mem: op => version === 1 ?
      memory[op.addr] = getMaskedValue(op.val, mask) :
      getMemoryAddresses(op.addr, mask).forEach(v => memory[v] = parseInt(op.val))
  };
  input.forEach(i => cmds[i.op](i));
};

let getSolution = (input, config) => {
  let memory = {};
  runProgram(input, memory, config.part);
  return _.sum(_.map(Object.entries(memory), v => v[1]));
};

new Solver(io.readLines, getValues, getSolution).solve();

// Part 1 solution: 11884151942312
// Part 2 solution: 2625449018811
