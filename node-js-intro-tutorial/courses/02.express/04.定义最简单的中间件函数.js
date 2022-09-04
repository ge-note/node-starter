const express = require('express');

const app = express();

// 定义一个最简单的中间件函数
// 中间件函数都需要有 next()
const mw = function (req, res, next) {
  console.log('最简单的中间件函数');

  // 把流转关系转交给下一个中间件或路由
  next();
};

// 将 mw 注册为全局成效的中间件
// 注意：一定要在路由之前注册中间件
app.use(mw);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/user', (req, res) => {
  res.send('User page');
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
