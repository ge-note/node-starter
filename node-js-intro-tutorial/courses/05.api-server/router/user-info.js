const express = require('express');
const expressJoi = require('@escook/express-joi');
const userInfoHandler = require('../router-handler/user-info');
const { updateUserInfoSchema } = require('../schema/user-info');

const router = express.Router();

// 获取用户信息
router.get('/user-info', userInfoHandler.getUserInfo);

// 更新用户信息
router.post(
  '/user-info',
  expressJoi(updateUserInfoSchema),
  userInfoHandler.updateUserInfo
);

module.exports = router;
