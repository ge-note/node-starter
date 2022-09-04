const express = require('express');

// 创建 web 服务器
const app = express();

// 监听客户端的 GET 和 POST 请求，并响应具体内容
app.get('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
  res.send({
    name: 'zs',
    age: 25,
  });
});

app.post('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
  res.send('请求成功');
});

// 通过 req.query 可以获取到客户端发送过来的查询参数，默认是一个空对象ß
app.get('/', (req, res) => {
  console.log(req.query);

  res.send(req.query);
});

// 通过 req.params 获取动态匹配到的 URL 参数，默认是一个空对象
// :id 是一个动态参数
app.get('/user/:id', (req, res) => {
  console.log(req.params);

  res.send(req.params);
});

// 启动 web 服务器
app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
