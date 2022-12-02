const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;
const targetBag = 'shiny gold';

let getValues = input => {
  return _.map(input, i => {
    let parsed = i.match(/(?<d>\w+\s\w+)( bags contain )(?<c>.*)\.$/);
    let contents = parsed.groups.c === 'no other bags' ? [] :
      _.map(parsed.groups.c.split(','), b => {
        let m = b.trim().match(/(?<q>\d+)(?<d>.*)(bags?)/);
        return { quantity: m.groups.q, desc: m.groups.d.trim() };
      });

    return { desc: parsed.groups.d, contents: contents }
  });
}

let findBag = (allBags, description) => _.find(allBags, b => b.desc === description);

let containsBag = (allBags, bag) => {
  return bag.desc == targetBag || _.some(_.map(bag.contents, c => containsBag(allBags, findBag(allBags, c.desc))));
};

let countContents = (allBags, bag) => {
  return 1 + _.sum(_.map(bag.contents, c => c.quantity * countContents(allBags, findBag(allBags, c.desc))));
}

let getSolution = (values, config) => {
  if (config.part === 1) {
    return _.filter(values, v => v.desc !== targetBag && containsBag(values, v)).length;
  }
  else {
    return countContents(values, _.find(values, b => b.desc === targetBag)) - 1;
  }
};

new Solver(2020, 7, io.readLines, getValues, getSolution).solve();

// Part 1 solution: 268
// Part 2 solution: 7867
