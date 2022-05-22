const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const directoryPath = path.join(__dirname, './files');
const directoryCopyPath = path.join(__dirname, './files-copy');

//directory copying
fs.readdir(directoryPath, (error, files) => {
  if (error) throw error;

  fs.mkdir(directoryCopyPath, {recursive: true}, (error) => {
    if (error) throw error;
  });

  files.forEach((e) => {
    const thisFile = path.join(directoryPath, e);
    const newFile = path.join(directoryCopyPath, e);

    fs.stat(thisFile, (error, stats) => {
      if (error) throw error;

      if (stats.isFile()) {
        fsPromises.copyFile(thisFile, newFile)
          .then()
          .catch((error) => {
            if (error) throw error;
          });
      }

    });
  });
});

//deleting unnecessary files
fs.stat(directoryCopyPath, (error) =>{
  if(!error){
    fs.readdir(directoryCopyPath, (error, files) => {
      if (error) throw error;

      files.forEach((e) => {
        fs.readdir(directoryPath, (error, files) => {
          if (error) throw error;

          const copyFilePath = path.join(__dirname, './files-copy', e);

          if (files.indexOf(e) === -1) {
            fs.unlink(copyFilePath, error => {
              if (error) throw error;
            });
          }

        });
      });
    });
  }
});


