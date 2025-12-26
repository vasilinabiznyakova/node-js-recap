const fs = require('fs');

//this way we can check if dir exists or not
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
      if (err) throw err;

      console.log('Directory created');
    });

}


if (fs.existsSync('./new')) {
  fs.rmdir('./new', (err) => {
    if (err) throw err;

    console.log('Directory removed');
  });
}


