/*
 * 基础 crud
*/
-- 通过 * 把 users 表中的所有数据查询出来
SELECT * FROM users;

-- 从 users 表中把 username 和 password 对应的数据查询出来
SELECT username, password FROM users;

-- 向 users 表中插入新数据
INSERT INTO users (username, password) VALUES ('abc', '094832');

-- 更新 users 表中 id 为 1 的用户密码
UPDATE users SET password='qwe123' WHERE id=1;

-- 更新 users 表中 id 为 2 的用户密码及状态
UPDATE users SET password='asd456', status=0 WHERE id=2;

-- 删除 users 表中 id 为 4 的用户
DELETE FROM users WHERE id=3;

/*
 * WHERE 子句的使用
*/
SELECT * FROM users WHERE status=1;

SELECT * FROM users WHERE id>=2;

SELECT * FROM users WHERE username<>'ls';

SELECT * FROM users WHERE username!='ls';

/*
 * AND 和 OR 运算符
*/
-- 使用 AND 来显示所有状态为 1 且 id 小于 3 的用户
SELECT * FROM users WHERE status=1 AND id<3;

-- 使用 OR 来显示所有状态为 1 或者 username 为 zs 的用户
SELECT * FROM users WHERE status=1 OR username='zs';

/*
 * ORDER BY 子句的使用
*/
-- 对 users 表中的数据，按照 status 字段进行升序排序（默认）
SELECT * FROM users ORDER BY status;

SELECT * FROM users ORDER BY status ASC;

-- 对 users 表中的数据，按照 id 字段进行降序排序
SELECT * FROM users ORDER BY id DESC;

-- 多重排序：对 users 表中的数据，先按照 status 降序排序，再按照 username 字母的顺序升序排序
SELECT * FROM users ORDER BY status DESC, username ASC;

/*
 * COUNT(*) 的使用
 */
--  使用 COUNT(*) 统计 users 表中，状态为 1 的用户总量
SELECT COUNT(*) FROM users WHERE status=1;

/*
 * 使用 AS 给列起别名
 */
SELECT username AS name, password AS pwd from users;
 
SELECT COUNT(*) AS total FROM users WHERE status=1;