const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver');
const targetBag = 'shiny gold';

let getValues = input => {
  return _.map(input, i => {
    let parsed = i.match(/(?<d>.*)( bags contain )(?<c>.*)\.$/);
    let contents = parsed.groups.c === 'no other bags' ? [] :
      _.map(parsed.groups.c.split(','), b => {
        let m = b.trim().match(/(?<q>\d+)(?<d>.*)(bags?)/);
        return { quantity: m.groups.q, desc: m.groups.d.trim() };
      });

    return { desc: parsed.groups.d, contents: contents }
  });
}

let containsBag = (allBags, bag) => {
  return bag.desc == targetBag || _.some(_.map(bag.contents, c => containsBag(allBags, _.find(allBags, b => b.desc === c.desc))));
};

let countContents = (allBags, bag) => {
  return 1 + _.sum(_.map(bag.contents, c => {
    return c.quantity * countContents(allBags, _.find(allBags, b => b.desc === c.desc));
  }));
}

let getSolution = (values, config) => {
  if (config.partOne) {
    return _.filter(values, v => v.desc !== targetBag && containsBag(values, v)).length;
  }
  else {
    return countContents(values, _.find(values, b => b.desc === targetBag)) - 1;
  }
};

let solver = new Solver.Solver(7, io.readLines, getValues, getSolution, [{ partOne: true }, { }]);
solver.solve();

// Part 1 solution: 268
// Part 2 solution: 7867
