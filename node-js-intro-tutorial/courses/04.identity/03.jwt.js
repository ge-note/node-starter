const express = require('express');

const app = express();

// 01. 导入和 JWT 相关的两个包
// 导入生成 JWT 字符串的包
const jwt = require('jsonwebtoken');
// 导入将客户端发送过来的 JWT 字符串解析还原成 JSON 对象的包
const expressJWT = require('express-jwt');

// 02. 定义 secret 密钥
const secretKey = 'identify jwt';

// 04. 注册将 JWT 字符串解析还原成 JSON 对象的中间件
// unless() 用来指定哪些接口不需要访问权限
// 注意：这个中间件可以把解析出来的用户信息挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// 登录接口（不需要鉴权）
app.post('/api/login', (req, res) => {
  const userInfo = req.body;

  if (userInfo.username !== 'admin' || userInfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败',
    });
  }

  // 03. 用户登录成功后，生成 JWT 字符串，通过 token 属性响应给客户端
  /**
   * jwt.sign() 生成 JWT 字符串
   * @param 用户的信息对象
   * @param 加密的密钥
   * @param 配置对象，可以配置当前 token 的有效期
   */
  // 注意：千万不要把密码加密到 token 字符串中
  const tokenStr = jwt.sign(
    {
      username: userInfo.username,
    },
    secretKey,
    { expiresIn: '30s' }
  );

  res.send({
    status: 200,
    message: '登录成功',
    token: tokenStr,
  });
});

// 这是一个有权限的接口
app.get('/admin/getUserInfo', (req, res) => {
  // 05. 使用 req.user 获取用户信息
  // 注意：req.user 是通过 express-jwt 中间件挂载到 req 的
  const userInfo = req.user;
  res.send({
    status: 200,
    message: '获取用户信息成功',
    data: userInfo,
  });
});

// 06. 定义全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的 token',
    });
  }

  res.send({
    status: 500,
    message: '未知错误',
  });
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000');
});
