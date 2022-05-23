const fs = require('fs');
const path = require('path').join(__dirname, './text.txt');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Enter Text:');

fs.writeFile(path, '', (error) =>{
  if (error) throw error;
});

readline.on('line', (text) => {
  if(text === 'exit') {
    readline.close();
    return;
  }
  fs.appendFile(path, `${text}\r\n`, (error) =>{
    if (error) throw error;
  });
});

process.on( 'exit', function() {
  console.log( '\r\nBye Bye!');
});