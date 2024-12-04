require('../../../Helpers/global');

new Puzzle(2024, 4)
  .withParser(i => i.map(v => v.split('')))
  .withSolver((map, config) => {
    let res = 0;
    map.getAllCoordinates().forEach(loc => {
      if (config.part === 1) {
        for (const dir of maps.cardinal8) {
          let word = map[loc[1]][loc[0]];
          for (let i = 1; i < 4; i++) {
            const x0 = loc[0] + (dir[0] * i);
            const y0 = loc[1] + (dir[1] * i);
            if (map.isInBounds(x0, y0)) {
              word += map[y0][x0];
            }
          }

          res += word === 'XMAS' ? 1 : 0;
        }
      }
      else {
        if (map[loc[1]][loc[0]] !== 'A') {
          return;
        }

        const xVals = [null, null, null, null];
        for (let i = 0; i < maps.xDirs.length; i++) {
          const dir = maps.xDirs[i];
          const x0 = loc[0] + dir[0];
          const y0 = loc[1] + dir[1];
          if (map.isInBounds(x0, y0) && ['M', 'S'].includes(map[y0][x0])) {
            xVals[i] = map[y0][x0];
          }
        }

        res += !_.some(xVals, x => !x) && xVals[0] != xVals[1] && xVals[2] != xVals[3];
      }
    });

    return res;
  }).solve();

// Part 1 solution: 2573
// Part 2 solution: 1850
