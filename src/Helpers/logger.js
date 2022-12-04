module.exports = {
  log: (collection) => {
    collection.forEach((c, i) => {
      console.log('Part ' + (i + 1) + ' solution: ' + c);
    })
  }
};
