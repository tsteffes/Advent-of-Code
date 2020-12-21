const _ = require('lodash');
const io = require('../../Helpers/io');
const Solver = require('../../Helpers/solver').Solver;

let getValues = input => {
  return input.map(i => {
    let m = i.match(/^(?<ingredients>[a-z\s,]+)\(contains (?<allergens>[a-z\s,]+)\)$/);
    return { allergens: m.groups.allergens.replace(/\,/g, '').split(' '), ingredients: m.groups.ingredients.trim().split(' ') };
  });
};

let filterActuals = (res, ingredient) => {
  res.forEach(r => _.remove(r.possibles, i => i === ingredient));
}

let getSolution = (input, config, part) => {
  let results = [];
  input.forEach(i => {
    i.allergens.forEach(a => {
      let allergen = _.find(results, r => r.name === a);
      if (!allergen) {
        allergen = { name: a, possibles: i.ingredients };
        results.push(allergen);
      }
      else {
        allergen.possibles = _.intersection(allergen.possibles, i.ingredients);
      }
    });
  });

  while (_.some(results, r => r.possibles.length > 0)) {
    let r = _.find(results, r => r.possibles.length === 1);
    r.actual = r.possibles[0];
    filterActuals(results, r.actual);
  }

  if (part === 1) {
    return _.sum(input.map(i => _.filter(i.ingredients, g => results.map(r => r.actual).indexOf(g) === -1).length));
  }

  return _.sortBy(results, r => r.name).map(r => r.actual).join(',');
};

new Solver(21, io.readLines, getValues, getSolution, [{ }, { }]).solve();

// Part 1 solution: 2517
// Part 2 solution: rhvbn,mmcpg,kjf,fvk,lbmt,jgtb,hcbdb,zrb
