/**
 * 自定义中间件
 *
 * 需求
 * 模拟一个类似于 express.urlencoded，解析 POST 请求提交到服务器的表单数据
 *
 * 实现步骤
 * 定义中间件
 * 监听 req 的 data 事件
 * 监听 req 的 end 事件
 * 使用 querystring 模块解析请求体数据
 * 将解析出来的数据对象挂载到 req.body
 * 将自定义中间件封装为模块
 */
const express = require('express');

const app = express();

// 导入自定义的中间件模块
const customBodyParser = require('./13.01.custom-body-parser');

// 将自定义中间件注册为全局的中间件
app.use(customBodyParser);

app.post('/user', (req, res) => {
  console.log(req.body);

  res.end(req.body);
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
