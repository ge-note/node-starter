const express = require('express');
const cors = require('cors');
const joi = require('joi');
const expressJWT = require('express-jwt');
const config = require('./config');
const userRouter = require('./router/user');
const userInfoRouter = require('./router/user-info');
const articleCateRouter = require('./router/article-cate');

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

// 配置解析 token 的中间件
// 注意：一定要在路由之前
app.use(
  expressJWT({
    secret: config.jwtSecretKey,
  }).unless({
    path: [/^\/api\//],
  })
);

// 使用用户路由模块
app.use('/api', userRouter);
// 使用用户信息模块
// 注意：以 /my 开头的接口，都需要有身份认证
app.use('/my', userInfoRouter);
// 使用文章分类模块
app.use('/my/article', articleCateRouter);

// 定义错误处理中间件
// 注意：在路由之后
app.use((err, req, res, next) => {
  // 捕获客户端提交表单数据验证失败错误
  // 注意：一定要 return，否则会执行后面的 res.cc()，由于 express 不允许出现两个 res.send()，因此会报错
  if (err instanceof joi.ValidationError) return res.cc(err);

  // 捕获身份认证失败错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');

  // 未知错误
  res.cc(err);
});

app.listen(3000, () => {
  console.log('Api-Server running at http://127.0.0.1:3000');
});
