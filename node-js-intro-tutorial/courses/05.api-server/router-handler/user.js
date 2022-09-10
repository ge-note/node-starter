/**
 * 定义和用户路由相关的处理函数
 */
const db = require('../db'); // 导入数据库操作模块
const bcrypt = require('bcryptjs'); // 导入加密包
const jwt = require('jsonwebtoken'); // 导入生成 token 字符串的包
const config = require('../config'); // 导入配置文件

// 注册
exports.register = (req, res) => {
  // 获取客户端提交的用户信息
  const userInfo = req.body;

  // 校验用户名是否存在
  const sql = `select * from ev_users where username=?`;
  db.query(sql, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 用户名已存在
    if (results.length) return res.cc('用户名已被占用，请更换其他用户名');

    // 对用户密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);

    // 插入新用户
    const insertSql = `insert into ev_users set ?`;
    db.query(
      insertSql,
      {
        username: userInfo.username,
        password: userInfo.password,
      },
      (err, results) => {
        // 判断 SQL 语句是否执行成功
        if (err) return res.cc(err);

        // 判断影响行数是否为 1
        if (results.affectedRows !== 1)
          return res.cc('注册用户失败，请稍后重试');

        // 注册成功
        res.cc('注册成功', 0);
      }
    );
  });
};

// 登录
exports.login = (req, res) => {
  // 获取客户端提交的表单数据
  const userInfo = req.body;

  // 查询用户
  const sql = `select * from ev_users where username=?`;
  db.query(sql, userInfo.username, (err, results) => {
    if (err) return res.cc(err);

    if (results.length !== 1) return res.cc('用户不存在');

    // 校验密码是否正确
    const compareResult = bcrypt.compareSync(
      userInfo.password,
      results[0].password
    );
    if (!compareResult) return res.cc('密码错误');

    // 对用户的信息加密，生成 token 字符串
    // 注意：删除用户信息中的密码、头像信息
    const user = {
      ...results[0],
      password: '',
      user_pic: '',
    };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.tokenExpiresIn,
    });

    // 登录成功，将 token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功',
      token: `Bearer ${tokenStr}`, // 为方便客户端使用，可以在服务端拼接前缀
    });
  });
};
