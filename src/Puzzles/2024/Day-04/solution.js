require('../../../Helpers/global');

new Puzzle(2024, 4)
  .withParser(i => maps.parse(i))
  .withSolver((map, config) => {
    let res = 0;
    map.getAllCoordinates().forEach(loc => {
      if (config.part === 1) {
        for (const dir of maps.cardinal8) {
          let word = map.getAt(loc);
          for (let i = 1; i < 4; i++) {
            const cur = loc.getNeighbor([dir[0] * i, dir[1] * i]);
            if (map.isInBounds(cur)) {
              word += map.getAt(cur);
            }
          }

          res += word === 'XMAS' ? 1 : 0;
        }
      }
      else {
        if (map.getAt(loc) !== 'A') {
          return;
        }

        const xVals = [null, null, null, null];
        for (let i = 0; i < maps.xDirs.length; i++) {
          const cur = loc.getNeighbor(maps.xDirs[i]);
          if (map.isInBounds(cur) && ['M', 'S'].includes(map.getAt(cur))) {
            xVals[i] = map.getAt(cur);
          }
        }

        res += _.some(xVals, x => !x) || xVals[0] === xVals[1] || xVals[2] === xVals[3] ? 0 : 1;
      }
    });

    return res;
  }).solve();

// Part 1 solution: 2573
// Part 2 solution: 1850
