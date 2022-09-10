const express = require('express');
// 导入路由处理函数
const userHandler = require('../router-handler/user');

const router = express.Router();

// 注册
router.post('/register', userHandler.register);

// 登录
router.post('/login', userHandler.login);

module.exports = router;
