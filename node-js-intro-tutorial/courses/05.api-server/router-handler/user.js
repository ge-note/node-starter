/**
 * 定义和用户路由相关的处理函数
 */

// 导入数据库操作模块
const db = require('../db');

// 导入加密包
const bcrypt = require('bcryptjs');

// 注册
exports.register = (req, res) => {
  // 获取客户端提交的用户信息
  const userInfo = req.body;

  // 检验表单中的数据
  if (!userInfo.username || !userInfo.password) {
    return res.send({
      status: -1,
      message: '用户名或密码不正确',
    });
  }

  // 校验用户名是否存在
  const sql = `select * from ev_users where username=?`;
  db.query(sql, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.send({
        status: -1,
        message: err.message,
      });
    }

    // 用户名已存在
    if (results.length) {
      return res.send({
        status: -1,
        message: '用户名已被占用，请更换其他用户名',
      });
    }

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
        if (err) {
          return res.send({
            status: -1,
            message: err.message,
          });
        }

        // 判断影响行数是否为 1
        if (results.affectedRows !== 1) {
          return res.send({
            status: -1,
            message: '注册用户失败，请稍后重试',
          });
        }

        // 注册成功
        res.send({
          status: 0,
          message: '注册成功',
        });
      }
    );
  });
};

// 登录
exports.login = (req, res) => {
  res.send('login ok');
};
