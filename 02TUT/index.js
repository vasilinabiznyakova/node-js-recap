const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, 'files', 'starter.txt'),
      'utf8'
    );
    console.log(data);
      await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
      
    await fsPromises.writeFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      '\n\nNice to meet you'
    );
    await fsPromises.rename(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      path.join(__dirname, 'files', 'promiseComplete.txt')
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, 'files', 'promiseComplete.txt'),
      'utf8'
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOps();
console.log('Hellllo....'); // this will be shown first

// fs.readFile(
//   path.join(__dirname, 'files', 'starter.txt'),
//   'utf8',
//   (err, data) => {
//     if (err) throw err;
//     //   console.log(data.toString()); // data = Buffer data
//     console.log(data); // data = Buffer data but if you add encoding it will be read as string
//   }
// );

//bellow is callback hell
// fs.writeFile(
//   path.join(__dirname, 'files', 'reply.txt'),
//   'Nice to meet you',
//   (err) => {
//     if (err) throw err;
//     //   console.log(data.toString()); // data = Buffer data
//     console.log('Write complete'); // data = Buffer data but if you add encoding it will be read as string
//     fs.appendFile(
//       path.join(__dirname, 'files', 'reply.txt'),
//       'T\n\nYes it is.',
//       (err) => {
//         if (err) throw err;
//         //   console.log(data.toString()); // data = Buffer data
//         console.log('Append complete'); // data = Buffer data but if you add encoding it will be read as string
//         fs.rename(
//           path.join(__dirname, 'files', 'reply.txt'),
//           path.join(__dirname, 'files', 'reply2.txt'),
//           (err) => {
//             if (err) throw err;
//             //   console.log(data.toString()); // data = Buffer data
//             console.log('Rename complete'); // data = Buffer data but if you add encoding it will be read as string
//           }
//         );
//       }
//     );

//     fs.readFile(
//       path.join(__dirname, 'files', 'starter.txt'),
//       'utf8',
//       (err, data) => {
//         if (err) throw err;
//         //   console.log(data.toString()); // data = Buffer data
//         console.log(data); // data = Buffer data but if you add encoding it will be read as string
//       }
//     );
//   }
// );

//exit on uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
