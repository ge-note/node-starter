const db = require('../db');
const bcrypt = require('bcryptjs');

// 获取用户信息
exports.getUserInfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`;
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);

    if (results.length !== 1) res.cc('获取用户信息失败');

    res.send({
      status: 0,
      message: '获取用户信息成功',
      data: results[0],
    });
  });
};

// 更新用户信息
exports.updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where id=?`;
  db.query(
    sql,
    [
      {
        nickname: req.body.nickname,
        email: req.body.email,
      },
      req.body.id,
    ],
    (err, results) => {
      if (err) return res.cc(err);

      if (results.affectedRows !== 1) return res.cc('更新用户信息失败');

      res.cc('更新用户信息成功', 0);
    }
  );
};

// 重置密码
exports.updatePwd = (req, res) => {
  // 查询用户是否存在
  const selectSql = `select * from ev_users where id=?`;
  db.query(selectSql, req.user.id, (err, results) => {
    if (err) return res.cc(err);

    if (results.length !== 1) return res.cc('用户不存在');

    // 对比原密码是否正确
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) return res.cc('原密码不正确');

    // 对新密码加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);

    // 更新用户密码
    const updateSql = `update ev_users set password=? where id=?`;
    db.query(updateSql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err);

      if (results.affectedRows !== 1) return res.cc('更新密码失败');

      res.cc('更新密码成功', 0);
    });
  });
};

// 更新头像
exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic=? where id=?`;
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err);

    if (results.affectedRows !== 1) return res.cc('更新头像失败');

    res.cc('更新头像成功', 0);
  });
};
