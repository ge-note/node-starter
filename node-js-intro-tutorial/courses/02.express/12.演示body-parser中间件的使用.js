const express = require('express');

const app = express();

// 导入解析表单数据的中间件 body-parser
const parser = require('body-parser');

// 注册中间件
app.use(parser.urlencoded({ extended: false }));

app.post('/user', (req, res) => {
  console.log(req.body);

  res.end('OK');
});

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
