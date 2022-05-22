const fs = require('fs');
const path = require('path').join(__dirname, './text.txt');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.writeFile(path, '', (error) =>{
  if(error) console.log(error);
});

console.log('Enter Text:');

readline.on('line', (text) => {
  if(text === 'exit') {
    readline.close();
    return;
  }
  fs.appendFile(path, `${text}\r\n`, (error) =>{
    if(error) console.log(error);
  });
});