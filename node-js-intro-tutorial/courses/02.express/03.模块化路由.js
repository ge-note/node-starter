const express = require('express');

const app = express();

// 导入路由模块
const router = require('./03.01.router');

// 注册路由模块
app.use(router);

// app.use() 的作用：注册全局中间件

// 为路由模块添加同一前置
// app.use('/api', router);

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
