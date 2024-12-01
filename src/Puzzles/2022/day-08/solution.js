const getValues = input => input.map(i => i.split('').map(v => parseInt(v)));

const isVisible = (map, x, y) => {
  return [[0, 1], [0, -1], [1, 0], [-1, 0]].filter(dir => {
    let curX = x + dir[0], curY = y + dir[1], height = map[y][x];
    while (curX >= 0 && curX < map[0].length && curY >= 0 && curY < map.length) {
      if (map[curY][curX] >= height) {
        return true;
      }

      curX += dir[0];
      curY += dir[1];
    };
    return false;
  }).length < 4;
};

const scenicScore = (map, x, y) => {
  return [[0, 1], [0, -1], [1, 0], [-1, 0]].map(dir => {
    let curX = x + dir[0], curY = y + dir[1], height = map[y][x], score = 0;
    while (curX >= 0 && curX < map[0].length && curY >= 0 && curY < map.length) {
      score++;
      if (map[curY][curX] >= height) {
        return score;
      }

      curX += dir[0];
      curY += dir[1];
    }

    return score;
  }).reduce((a, b) => a * b);
};

const getSolution = (input, config) => {
  let visCount = 0;
  let scenicMax = 0;
  for (let x = 1; x < input[0].length - 1; x++) {
    for (let y = 1; y < input.length - 1; y++) {
      visCount += isVisible(input, x, y) ? 1 : 0;
      scenicMax = Math.max(scenicMax, scenicScore(input, x, y));
    }
  }

  return config.part == 1 ? visCount + 2 * input.length + 2 * input[0].length - 4 : scenicMax;
};

Solver.solve(io.readLines, getValues, getSolution);

// Part 1 solution: 1827
// Part 2 solution: 335580
