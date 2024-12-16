require('../../../Helpers/global');

const configs = [{}, {}];
const parser = (i, config) => {
  let state = {};
  let map = maps.parse(i[0].split('\r\n'));
  state.instructs = i[1].split('\r\n').join('').split('');
  state.size = [map[0].length * config.part, map.length];
  state.objs = {
    robot: { type: 'r', loc: [map.findElement('@')[0] * config.part, map.findElement('@')[1]] },
    walls: map.findAll('#').map(l => { return { type: 'w', loc: [l[0] * config.part, l[1]] } }),
    boxes: map.findAll('O').map(l => { return { type: 'b', loc: [l[0] * config.part, l[1]] } })
  };
  return state;
};
const getNeighborBoxes = (obj, boxes, dir, part) => {
  let neighbors = [];
  if (part === 1) {
    neighbors.pushIf(_.find(boxes, b => maps.isSameLocation(b.loc, obj.loc.getNeighbor(dir))));
    return neighbors;
  }

  if (dir[0] !== 0) { // left or right
    const mult = obj.type === 'r' && dir[0] === 1 ? 1 : 2;
    neighbors.pushIf(_.find(boxes, b => maps.isSameLocation(b.loc, obj.loc.getNeighbor(dir, mult))));
  }
  else { // up or down
    let box = _.find(boxes, b => maps.isSameLocation(b.loc, obj.loc.getNeighbor(dir)));
    if (box) {
      neighbors.push(box);
    }
    else { // check to the left and right
      neighbors.pushIf(_.find(boxes, b => maps.isSameLocation(b.loc, obj.loc.getNeighbor(dir).getNeighbor([-1, 0]))));
      if (obj.type === 'b') {
        neighbors.pushIf(_.find(boxes, b => maps.isSameLocation(b.loc, obj.loc.getNeighbor(dir).getNeighbor([1, 0]))));
      }
    }
  }

  return neighbors;
};
const getTrain = (objs, dir, part) => {
  let train = [objs.robot];
  let newBoxes = getNeighborBoxes(objs.robot, objs.boxes, dir, part);
  while (newBoxes.length > 0) {
    let curs = [];
    newBoxes.forEach(b => {
      train.push(b);
      curs.push(b);
    });
    newBoxes = [];
    curs.forEach(c => {
      newBoxes.push(...getNeighborBoxes(c, objs.boxes, dir, part));
    });
  }

  return train;
};
const getElementLocs = (els, dir, part) => {
  let locs = els.map(t => t.loc.getNeighbor(dir));
  if (part === 2) {
    locs.push(...els.filter(t => t.type !== 'r').map(t => [t.loc[0] + 1, t.loc[1]].getNeighbor(dir)));
  }

  return locs;
};
const processMove = (state, dir, part) => {
  let train = getTrain(state.objs, dir, part);
  let locs = getElementLocs(train, dir, part);
  let walls = getElementLocs(state.objs.walls, [0, 0], part);
  for(let w of walls) {
    for (let l of locs) {
      if (maps.isSameLocation(w, l)) {
        return;
      }
    }
  }

  train.forEach(o => o.loc = o.loc.getNeighbor(dir));
};
const drawMap = (state, part) => {
  for (let y = 0; y < state.size[1]; y++) {
    let row = [];
    for (let x = 0; x < state.size[0]; x++) {
      let el = _.find(state.objs.walls, b => maps.isSameLocation(b.loc, [x, y])) ? '#' :
               _.find(state.objs.boxes, b => maps.isSameLocation(b.loc, [x, y])) ? 'O' :
               maps.isSameLocation(state.objs.robot.loc, [x, y]) ? '@' : '.';
      if (part === 2 && ['#', 'O'].includes(el)) {
        x++;
        el += el;
      }
      row.push(el);
    }

    console.log(row.join(''));
  }

  console.log();
};
const dirs = [ '^', '>', 'v', '<' ];
const solver = (state, config) => {
  state.instructs.forEach(i => {
    processMove(state, maps.cardinal4[dirs.indexOf(i)], config.part);
  });

  return _.sum(state.objs.boxes.map(b => 100 * b.loc[1] + b.loc[0]));
};
new Puzzle(2024, 15)
  .withSeparator('\r\n\r\n')
  .withParser(parser)
  .withSolver(solver)
  .solve(configs);

// Part 1 solution: 1437174
// Part 2 solution: 1437468
