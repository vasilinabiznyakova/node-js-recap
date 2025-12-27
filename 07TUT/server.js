const express = require('express');
const app = express();

const path = require('path');

const PORT = process.env.PORT || 3500;
app.use(express.static(path.join(__dirname)));

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
app.get(/.*/, (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
