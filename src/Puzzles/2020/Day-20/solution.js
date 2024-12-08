const parseInput = input => {
  return input.map(i => {
    let vals = i.split('\r\n');
    let title = vals.shift().match(/^Tile (?<num>\d+):$/);
    return { id: parseInt(title.groups.num), val: vals, borders: mapBorders(vals) };
  });
};

let mapBorders = vals => {
  return [
    vals[0],
    vals.map(v => v[v.length - 1]).join(''),
    _.reverse(vals[vals.length - 1].split('')).join(''),
    vals.map(v => v[0]).join('')
  ];
};

const getSolution = (input, config) => {
  input.forEach(i => {
    i.missing = i.borders.filter(b => !_.some(input, x => {
      return x.id !== i.id && _.some(x.borders, b2 => b2 === b || b2 === b.split('').reverse().join(''));
    }));
  });

  return input.filter(i => i.missing.length === 2).map(i => i.id).reduce((a, b) => a * b);
};

Solver.solve(parseInput, getSolution, [], '\r\n\r\n');

// Part 1 solution: 15670959891893
// Part 2 solution:
