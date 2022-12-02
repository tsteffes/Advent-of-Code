const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  return _.map(input, i => {
    let g = i.match(/(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/).groups;
    return { x1: parseInt(g.x1), x2: parseInt(g.x2), y1: parseInt(g.y1), y2: parseInt(g.y2) };
  });
};

let getDistance = (p1, p2) => {
  let res = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  return res;
};

let isBetween = (point, p1, p2) => {
  return Math.abs(getDistance(point, p1) + getDistance(point, p2) - getDistance(p1, p2)) < 0.0000001;
};

let getSolution = (values, config) => {
  if (config.part === 1) {
    values = values.filter(v => v.x1 === v.x2 || v.y1 === v.y2);
  }

  // find the size of the map
  let xMax = _.max(values.flatMap(v => [v.x1, v.x2]));
  let yMax = _.max(values.flatMap(v => [v.y1, v.y2]));
  let tot = 0;

  for (let i = 0; i <= xMax; i++) {
    for (let j = 0; j <= yMax; j++) {
      let num = values.filter(v => isBetween({x: i, y: j}, {x: v.x1, y: v.y1}, {x: v.x2, y: v.y2})).length;
      tot += num > 1 ? 1 : 0;
    }
  }

  return tot;
};

new Solver(2021, 5, io.readLines, getValues, getSolution).solve();

// Part 1 solution: 4728
// Part 2 solution: 17717
