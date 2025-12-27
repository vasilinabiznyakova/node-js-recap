const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
//initialize object
const myEmitter = new Emitter();
// add listener for the log event
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serverFIle = async (filePath, contentType, response) => {
  try {
    const isImage = contentType.startsWith('image/');
    const data = await fs.promises.readFile(filePath, isImage ? null : 'utf8');

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  } catch (error) {
    console.log(error);
    myEmitter.emit('log', `${error.name}: ${error.message}`, 'errLog.txt');
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url);

  // makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== '/') {
    filePath += '.html';
  }
  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serverFIle(filePath, contentType, res);
  } else {
    //404
    //301 redirect
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        //serve 404 response
        serverFIle(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
