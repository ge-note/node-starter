const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');
const joi = require('joi');

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

// 定义错误处理中间件
// 注意：在路由之后
app.use((err, req, res, next) => {
  // 数据验证失败
  // 注意：一定要 return，否则会执行后面的 res.cc()，由于 express 不允许出现两个 res.send()，因此会报错
  if (err instanceof joi.ValidationError) return res.cc(err);

  // 未知错误
  res.cc(err);
});

app.listen(3000, () => {
  console.log('Api-Server running at http://127.0.0.1:3000');
});
