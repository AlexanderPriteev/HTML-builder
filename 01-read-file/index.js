const fs = require('fs');
const path = require('path');

const textFile = path.join(__dirname, './text.txt');

const stream = new fs.ReadStream(textFile, {encoding: 'utf-8'});

stream.on('readable', () => {
  const data = stream.read();
  if (data != null) console.log(data);
});
