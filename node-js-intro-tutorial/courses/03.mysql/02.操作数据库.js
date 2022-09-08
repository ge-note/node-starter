const mysql = require('mysql');

// 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1',
  user: '',
  password: '',
  database: '',
});

// 检测 mysql 模块能否正常工作
db.query('SELECT 1', (err, results) => {
  if (err) return console.log(err.message);

  console.log(results); // [ RowDataPacker { 1: 1} ]
});

/**
 * 查询数据
 */
// 查询 users 表中所有的用户数据
db.query('SELECT * FROM users', (err, results) => {
  if (err) console.log(err.message);

  // 如果执行的是 SELECT 查询语句，则执行结果是数组
  console.log(results);
});

/**
 * 插入数据
 */
db.query(
  'INSERT INTO users (username, password) VALUES (?, ?)',
  ['Spider-Man', 'sm1234'],
  (err, results) => {
    if (err) console.log(err.message);

    console.log(results);

    // 如果执行的是 INSERT INTO 插入语句，则执行结果是一个对象
    // 可以通过 affectedRows 属性来判断是否插入数据成功
    if (results.affectedRows === 1) {
      console.log('插入数据成功');
    }
  }
);

// 另一种插入数据的方式
db.query(
  'INSERT INTO users SET ?',
  {
    username: 'Iron Man',
    password: 'iron12',
  },
  (err, results) => {
    if (err) console.log(err.message);

    if (results.affectedRows === 1) {
      console.log('插入数据成功');
    }
  }
);

/**
 * 更新数据
 */
db.query(
  'UPDATE users SET username=?, password=? WHERE id=?',
  ['aaa', '098765', 7],
  (err, results) => {
    if (err) console.log(err.message);

    if (results.affectedRows === 1) {
      console.log('更新数据成功');
    }
  }
);

// 另一种更新数据的方式
db.query(
  'UPDATE users SET ? where id=?',
  [
    {
      username: 'aaaa',
      password: '987654',
    },
    8,
  ],
  (err, results) => {
    if (err) console.log(err.message);

    if (results.affectedRows === 1) {
      console.log('更新数据成功');
    }
  }
);

/**
 * 删除数据
 */
db.query('DELETE FROM users WHERE id=?', 9, (err, results) => {
  if (err) console.log(err.message);

  if (results.affectedRows === 1) {
    console.log('删除数据成功');
  }
});

/**
 * 标记删除
 */
db.query('UPDATE users SET status=0 WHERE id=?', 6, (err, results) => {
  if (err) console.log(err.message);

  if (results.affectedRows === 1) {
    console.log('标记删除成功');
  }
});
