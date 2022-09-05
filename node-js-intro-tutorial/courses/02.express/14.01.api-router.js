const express = require('express');

const apiRouter = express.Router();

// 挂载对应的路由
// 定义 GET 接口
apiRouter.get('/get', (req, res) => {
  // 通过 req.query 获取客户端通过查询字符串、发送到服务器的数据
  const query = req.query;

  // 通过 res.send() 向客户端响应处理的结果
  res.send({
    status: 0,
    msg: 'GET 请求成功',
    data: query,
  });
});

// 定义 POST 接口
apiRouter.post('/post', (req, res) => {
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  // 注意要先使用中间件解析
  const body = req.body;

  // 通过 res.send() 向客户端响应处理的结果
  res.send({
    status: 0,
    msg: 'POST 请求成功',
    data: body,
  });
});

module.exports = apiRouter;
