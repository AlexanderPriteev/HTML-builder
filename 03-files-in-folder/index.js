const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, './secret-folder');

fs.readdir(directoryPath, (error, files) => {
  if (error) throw error;
  files.forEach((e) => {
    const thisFile =  path.join(directoryPath, e);
    const fileType = path.extname(thisFile);
    const fileName = path.basename(thisFile, fileType);
    fs.stat(thisFile, (error, stats) => {
      if (error) throw error;
      if(stats.isFile()){
        console.log(fileName + ' - ' + fileType.slice(1) + ' - ' + `${stats.size / 1024}kb`);
      }
    });
  });
});

