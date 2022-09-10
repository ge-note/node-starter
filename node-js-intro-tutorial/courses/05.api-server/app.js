const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');

// 创建服务器实例对象
const app = express();

// 配置解决跨域中间件
app.use(cors());

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析 application/x-www-form-urlencoded 格式
app.use(express.urlencoded({ extended: false }));

// 定义接口响应数据的中间件
// 注意：一定要在路由之前
app.use((req, res, next) => {
  /**
   * cc 响应处理函数
   * @param { Error | string } err 值可能是一个错误对象，也可能是错误对象的一个值
   * @param { number }  status 默认为 -1，表示失败
   */
  res.cc = (err, status = -1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };

  next();
});

// 使用用户路由模块
app.use('/api', userRouter);

app.listen(3000, () => {
  console.log('Api-Server running at http://127.0.0.1:3000');
});
