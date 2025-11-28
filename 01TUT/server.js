//Now Nodejs dofferes from Vanilla justifyContent:
//1) Node runs on a server not in browser
//2) The console is the terminal window => the same as devtools in browser, we can run js there

console.log('Hello world');
//3) global obj instead of window obj and keyword to call t is global
console.log(global);
// 4) Has Common Core modules that we will explore
// 5) CommonJS modules instead of ES6 modules
// 6) Missing some JS APIs like fetch

const os = require('os');
const path = require('path');

const { add, substract, multiply, devide } = require('./math');

console.log(add(2, 3));

console.log(substract(2, 3));

console.log(multiply(2, 3));

console.log(devide(2, 3));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname); //D:\GitHubCloned\node-js-recap\01TUT
// console.log(__filename); //D:\GitHubCloned\node-js-recap\01TUT\server.js

// console.log(path.dirname(__filename)); //D:\GitHubCloned\node-js-recap\01TUT
// console.log(path.basename(__filename)); //server.js
// console.log(path.extname(__filename)); //.js

// console.log(path.parse(__filename));
// //  {
// //   root: 'D:\\',
// //   dir: 'D:\\GitHubCloned\\node-js-recap\\01TUT',
// //   base: 'server.js',
// //   ext: '.js',
// //   name: 'server'
// // }
