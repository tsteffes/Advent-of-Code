const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let getValues = input => {
  let game = {
    vals: input[0].split(',').map(v => parseInt(v, 10)),
    boards: []
  }

  for (let i = 2; i < input.length; i += 6) {
    let board = [];
    for (let j = 0; j < 5; j++) {
      board[j] = input[i + j].split(/\s+/).filter(v => v !== '').map(v => { return { val: parseInt(v, 10), marked: 0 } });
    }

    game.boards.push(board);
  }

  return game;
};

let markBoards = (boards, val) => {
  boards.forEach(b => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (b[i][j].val === val) {
          b[i][j].marked = 1;
        }
      }
    }
  });
}

let checkResults = boards => {
  return _.partition(boards, b => {
    for (let i = 0; i < 5; i++) {
      if (b[i].filter(v => v.marked === 1).length === 5) {
        return true;
      }

      if (b.filter(r => r[i].marked === 1).length === 5) {
        return true;
      }
    }
  });
}

let getSolution = (game, config) => {
  let res;

  for (let i = 0; i < game.vals.length; i++) {
    markBoards(game.boards, game.vals[i]);
    let boards = checkResults(game.boards);
    let winners = boards[0];
    game.boards = boards[1];

    if (winners.length === 1) {
      sum = 0;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          sum += winners[0][i][j].marked ? 0 : winners[0][i][j].val;
        }
      }

      res = sum * game.vals[i];
      if (config.part === 1) {
        break;
      }
    }
  }

  return res;
};

new Solver(2021, 4, io.readLines, getValues, getSolution).solve();

// Part 1 solution: 38913
// Part 2 solution: 16836
