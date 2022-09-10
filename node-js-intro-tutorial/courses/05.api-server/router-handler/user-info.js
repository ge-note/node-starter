const db = require('../db');

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
