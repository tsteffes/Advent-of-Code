const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver');

const getValues = input => {
  return input.map(i => {
    const reg = /Sensor at x=(?<sX>-?\d+), y=(?<sY>-?\d+): closest beacon is at x=(?<bX>-?\d+), y=(?<bY>-?\d+)/;
    const g = i.match(reg).groups;
    ['sX', 'sY', 'bX', 'bY'].forEach(v => g[v] = parseInt(g[v]));
    return { sensor: { x: g.sX, y: g.sY }, beacon: { x: g.bX, y: g.bY } };
  });
};

const getRanges = (map, y) => {
  return map.reduce((arr, i) => {
    const dist = Math.abs(i.sensor.x - i.beacon.x) + Math.abs(i.sensor.y - i.beacon.y);
    const diff = Math.abs(y - i.sensor.y);
    diff < dist && arr.push({ min: i.sensor.x - dist + diff, max: i.sensor.x + dist - diff });
    return arr;
  }, []);
};

const getSolution = (map, config) => {
  if (config.part === 1) {
    const ranges = getRanges(map, config.y)
    const min = _.min(ranges.map(r => r.min));
    const max = _.max(ranges.map(r => r.max));
    return _.range(min, max).filter(x => !!_.find(ranges, r => r.min <= x && x <= r.max)).length;
  }

  for (let y = 0; y < config.max; y++) {
    const ranges = getRanges(map, y);
    for (let x = 0; x < config.max; x++) {
      let mod = false;
      for (let i = 0; i < ranges.length; i++) {
        if (ranges[i].min <= x && ranges[i].max >= x) {
          x = ranges[i].max;
          mod = true;
        }
      }

      if (!mod) {
        return x * 4000000 + y;
      }
    }
  }
};

config = [{ y: 2000000 }, { max: 4000000 }];
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution: 4961647
// Part 2 solution: 12274327017867
