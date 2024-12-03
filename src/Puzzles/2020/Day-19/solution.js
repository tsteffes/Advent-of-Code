const parseInput = input => input;

let parseRules = i => {
  return i.split('\r\n').map(r => {
    let getAnd = (idx, p) => { return { idx: idx, op: 'and', parts: parseInts(p) } };
    let parseInts = p => p.split(' ').map(i => parseInt(i));
    let m = r.match(/^(?<idx>\d+): (?<p1>[\d\s]+) \| (?<p2>[\d\s]+)$/);
    if (m) {
      return { idx: parseInt(m.groups.idx), op: 'or', parts: [ getAnd(null, m.groups.p1), getAnd(null, m.groups.p2) ] };
    }

    m = r.match(/^(?<idx>\d+): (?<p1>[\d\s]+)$/);
    if (m) {
      return getAnd(parseInt(m.groups.idx), m.groups.p1);
    }

    m = r.match(/(?<idx>\d+): "(?<c>[a-z])"/);
    return { idx: parseInt(m.groups.idx), op: 'char', char: m.groups.c };
  });
};

let parseMessages = i => {
  return i.split('\r\n').map(r => {
    return r;
  });
};

let checkRule = (state) => {
  let rules = state.rules.filter(r => r.idx === state.rule)[0];
  if (rule.op === 'char') {
    return message[index] === rule.char;
  }
  else if (rule.op === 'and') {
    for (let i = 0; i < rule.parts.length; i++) {
      checkRule(res.message, getRule(rules, rule.parts[i]), rules);
      if (res.res === false) {
        return { res: false };
      }
    }
  }
  else {
    // let res1 = checkRule(message, rule.parts[0]);
    // if (res1.res)
    // let res2 = checkRule(message, rule.parts[1]);
  }
};

const getSolution = (input, config) => {
  let rules = parseRules(input[0]);
  console.log(rules);
  let messages = parseMessages(input[1]);
  return messages.filter(m => checkRule({ message: m, idx: 0, rule: 0, rules: rules })).length;
};

Solver.solve(parseInput, getSolution, [], i => io.readLines(i, '\r\n\r\n'));

// Part 1 solution:
// Part 2 solution:
