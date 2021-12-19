const _ = require('lodash');
const io = require('../../../Helpers/io');
const Solver = require('../../../Helpers/solver').Solver;

let parseNode = (s, parent) => {
  let int = parseInt(s);
  let node = { parent: parent };
  if (int) {
    node.val = int;
    return node;
  }

  let depth = 0, charIdx = 0, char;
  do {
    char = s[charIdx];
    depth += char === '[' ? 1 : char === ']' ? -1 : 0;
    charIdx++;
  } while (!(depth === 1 && char === ','));
  node.left = parseNode(s.substring(1, charIdx - 1), node);
  node.right = parseNode(s.substring(charIdx, s.length - 1), node);
  return node;
};

let getValues = input => {
  return input.map(i => parseNode(i, null));
};

let findSplitter = node => {
  if (Number.isInteger(node.val) && node.val > 9) {
    return node;
  }

  let res;
  if (node.left) {
    res = findSplitter(node.left);
  }

  if (!res && node.right) {
    res = findSplitter(node.right);
  }

  return res;
};

let split = node => {
  console.log('split');
  let newNode = { };
  newNode.left = { val: Math.floor(node.val / 2), parent: newNode };
  newNode.right = { val: Math.ceil(node.val / 2), parent: newNode };
  newNode.parent = node.parent;
  if (node.parent.left === node) {
    node.parent.left = newNode;
  }
  else {
    node.parent.right = newNode;
  }
};

let findExploder = (node, depth) => {
  if (depth > 3 && isPair(node)) {
    return node;
  }

  let res;
  if (!Number.isInteger(node.left.val)) {
    res = findExploder(node.left, depth + 1);
  }

  if (!res && !Number.isInteger(node.right.val)) {
    res = findExploder(node.right, depth + 1);
  }

  return res;
};

let explode = (node, map) => {
  console.log('explode');
  let i;
  for (i = 0; i < map.length; i++) {
    if (map[i] === node) {
      break;
    }
  }

  for (let a = i - 1; a >= 0; a--) {
    if (map[a].right && Number.isInteger(map[a].right.val)) {
      map[a].right.val += node.left.val;
      break;
    }
    else if(map[a].left && Number.isInteger(map[a].left.val)) {
      map[a].left.val += node.left.val;
      break;
    }
  }

  for (let b = i + 1; b < map.length; b++) {
    if (map[b].left && Number.isInteger(map[b].left.val)) {
      map[b].left.val += node.right.val;
      break;
    }
    else if(map[b].right && Number.isInteger(map[b].right.val)) {
      map[b].right.val += node.right.val;
      break;
    }
  }

  parent = node.parent;
  let newNode = { val: 0, parent: parent };
  if (parent.left === node) {
    parent.left = newNode;
  }
  else {
    parent.right = newNode;
  }
};

let mapTree = node => {
  let res = [];
  if (Number.isInteger(node.left.val)) {
    res.push(node.left);
  }
  else {
    res = res.concat(mapTree(node.left));
  }

  res.push(node);

  if (Number.isInteger(node.right.val)) {
    res.push(node.right);
  }
  else {
    res = res.concat(mapTree(node.right));
  }

  return res;
};

let isPair = node => {
  return node.right && Number.isInteger(node.right.val) && node.left && Number.isInteger(node.left.val);
}

let reduce = node => {
  let exploder, splitter;
  do {
    splitter = null;
    exploder = findExploder(node, 0);
    if (exploder) {
      let map = mapTree(node);
      explode(exploder, map);
    }
    else {
      splitter = findSplitter(node);
      if (splitter) {
        split(splitter);
      }
    }

    let map = mapTree(node);
    let s = '';
    for (let m of map) {
      if (Number.isInteger(m.val)) {
        s += m.val + ' ';
      }
    }
    console.log(s);
  } while(exploder || splitter);
};

let getMagnitude = node => {
  if (Number.isInteger(node.val)) {
    return node.val;
  }

  return 3 * getMagnitude(node.left) + 2 * getMagnitude(node.right);
};

let getSolution = (values, config) => {
  do {
    let newNode = {
      left: values.shift(),
      right: values.shift()
    };
    newNode.left.parent = newNode;
    newNode.right.parent = newNode;
    values.unshift(reduce(newNode));
  } while (values.length > 1)
  return getMagnitude(values[0]);
};

new Solver(2021, 18, io.readLines, getValues, getSolution, [{ part: 1 }]).solve();

// Part 1 solution:
// Part 2 solution:
