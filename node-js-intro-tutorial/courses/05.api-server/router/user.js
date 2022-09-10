const express = require('express');
const userHandler = require('../router-handler/user'); // 路由处理函数
const expressJoi = require('@escook/express-joi'); // 验证表单数据的中间件
const { registerLoginSchema } = require('../schema/user'); // 需要验证的规则对象

const router = express.Router();

/**
 * 注册
 *
 * 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进项验证
 * 如果数据验证通过，会把这次请求流转给后面的路由处理函数
 * 如果数据验证失败，会终止后续代码执行，并抛出一个全局的 Error 错误，进入全局错误中间件处理
 */
router.post('/register', expressJoi(registerLoginSchema), userHandler.register);

// 登录
router.post('/login', userHandler.login);

module.exports = router;
