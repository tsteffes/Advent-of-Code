const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  return input.map(i => {
    let rows = i.split('\r\n');
    return { cards: rows.slice(1).map(i => parseInt(i)) };
  })
};

let resolveGame = (players, winner) => {
  players[winner].cards.push(...[players[winner].cards[0], players[Math.abs(winner - 1)].cards[0]]);
  players.forEach(p => p.cards.shift());
};

let cardHash = players => players[0].cards.join('-') + '|' + players[1].cards.join('-');
let shouldRecurse = players => players[0].cards[0] < players[0].cards.length && players[1].cards[0] < players[1].cards.length;
let getRecurseHands = players => [{ cards: players[0].cards.slice(1, players[0].cards[0] + 1) }, { cards: players[1].cards.slice(1, players[1].cards[0] + 1) }];

let playRecursive = (players) => {
  let cheatWin = false;
  let hands = [];
  do {
    let hash = cardHash(players);
    if (_.some(hands, h => h === hash)) {
      cheatWin = true;
      break;
    }

    hands.push(hash);
    let roundWinner = shouldRecurse(players) ? playRecursive(getRecurseHands(players)) : players[0].cards[0] > players[1].cards[0] ? 0 : 1;
    resolveGame(players, roundWinner);
  } while (!_.some(players, p => p.cards.length === 0));

  return cheatWin || players[0].cards.length > 0 ? 0 : 1;
};

let getSolution = (players, config, part) => {
  if (part === 1) {
    do {
      resolveGame(players, players[0].cards[0] > players[1].cards[0] ? 0 : 1);
    } while (!_.some(players, p => p.cards.length === 0));
  }
  else {
    playRecursive(players);
  }

  return _.sum(_.map(players, p => _.sum(_.map(p.cards, (c, i) => c * (p.cards.length - i)))));
};

new Solver(22, i => io.readLines(i, '\r\n\r\n'), getValues, getSolution, [{ }, { }]).solve();

// Part 1 solution: 32401
// Part 2 solution: 31436
