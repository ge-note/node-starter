/**
 * 使用 app.use() 连续定义多个全局中间件，客户端请求到达服务器后，会按照中间件定义的先后顺序依次执行
 */
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('第一个中间件');
  next();
});

app.use((req, res, next) => {
  console.log('第二个中间件');
  next();
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
