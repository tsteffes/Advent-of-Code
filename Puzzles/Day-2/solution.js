const _ = require('lodash');
const fs = require('file-system');
const inputFile = 'Puzzles/Day-2/input.txt';

let parseInput = i => {
  let parts = i.split(' ');
  return {
    firstNum: parseInt(parts[0].split('-')[0]),
    lastNum: parseInt(parts[0].split('-')[1]),
    letter: parts[1][0],
    password: parts[2]
  };
};

let partOneFilter = r => {
  let count = _.filter([...r.password], l => l === r.letter).length;
  return r.firstNum <= count && count <= r.lastNum;
};

let partTwoFilter = r => {
  return [...r.password][r.firstNum - 1] === r.letter ^ [...r.password][r.lastNum - 1] === r.letter;
};

let input = [];
fs.readFileSync(inputFile, 'utf8').split('\r\n').forEach(d => input.push(parseInput(d)));
console.log('First part answer: ' + _.filter(input, partOneFilter).length);
console.log('Second part answer: ' + _.filter(input, partTwoFilter).length);
