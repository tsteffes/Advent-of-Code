const dirs = [[0, -1], [-1, 0], [1, 0], [0, 1]];

const parseInput = (input, config) => {
  let map = [];
  for (let y = 0; y < config.multiplier * input.length; y++) {
    row = [];
    for (let x = 0; x < config.multiplier * input[0].length; x++) {
      let inc = Math.floor(x / input[0].length) + Math.floor(y / input.length);
      let baseCost = parseInt(input[y % input.length][x % input[0].length]);
      let cost = (baseCost + inc) < 10 ? baseCost + inc : (baseCost + inc + 1) % 10;
      row.push({ loc: [x, y], cost: cost, minPath: -1 });
    }

    map.push(row);
  }

  return map;
};

const getSolution = (map, config) => {
  let end = map[map.length - 1][map[0].length - 1];
  end.minPath = 0;
  let modified = [end];
  while(modified.length > 0) {
    let modifiedNeighbors = [];
    for (let m of modified) {
      for (let dir of dirs) {
        let loc = m.loc.getNeighbor(dir);
        if (map.isInBounds(loc)) {
          let cur = map.getAt(loc);
          if (cur.minPath === -1 || cur.minPath > (m.minPath + m.cost)) {
            cur.minPath = m.minPath + m.cost;
            modifiedNeighbors.push(cur);
          }
        }
      }
    }

    modified = modifiedNeighbors;
  }

  return map.getAt([0, 0]).minPath;
};

Solver.solve(parseInput, getSolution, [{ multiplier: 1 }, { multiplier: 5 }]);

// Part 1 solution: 393
// Part 2 solution: 2823
