const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => {
  const reg = /Valve (?<name>[A-Z]+) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<paths>.*)/;
  const map = input.map(i => {
    const valve = i.match(reg).groups;
    valve.rate = parseInt(valve.rate);
    return valve;
  });
  map.forEach(valve => {
    valve.paths = valve.paths.split(',').map(p => _.find(map, i => i.name === p.trim()));
  });

  return map;
};

const getSolution = (input, config) => {
  return 0;
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution:
// Part 2 solution:
