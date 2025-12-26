//when you work with big files its better to use streams
const fs = require('fs');
const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });
const ws = fs.createWriteStream('./files/new-lorem.txt');


// rs.on("data", (dataChunk) => {
//     ws.write (dataChunk)
// })

//we got the same result as above however piping is more effective
//rs.pipe(ws) is more efficient because it is a built-in, optimized stream mechanism in Node.js that automatically handles backpressure, buffering, and errors.
// The manual on("data") approach requires extra logic and is easy to implement incorrectly.

//Backpressure is a mechanism that prevents fast producers from overwhelming slow consumers by controlling the data flow rate.
rs.pipe(ws)