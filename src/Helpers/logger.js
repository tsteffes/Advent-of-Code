module.exports = {
  log: (day, collection) => {
    console.log(`DAY ${day}`)
    collection.forEach((c, i) => {
      console.log('Part ' + (i + 1) + ' solution: ' + c);
    })
  }
};
