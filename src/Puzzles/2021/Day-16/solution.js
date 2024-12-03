const regex = /^(?<version>[01]{3})(?<type>[01]{3})(?<rest>[01]*)/;
const ops = {
  0: (vals) => _.sum(vals),
  1: (vals) => vals.reduce((a, b) => a * b),
  2: (vals) => Math.min(...vals),
  3: (vals) => Math.max(...vals),
  5: (vals) => vals[0] > vals[1] ? 1 : 0,
  6: (vals) => vals[0] < vals[1] ? 1 : 0,
  7: (vals) => vals[0] === vals[1] ? 1 : 0
};

let parsePacket = bin => {
  let c = bin.match(regex);
  let packet = { version: parseInt(c.groups.version, 2), type: parseInt(c.groups.type, 2), value: null, subPackets: [] };
  let rest = c.groups.rest;
  if (packet.type === 4) {
    let part;
    let data = [];
    do {
      part = rest.substring(0, 5);
      data.push(part.substring(1));
      rest = rest.substring(5);
    } while(part[0] === '1');

    packet.value = parseInt(data.join(''), 2);
  }
  else {
    if (rest[0] === '0') {
      let numBits = parseInt(rest.substring(1, 16), 2);
      let packets = rest.substring(16, numBits + 16);
      while (packets) {
        let parsed = parsePacket(packets);
        packet.subPackets.push(parsed.packet);
        packets = parsed.rest;
      }

      rest = rest.substring(numBits + 16);
    }
    else {
      let numPackets = parseInt(rest.substring(1, 12), 2);
      rest = rest.substring(12);
      for (let i = 0; i < numPackets; i++) {
        let parsed = parsePacket(rest);
        packet.subPackets.push(parsed.packet);
        rest = parsed.rest;
      }
    }
  }

  return { packet: packet, rest: rest };
};

const parseInput = input => {
  let bin = '';
  for (let hex of input[0]) {
    bin += parseInt(hex, 16).toString(2).padStart(4, '0');
  }

  return parsePacket(bin);
};

let sumVersions = packets => {
  return _.sum(packets.map(p => p.version + sumVersions(p.subPackets)));
};

let getValue = packet => {
  if (packet.type === 4) {
    return packet.value;
  }

  return ops[packet.type](packet.subPackets.map(getValue));
};

const getSolution = (input, config) => {
  if (config.part === 1) {
    return sumVersions([input.packet]);
  }

  return getValue(input.packet);
};

Solver.solve(parseInput, getSolution);

// Part 1 solution: 999
// Part 2 solution: 3408662834145
