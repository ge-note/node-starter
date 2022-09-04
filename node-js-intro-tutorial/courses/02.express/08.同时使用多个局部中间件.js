const express = require('express');

const app = express();

const mw1 = (req, res, next) => {
  console.log('局部中间件');
  next();
};

const mw2 = (req, res, next) => {
  console.log('局部中间件');
  next();
};

// 两种定义方法
app.get('/', mw1, mw2, (req, res) => {
  res.send('Home page');
});

app.get('/user', [mw1, mw2], (req, res) => {
  res.send('User page');
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
