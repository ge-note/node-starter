const express = require('express');

const app = express();

// 通过 express.json() 中间件解析表单中的 JSON 格式数据
app.use(express.json());

// 通过 express.urlencoded() 中间件解析表单中的 url-encoded 格式数据
app.use(express.urlencoded({ extended: false }));

app.post('/user', (req, res) => {
  // 在服务器，可以使用 req.body 接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 为 undefined
  console.log(req.body);

  res.send('OK');
});

app.post('/book', (req, res) => {
  console.log(req.body);

  res.end('OK');
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
