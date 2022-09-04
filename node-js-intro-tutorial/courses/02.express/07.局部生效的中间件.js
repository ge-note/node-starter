/**
 * 不使用 app.use() 定义的中间件，称为局部生效的中间件
 */
const express = require('express');

const app = express();

const mw1 = (req, res, next) => {
  console.log('局部中间件');
  next();
};

// 参数可以传中间件，这个中间件只在当前路由中生效
app.get('/', mw1, (req, res) => {
  res.send('Home page');
});

app.get('/user', (req, res) => {
  res.send('User page');
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
