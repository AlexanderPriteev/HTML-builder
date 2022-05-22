const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const projectDist = path.join(__dirname, './project-dist');

const directoryComponents = path.join(__dirname, './components');
const templateFile = path.join(__dirname, './template.html');
const indexPath = path.join(projectDist, './index.html');

const styleBundle = path.join(projectDist, './style.css');
const styleAssets = path.join(__dirname, './styles');

const assetsPath = path.join(__dirname, './assets');
const assetsNewPath = path.join(projectDist, './assets');

fs.mkdir(projectDist, {recursive: true}, (error) => {
  if (error) throw error;
});


//template
fs.readdir(directoryComponents, (error, files) => {
  if (error) throw error;

  fsPromises.readFile(templateFile).then(e => {
    let data = '' + e;
    dataFiles();
    async function dataFiles() {
      for (const fileList of files){
        const thisFilePath = path.join(directoryComponents, fileList);
        const fileType = path.extname(thisFilePath);
        const fileName = path.basename(thisFilePath, fileType);
        await fsPromises.readFile(thisFilePath).then((e) => {
          data = data.split(`{{${fileName}}}`).join('' + e);
        });
      }
      await fsPromises.writeFile(indexPath, data);
    }
  });
});


//styles
fs.readdir(styleAssets, (error, files) => {
  if (error) throw error;

  files.forEach((e) => {
    const thisFile = path.join(styleAssets, e);
    const fileType = path.extname(thisFile);

    fs.stat(thisFile, (error, stats) => {
      if (error) throw error;

      if (stats.isFile() && fileType === '.css') {
        const stream = new fs.ReadStream(thisFile, {encoding: 'utf-8'});
        stream.on('readable', () => {
          const data = stream.read();
          if (data != null) {
            fs.appendFile(styleBundle, `${data}\r\n`, (error) =>{
              if (error) throw error;
            });
          }
        });
      }

    });
  });
});


//assets
fs.mkdir(assetsNewPath, {recursive: true}, (error) => {
  if (error) throw error;
});

copyAssets(assetsPath, assetsNewPath);
function copyAssets(assetsPath, projectDist) {
  fs.readdir(assetsPath, (error, files) => {
    if (error) throw error;
    files.forEach((e) =>{
      const thisFilePath =  path.join(assetsPath, e);
      const newFilePath = path.join(projectDist, e);
      fs.stat(thisFilePath, (error, stats) => {
        if (error) throw error;

        if (stats.isFile()) {
          fs.copyFile(thisFilePath, newFilePath, (error)=>{
            if (error) throw error;
          });
        } else {
          fs.mkdir(newFilePath, {recursive: true}, (error) => {
            if (error) throw error;
          });
          copyAssets(thisFilePath, newFilePath);
        }
      });
    });
  });
}