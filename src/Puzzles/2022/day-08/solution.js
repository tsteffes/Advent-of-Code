const _ = require('lodash');
const io = require('../../../helpers/io');
const Solver = require('../../../helpers/solver');

const getValues = input => input.map(i => i.split('').map(v => parseInt(v)));

const isVisible = (map, x, y) => {
  return _.filter([[0, 1], [0, -1], [1, 0], [-1, 0]], dir => {
    let curX = x + dir[0], curY = y + dir[1], height = map[y][x];
    do {
      if (map[curY][curX] >= height) {
        return true;
      }

      curX += dir[0];
      curY += dir[1];
    } while (curX >= 0 && curX < map[0].length && curY >= 0 && curY < map.length);
    return false;
  }).length < 4;
}

const scenicScore = (map, x, y) => {
  let v = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(dir => {
    let curX = x + dir[0], curY = y + dir[1], height = map[y][x];
    let score = 1;
    do {
      if (map[curY][curX] >= height) {
        return score;
      }

      score++;
      curX += dir[0];
      curY += dir[1];
    } while (curX >= 0 && curX < map[0].length && curY >= 0 && curY < map.length);

    return --score;
  });

  let score = v.reduce((a, b) => a * b);
  return score;
}

const getSolution = (input, config) => {
  let vis = 0;
  let scenicMax = 0;
  for (let i = 1; i < input[0].length - 1; i++) {
    for (let j = 1; j < input.length - 1; j++) {
      vis += isVisible(input, i, j) ? 1 : 0;
      scenicMax = Math.max(scenicMax, scenicScore(input, i, j));
    }
  }

  return config.part == 1 ?
    vis + 2 * input.length + 2 * input[0].length - 4 :
    scenicMax;
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution:
// Part 2 solution:
