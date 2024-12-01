const HashMap = require('../../../helpers/hashMap').HashMap;
const shapes = [
  [[3, 0], [4, 0], [5, 0], [6, 0]],
  [[4, 0], [3, 1], [4, 1], [5, 1], [4, 2]],
  [[3, 0], [4, 0], [5, 0], [5, 1], [5, 2]],
  [[3, 0], [3, 1], [3, 2], [3, 3]],
  [[3, 0], [4, 0], [3, 1], [4, 1]],
];

const getValues = input => input[0].split('');
const getHeight = piece => _.max(piece.map(p => p[1])) - _.min(piece.map(p => p[1]));
const checkCollision = (state, piece) => {
  return _.find(piece, p => [0, 8].includes(p[0]) || p[1] === 0
    || _.find(state.solids, s => s[0] === p[0] && s[1] === p[1]));
};
const findPattern = pattern => {
  let cur = pattern[pattern.length - 1];
  let matcher = p => p.diff === cur.diff && p.jet === cur.jet;
  let prevIdx = _.findLastIndex(pattern.slice(0, pattern.length - 1), matcher);
  if (prevIdx > -1) {
    let prevPrevIdx = _.findLastIndex(pattern.slice(0, prevIdx - 1), matcher);
    if (prevPrevIdx > -1) {
      let prev = pattern[prevIdx];
      let prevPrev = pattern[prevPrevIdx];
      for (let i = prevPrevIdx; i < (prevIdx - prevPrevIdx); i++) {
        let a = pattern[prevPrevIdx + i];
        let b = pattern[prevIdx + i];
        if (a.jet !== b.jet || a.diff !== b.diff) {
          return null;
        }
      }

      return { iStart: prevPrev.i, yStart: prevPrev.maxY, iDiff: prev.i - prevPrev.i, yDiff: prev.maxY - prevPrev.maxY };
    }
  }

  return null;
};
const getSolution = (jets, config) => {
  const state = { solids: [], maxY: 0, jet: 0 };
  const pattern = [{ jet: 0, i: 0, diff: 0, maxY: 0 }];
  const heightLog = [];
  for (let i = 0; i < config.iterations; i++) {
    let collision = false;
    let piece = _.forEach(_.cloneDeep(shapes[i % 5]), p => p[1] += state.maxY + 4);
    do {
      const lateralMove = _.cloneDeep(piece);
      lateralMove.forEach(p => p[0] += jets[state.jet] === '<' ? -1 : 1);
      piece = checkCollision(state, lateralMove) ? piece : lateralMove;

      const verticalMove = _.cloneDeep(piece);
      verticalMove.forEach(p => p[1]--);
      collision = checkCollision(state, verticalMove);
      piece = collision ? piece : verticalMove;

      state.jet = (state.jet + 1) % jets.length;
    } while (!collision);

    piece.forEach(p => state.solids.push(p));
    state.maxY = Math.max(state.maxY, piece[0][1] + getHeight(piece));
    heightLog.push(state.maxY);

    if (config.part === 2 && i % 5 === 0) {
      const diff = state.maxY - pattern[pattern.length - 1].maxY;
      pattern.push({ jet: state.jet, i: i, diff: diff, maxY: state.maxY });
      let p = findPattern(pattern);
      if (p) {
        let mod = (config.iterations - p.iStart) % p.iDiff;
        let num = (config.iterations - p.iStart - mod) / p.iDiff;
        return p.yStart + (p.yDiff * num) + (heightLog[p.iStart + mod - 1] - heightLog[p.iStart]);
      }
    }
  }

  return state.maxY;
};

const config = [{ iterations: 2022 }, { iterations: 1000000000000 }];
Solver.solve(io.readLines, getValues, getSolution, config);

// Part 1 solution: 3193
// Part 2 solution: 1577650429835
