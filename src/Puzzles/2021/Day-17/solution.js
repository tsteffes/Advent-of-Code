const regex = /^target area: x=(?<xmin>[\d]+)\.\.(?<xmax>[\d]+), y=(?<ymin>-?[\d]+)\.\.(?<ymax>-?[\d]+)/;

const parseInput = input => {
  let c = input[0].match(regex);
  return {
    xmin: parseInt(c.groups.xmin, 10),
    xmax: parseInt(c.groups.xmax, 10),
    ymin: parseInt(c.groups.ymin, 10),
    ymax: parseInt(c.groups.ymax, 10)
  };
};

let checkHit = (map, loc) => map.xmin <= loc[0] && loc[0] <= map.xmax && map.ymin <= loc[1] && loc[1] <= map.ymax;

let checkOvershot = (map, loc) => loc[0] > map.xmax || loc[1] < map.ymin;

const getSolution = (map, config) => {
  let validPaths = [];
  for (let i = 1; i <= map.xmax; i++) {
    for (let j = map.ymin; j <= Math.abs(map.ymin); j++) {
      let loc = [0, 0], xVel = i, yVel = j, path = [];
      do {
        loc[0] += xVel;
        loc[1] += yVel;
        path.push([loc[0], loc[1]]);
        xVel = Math.max(xVel - 1, 0);
        yVel--;
        if (checkHit(map, loc)) {
          validPaths.push({ traj: [i, j], path: path });
          break;
        }
      } while (!checkOvershot(map, loc));
    }
  }

  if (config.part === 1) {
    let yMax = map.ymin;
    for (let p of validPaths) {
      for (let s of p.path) {
        yMax = Math.max(yMax, s[1]);
      }
    }

    return yMax;
  }

  return validPaths.length;
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 9180
// Part 2 solution: 3767
