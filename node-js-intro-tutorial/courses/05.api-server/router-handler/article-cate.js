const db = require('../db');

// 获取文章分类列表
exports.getArticleCates = (req, res) => {
  const sql = `select * from ev_article_cates where is_delete=0 order by id asc`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);

    res.send({
      status: 0,
      message: '获取文章分类列表成功',
      data: results,
    });
  });
};

// 新增文章分类
exports.addArticleCate = (req, res) => {
  // 校验分类名称与别名是否被占用
  const selectSql = `select * from ev_article_cates where name=? or alias=?`;
  db.query(selectSql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err);

    // 分类名称和别名都被占用
    if (results.length === 2)
      return res.cc('分类名称和别名被占用，请更换后重试');
    if (
      results.length === 1 &&
      req.body.name === results[0].name &&
      req.body.alias === results[0].alias
    )
      return res.cc('分类名称和别名被占用，请更换后重试');

    // 分类名称或者别名被占用
    if (results.length === 1 && req.body.name === results[0].name)
      return res.cc('分类名称被占用，请更换后重试');
    if (results.length === 1 && req.body.alias === results[0].alias)
      return res.cc('分类别名被占用，请更换后重试');

    // 新增分类
    const insertSql = `insert into ev_article_cates set ?`;
    db.query(insertSql, req.body, (err, results) => {
      if (err) return res.cc(err);

      if (results.affectedRows !== 1) return res.cc('新增文章分类失败');

      res.cc('新增文章分类成功', 0);
    });
  });
};

// 根据 id 删除文章分类
exports.deleteArticleCateById = (req, res) => {
  // 标记删除
  const sql = `update ev_article_cates set is_delete=1 where id=?`;
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);

    if (results.affectedRows !== 1) return res.cc('删除文章分类失败');

    res.cc('删除文章分类成功', 0);
  });
};

// 根据 id 获取文章分类
exports.getArticleCateById = (req, res) => {
  const sql = `select * from ev_article_cates where id=? and is_delete=0`;
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);

    if (results.length !== 1) return res.cc('获取文章分类失败');

    res.send({
      status: 0,
      message: '获取文章分类成功',
      data: results[0],
    });
  });
};
