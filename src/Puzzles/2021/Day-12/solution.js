const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  let res = {};
  input.map(y => y.split('-')).forEach(v => {
    res[v[0]] = res[v[0]] || [];
    res[v[0]].push(v[1]);
    res[v[1]] = res[v[1]] || [];
    res[v[1]].push(v[0]);
  });

  return res;
};

let isCap = v => (/^[A-Z]+$/).test(v);

let checkDuplicate = (paths, cur) => {
  for (let path of paths) {
    if (path.length !== cur.length) {
      continue;
    }

    let diff = false;
    for (let i = 0; i < path.length; i++) {
      if (path[i] !== cur[i]) {
        diff = true;
        break;
      }
    }

    if (diff) {
      continue;
    }

    return true;
  }

  return false;
};

let canVisit = (path, val, config) => {
  if (isCap(val)) {
    return true;
  }

  if (config.part === 1 || ['start', 'end'].includes(val)) {
    return !path.includes(val);
  }

  let lower = path.filter(p => !isCap(p));
  return !_.values(_.countBy(lower)).find(x => x > 1);
};

let getSolution = (values, config) => {
  let paths = [];
  paths.push(['start']);
  for (let path of paths) {
    let cur = path[path.length - 1];
    if (cur === 'end') {
      continue;
    }

    for (let neighbor of values[cur]) {
      if (!canVisit(path, neighbor, config)) {
        continue;
      }

      let newer = _.cloneDeep(path);
      newer.push(neighbor);
      if (!checkDuplicate(paths, newer)) {
        paths.push(newer);
      }
    }
  }

  let res = paths.filter(p => p[p.length - 1] === 'end');
  return res.length;
};

new Solver(2021, 12, io.readLines, getValues, getSolution, [{ part: 1 }, { part: 2 }]).solve();

// Part 1 solution: 3679
// Part 2 solution:
