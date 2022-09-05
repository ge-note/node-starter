const express = require('express');

const app = express();

const apiRouter = require('./15.03.api-router');

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

/**
 * 使用 JSONP 解决跨域问题
 *
 * 必须配置在 cors 中间件之前
 */
app.get('/api/jsonp', (req, res) => {
  // 得到函数名称
  const funcName = req.query.callback;

  // 定义要发送给客户端的数据对象
  const data = {
    name: 'zs',
    age: 20,
  };

  // 拼接出一个函数的调用 funcName(dataStr)
  const scriptStr = `${funcName}(${JSON.stringify(data)})`;

  // 把拼接的字符串响应给客户端
  res.send(scriptStr);
});

/**
 * 使用 cors 中间件解决跨域问题
 *
 * 一定要在路由之前，配置 cors 中间件，用于解决接口跨域问题
 */
const cors = require('cors');
app.use(cors());

// 添加统一前缀
app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
