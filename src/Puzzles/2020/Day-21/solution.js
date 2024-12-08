const parseInput = input => {
  return input.map(i => {
    let m = i.match(/^([a-z\s,]+)\(contains ([a-z\s,]+)\)$/);
    return { allergens: m[2].replace(/,/g, '').split(' '), ingredients: m[1].trim().split(' ') };
  });
};

const getSolution = (input, config) => {
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
    results.forEach(res => _.remove(res.possibles, i => i === r.actual));
  }

  if (config.part === 1) {
    return _.sum(input.map(i => i.ingredients.filter(g => results.map(r => r.actual).indexOf(g) === -1).length));
  }

  return _.sortBy(results, r => r.name).map(r => r.actual).join(',');
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 2517
// Part 2 solution: rhvbn,mmcpg,kjf,fvk,lbmt,jgtb,hcbdb,zrb
