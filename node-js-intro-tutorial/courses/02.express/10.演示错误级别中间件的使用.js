const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // 人为制造错误
  throw new Error('服务器内部发生错误');

  res.send('Home page');
});

// 定义错误级别中间件，捕获整个项目的异常错误，从而防止程序崩溃
// 注意：错误级别的中间件，必须注册在所有路由之后
app.use((err, req, res, next) => {
  console.log('发生了错误：' + err.message);

  res.send('Error：' + err.message);
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
