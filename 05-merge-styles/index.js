const fs = require('fs');
const path = require('path');

const buildFile = path.join(__dirname, './project-dist/bundle.css');
const directoryPath = path.join(__dirname, './styles');

fs.readdir(directoryPath, (error, files) => {
  if (error) throw error;
  
  files.forEach((e) => {
    const thisFile = path.join(directoryPath, e);
    const fileType = path.extname(thisFile);

    fs.stat(thisFile, (error, stats) => {
      if (error) throw error;

      if (stats.isFile() && fileType === '.css') {
        const stream = new fs.ReadStream(thisFile, {encoding: 'utf-8'});
        stream.on('readable', () => {
          const data = stream.read();
          if (data != null) {
            fs.appendFile(buildFile, `${data}\r\n`, (error) =>{
              if (error) throw error;
            });
          }
        });
      }

    });
  });
});
