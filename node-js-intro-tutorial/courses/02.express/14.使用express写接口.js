const express = require('express');

const app = express();

const apiRouter = require('./14.01.api-router');

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 添加统一前缀
app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
