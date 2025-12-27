const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//3rd party middleware
// Cross Origin Resourse Sharing
// does need to be applied, you can send req from any domains heere and for public its ok

// better to create whitelist for domains that can have access to your application
const whitelist = [
  'https://www.yoursite.com',
  'https://www.google.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
];
const corsOptions = {
  origin: (origin, callback) => {
    // TODO: REMOVE !origin in production
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get(/^\/$|\/index\.html$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(/^\/new-page(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(/^\/old-page(\.html)?$/, (req, res) => {
  res.redirect(301, 'new-page.html'); //302 by default
});

app.get(
  /^\/hello(\.html)?$/,
  (req, res, next) => {
    console.log('attempted to load hello.html ');
    next(); //moves on to the next handler / next expression in the chain
  },
  (req, res) => {
    res.send('Hello World');
  }
);

//Middleware is any handlers being invoked between req and response
//there are 3 types of middlewares:
//1) built-in middleware
//2)  from 3rd party
//3)  custom
//You can chan them or chain them in array

const one = (req, res, next) => {
  console.log('one');
  next();
};
const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res, next) => {
  console.log('three');
  res.send('Finished!');
};

// chaining handlers can be passed as array
app.get(/^\/chain(\.html)?$/, [one, two, three]);

// Route handlers
// app all will be applied to all http methods
app.all(/.*/, (req, res) => {
  res.status(404);
  // checking if client accepts html - this is from header
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//2.58.35