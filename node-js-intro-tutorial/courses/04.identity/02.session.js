const express = require('express');

const app = express();

// 配置 session 中间件
const session = require('express-session');
app.use(
  session({
    secret: 'identity', // 任意字符串
    resave: false,
    saveUninitialized: true,
  })
);

// 托管静态页面
app.use(express.static('./pages'));

// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false }));

// 登录接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({
      status: 1,
      msg: '登录失败',
    });
  }

  // 将登录成功后的信息保存到 session 中
  // 注意：只有成功配置了 express-session 中间件之后，才能通过 req 访问 session 属性
  // 用户的信息
  req.session.user = req.body;
  // 用户的登录状态
  req.session.isLogin = true;

  res.send({
    status: 0,
    msg: '登录成功',
  });
});

// 获取用户姓名接口
app.get('/api/username', (req, res) => {
  // 从 session 中获取用户的名称，返回给客户端
  // 首先判断是否登录
  if (!req.session.isLogin) {
    return res.send({
      status: 1,
      msg: '未登录',
    });
  }

  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  });
});

// 退出登录接口
app.post('/api/logout', (req, res) => {
  // 清空 session 信息
  // 注意：destroy() 只会清空当前用户的 session
  req.session.destroy();

  res.send({
    status: 0,
    msg: '退出成功',
  });
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000');
});
