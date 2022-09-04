/**
 * ☆☆☆☆☆ 中间件的作用
 *
 * 多个中间件之间，共享同一份 req 和 res，可以在上游的中间件中统一添加自定义属性和方法
 * 供下游的中间件或路由使用
 */

const express = require('express');

const app = express();

// 将 mw 注册为全局成效的中间件
app.use((req, res, next) => {
  // 获取请求到达服务器的时间，并挂载到 req 自定义属性
  req.startTime = Date.now();

  next();
});

app.get('/', (req, res) => {
  res.send('Home page ' + req.startTime);
});

app.get('/user', (req, res) => {
  res.send('User page ' + req.startTime);
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
